import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI if key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Setup simple JSON DB persistence
const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'db.json');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize db.json if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: {} }, null, 2));
}

// Database helper functions
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, resetting', err);
    return { users: {} };
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing DB', err);
  }
}

// Password hashing helper
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// In-memory sessions store: Token -> Username
const sessions = new Map<string, string>();

app.use(express.json());

// Auth Middleware
function requireAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  const username = sessions.get(token);
  if (!username) {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }
  
  const db = readDB();
  const user = db.users[username];
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }
  
  req.username = username;
  req.user = user;
  next();
}

// --- AUTH API ---

// Register User
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const cleanUsername = username.trim().toLowerCase();
  if (cleanUsername.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters long' });
  }
  
  const db = readDB();
  if (db.users[cleanUsername]) {
    return res.status(400).json({ error: 'Username is already taken' });
  }
  
  // Create user
  db.users[cleanUsername] = {
    username: cleanUsername,
    passwordHash: hashPassword(password),
    favorites: [],
    cart: [],
    orders: []
  };
  
  writeDB(db);
  
  // Automatically log in
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, cleanUsername);
  
  res.json({
    token,
    user: {
      username: cleanUsername,
      favorites: [],
      cart: [],
      orders: []
    }
  });
});

// Login User
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const cleanUsername = username.trim().toLowerCase();
  const db = readDB();
  const user = db.users[cleanUsername];
  
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }
  
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, cleanUsername);
  
  res.json({
    token,
    user: {
      username: user.username,
      favorites: user.favorites || [],
      cart: user.cart || [],
      orders: user.orders || []
    }
  });
});

// Get current profile
app.get('/api/auth/me', requireAuth, (req: any, res) => {
  res.json({
    user: {
      username: req.username,
      favorites: req.user.favorites || [],
      cart: req.user.cart || [],
      orders: req.user.orders || []
    }
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    sessions.delete(token);
  }
  res.json({ success: true });
});


// --- FAVORITES API ---

app.post('/api/favorites/toggle', requireAuth, (req: any, res) => {
  const { recipeId } = req.body;
  if (!recipeId) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }
  
  const db = readDB();
  const user = db.users[req.username];
  
  if (!user.favorites) {
    user.favorites = [];
  }
  
  const index = user.favorites.indexOf(recipeId);
  if (index >= 0) {
    user.favorites.splice(index, 1); // remove
  } else {
    user.favorites.push(recipeId); // add
  }
  
  writeDB(db);
  res.json({ favorites: user.favorites });
});


// --- E-COMMERCE CART API ---

// Update Cart (Sync Cart from Client)
app.post('/api/cart/sync', requireAuth, (req: any, res) => {
  const { cart } = req.body;
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: 'Cart must be an array' });
  }
  
  const db = readDB();
  db.users[req.username].cart = cart;
  writeDB(db);
  
  res.json({ cart: db.users[req.username].cart });
});

// Checkout (Process Order)
app.post('/api/cart/checkout', requireAuth, (req: any, res) => {
  const { address, paymentDetails } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Delivery address is required' });
  }
  
  const db = readDB();
  const user = db.users[req.username];
  
  if (!user.cart || user.cart.length === 0) {
    return res.status(400).json({ error: 'Your shopping cart is empty' });
  }
  
  // Calculate total
  const total = user.cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  // Create order
  const order = {
    id: `ord_${crypto.randomBytes(4).toString('hex')}`,
    items: user.cart.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      recipeName: item.recipeName
    })),
    total: parseFloat(total.toFixed(2)),
    date: new Date().toISOString(),
    address,
    status: 'Pending'
  };
  
  if (!user.orders) {
    user.orders = [];
  }
  user.orders.unshift(order); // add to beginning of order history
  user.cart = []; // clear cart
  
  writeDB(db);
  
  res.json({
    success: true,
    order,
    cart: [],
    orders: user.orders
  });
});


// --- AI CHEF INTERACTIVE API ---

app.post('/api/chef/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!ai) {
    // Graceful fallback when API Key is missing or empty
    return res.json({
      reply: "Adaab! I am your Zafran AI Chef. It seems my Gemini API Key is not yet fully configured in your Settings Secrets panel, but I can still tell you that South Asian cuisine is all about layering spices like roasted cumin, green cardamom, garam masala, and fresh ginger! Once the API key is set up, I will be able to fully brainstorm ingredients, suggest spice modifications, and customize all of your recipes interactively!"
    });
  }
  
  try {
    // Format history for Gemini chat
    const systemInstruction = 
      "You are 'Zafran AI Chef', an incredibly passionate, helpful, and friendly master chef of Pakistani and Indian cuisine. " +
      "You specialize in traditional South Asian cooking techniques (such as 'Dum' slow-cooking, 'Tarka' tempering, and charcoal smoking 'Koyla Dum'). " +
      "Keep your responses lively, warm, elegant, and highly interactive. Feel free to use beautiful terminology like 'Adaab' (respectful greeting), 'Khushamdeed' (welcome), 'Zafran' (saffron), and share cooking tips, ingredient substitutes (e.g. Greek yogurt for khoya, or tofu for paneer), or how to dial down/up spice levels for Indian/Pakistani recipes. Keep your response brief, clear, beautifully formatted with markdown, and highly engaging!";

    const formattedHistory = Array.isArray(history) 
      ? history.map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        }))
      : [];
      
    // Call Gemini 3.5 Flash using the @google/genai SDK
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });
    
    const reply = response.text || "Pardon me, my culinary gears spun but couldn't generate a tip. Please try asking again!";
    res.json({ reply });
    
  } catch (error: any) {
    console.error('Gemini Chef Chat Error:', error);
    res.status(500).json({ 
      error: 'Culinary intelligence failed', 
      reply: "Apologies, my friend! An unexpected spices spill in my kitchen backend occurred. Please ensure your GEMINI_API_KEY is configured correctly in the Secrets menu and try again." 
    });
  }
});


// --- VITE DEV SERVER & PRODUCTION HANDLING ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Enable Vite's HMR and middleware mode for local development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev server middleware mounted');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zafran South Asian Recipes App running on port ${PORT}`);
  });
}

startServer();
