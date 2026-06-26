import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Heart, ShoppingCart, User, LogOut, Sparkles, SlidersHorizontal, ArrowLeft, Coffee, ShieldAlert } from 'lucide-react';
import { Recipe, CartItem, Order, SpiceLevelType } from './types';
import { RECIPES } from './data';

import SidebarFilters from './components/SidebarFilters';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import CartView from './components/CartView';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import AiChefAssistant from './components/AiChefAssistant';

export default function App() {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<'recipes' | 'favorites' | 'cart'>('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Authentication State
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('zafran_token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('zafran_username'));
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Core E-Commerce & Favorites State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Advanced Filters & Availability Matcher State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpiceLevels, setSelectedSpiceLevels] = useState<SpiceLevelType[]>([]);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [onlyMatchAvailable, setOnlyMatchAvailable] = useState(false);

  // Dialog Control
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChefOpen, setIsChefOpen] = useState(false);

  // Check login session on mount
  useEffect(() => {
    if (authToken) {
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then((res) => {
          if (res.status === 401) {
            handleLogout();
            throw new Error('Session expired');
          }
          return res.json();
        })
        .then((data) => {
          if (data.user) {
            setUsername(data.user.username);
            setFavorites(data.user.favorites || []);
            setCart(data.user.cart || []);
            setOrders(data.user.orders || []);
          }
        })
        .catch((err) => console.log('Auth check error:', err));
    } else {
      // Load local guest items
      const localCart = localStorage.getItem('zafran_guest_cart');
      const localFavs = localStorage.getItem('zafran_guest_favorites');
      if (localCart) setCart(JSON.parse(localCart));
      if (localFavs) setFavorites(JSON.parse(localFavs));
    }
  }, [authToken]);

  // Sync Guest Cart & Favorites to LocalStorage
  useEffect(() => {
    if (!authToken) {
      localStorage.setItem('zafran_guest_cart', JSON.stringify(cart));
    }
  }, [cart, authToken]);

  useEffect(() => {
    if (!authToken) {
      localStorage.setItem('zafran_guest_favorites', JSON.stringify(favorites));
    }
  }, [favorites, authToken]);

  // Sync Cart on server when changed (if logged in)
  const syncCartOnServer = async (updatedCart: CartItem[]) => {
    if (!authToken) return;
    try {
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ cart: updatedCart })
      });
    } catch (err) {
      console.error('Failed to sync cart on server', err);
    }
  };

  const handleAuthSuccess = (token: string, user: string) => {
    setAuthToken(token);
    setUsername(user);
    localStorage.setItem('zafran_token', token);
    localStorage.setItem('zafran_username', user);
  };

  const handleLogout = async () => {
    if (authToken) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).catch(() => {});
    }
    setAuthToken(null);
    setUsername(null);
    setCart([]);
    setFavorites([]);
    setOrders([]);
    localStorage.removeItem('zafran_token');
    localStorage.removeItem('zafran_username');
  };

  // Toggle favorite recipe
  const handleToggleFavorite = async (recipeId: string) => {
    if (authToken) {
      try {
        const response = await fetch('/api/favorites/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ recipeId })
        });
        const data = await response.json();
        if (response.ok) {
          setFavorites(data.favorites);
        }
      } catch (err) {
        console.error('Failed to toggle favorite', err);
      }
    } else {
      // Local Guest Favorite toggle
      if (favorites.includes(recipeId)) {
        setFavorites(favorites.filter((id) => id !== recipeId));
      } else {
        setFavorites([...favorites, recipeId]);
      }
    }
  };

  // E-Commerce add item to cart
  const handleAddToCart = (product: any, recipeName: string) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart: CartItem[];

    if (existingIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        recipeId: selectedRecipe?.id || '1',
        recipeName: recipeName
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    syncCartOnServer(updatedCart);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, newQty) } : item
    );
    setCart(updatedCart);
    syncCartOnServer(updatedCart);
  };

  const handleRemoveCartItem = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    syncCartOnServer(updatedCart);
  };

  const handleCheckoutSuccess = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    setCart([]);
  };

  // Filter Recipes Logic
  const filteredRecipes = RECIPES.filter((recipe) => {
    // Search Query Match (Name, description, ingredients)
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Spice Level Match
    const matchesSpice =
      selectedSpiceLevels.length === 0 || selectedSpiceLevels.includes(recipe.spiceLevel);

    // Pantry Matching calculation
    const totalIngredients = recipe.ingredients.length;
    const matchedCount = recipe.ingredients.filter((ing) =>
      userIngredients.some(
        (userIng) =>
          ing.name.toLowerCase().includes(userIng.toLowerCase()) ||
          userIng.toLowerCase().includes(ing.name.toLowerCase())
      )
    ).length;

    const matchPercent = totalIngredients > 0 ? (matchedCount / totalIngredients) * 100 : 0;
    const matchesPantryAvailability = !onlyMatchAvailable || matchPercent >= 50;

    return matchesSearch && matchesSpice && matchesPantryAvailability;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-black antialiased font-sans pb-16">
      
      {/* Dynamic Animated Notification Header */}
      <div className="bg-[#FF9933] py-2.5 text-center text-[10px] font-black text-black tracking-widest uppercase flex items-center justify-center gap-1.5 px-4 border-b-4 border-black">
        <Sparkles size={12} className="animate-spin text-black" />
        Authentic Pakistani & Indian Hand-Made Spice Kits & Recipes E-Commerce Platform
        <span className="hidden md:inline bg-black text-white border border-black px-2 py-0.5 text-[9px] font-black">Secure SSL Auth</span>
      </div>

      {/* Main Navbar Navigation */}
      <nav id="app-navbar" className="sticky top-0 z-30 bg-white border-b-4 border-black shadow-neo-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div
            onClick={() => {
              setSelectedRecipe(null);
              setActiveTab('recipes');
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-11 w-11 items-center justify-center border-2 border-black bg-yellow-300 shadow-neo-sm group-hover:rotate-12 transition-transform duration-300">
              <ChefHat className="text-black" size={24} />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-black">
                ZAFRAN
              </span>
              <p className="text-[9px] font-black text-black tracking-widest uppercase mt-0.5">Spices & Heritage</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-2 bg-white">
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab('recipes');
              }}
              className={`px-5 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-3 ${
                activeTab === 'recipes' && !selectedRecipe
                  ? 'bg-[#FF9933] border-black text-black shadow-neo-sm'
                  : 'bg-white border-transparent text-gray-700 hover:border-black hover:text-black'
              }`}
            >
              Recipes
            </button>
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab('favorites');
              }}
              className={`px-5 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border-3 ${
                activeTab === 'favorites'
                  ? 'bg-yellow-300 border-black text-black shadow-neo-sm'
                  : 'bg-white border-transparent text-gray-700 hover:border-black hover:text-black'
              }`}
            >
              <Heart size={12} className="fill-current" />
              Saved Favorites ({favorites.length})
            </button>
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setActiveTab('cart');
              }}
              className={`px-5 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border-3 ${
                activeTab === 'cart'
                  ? 'bg-[#138808] border-black text-white shadow-neo-sm'
                  : 'bg-white border-transparent text-gray-700 hover:border-black hover:text-black'
              }`}
            >
              <ShoppingCart size={12} />
              Spice Shop & Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>

          {/* User Auth controls / Chef trigger */}
          <div className="flex items-center gap-3">
            {/* AI Assistant launcher */}
            <button
              onClick={() => setIsChefOpen(!isChefOpen)}
              id="chef-launcher-btn"
              className="flex items-center gap-1.5 px-4 py-2.5 border-3 border-black bg-[#FF9933] text-black hover:bg-yellow-300 font-black uppercase tracking-wider text-xs transition-all shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            >
              <Sparkles size={13} className="text-black" />
              <span>Ask AI Chef</span>
            </button>

            {/* Profile control */}
            {username ? (
              <div className="flex items-center gap-2 bg-yellow-100 border-2 border-black pl-3 pr-1 py-1 shadow-neo-sm">
                <div className="flex flex-col items-start pr-1">
                  <span className="text-[9px] text-gray-700 font-black uppercase tracking-wider leading-none">Account</span>
                  <span className="text-xs font-black text-black leading-normal max-w-[80px] truncate">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  id="nav-logout-btn"
                  className="p-2 border border-black bg-white text-black hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                  title="Logout Safely"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                id="nav-login-btn"
                className="flex items-center gap-1.5 px-4 py-2.5 border-3 border-black bg-black text-white hover:bg-[#FF9933] hover:text-black transition-all font-black uppercase tracking-wider text-xs cursor-pointer shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <User size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Sticky Tab Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-6 py-2 flex items-center justify-around gap-2 shadow-lg">
        <button
          onClick={() => { setSelectedRecipe(null); setActiveTab('recipes'); }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${activeTab === 'recipes' && !selectedRecipe ? 'text-orange-600 scale-105' : 'text-gray-400'}`}
        >
          <Coffee size={18} />
          <span>Recipes</span>
        </button>
        <button
          onClick={() => { setSelectedRecipe(null); setActiveTab('favorites'); }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${activeTab === 'favorites' ? 'text-orange-600 scale-105' : 'text-gray-400'}`}
        >
          <Heart size={18} />
          <span>Favorites ({favorites.length})</span>
        </button>
        <button
          onClick={() => { setSelectedRecipe(null); setActiveTab('cart'); }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${activeTab === 'cart' ? 'text-orange-600 scale-105' : 'text-gray-400'}`}
        >
          <ShoppingCart size={18} />
          <span>Shop ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </button>
      </div>

      {/* Content wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* If viewing a single recipe detail */}
        <AnimatePresence mode="wait">
          {selectedRecipe ? (
            <RecipeDetails
              key="details"
              recipe={selectedRecipe}
              onBack={() => setSelectedRecipe(null)}
              isFavorited={favorites.includes(selectedRecipe.id)}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              userIngredients={userIngredients}
            />
          ) : activeTab === 'recipes' ? (
            /* Tab: Recipes list with side filtering */
            <motion.div
              key="recipes-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Vibrant Hero Section */}
              <div className="relative border-4 border-black overflow-hidden bg-yellow-300 p-8 md:p-14 text-black shadow-neo-lg flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-black border border-black px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-white">
                    <Sparkles size={12} className="animate-pulse" /> Saffron, Cumin & Heritage stews
                  </div>
                  <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none uppercase">
                    Vibrant Pakistani & <br />
                    <span className="bg-[#FF9933] px-2 py-0.5 border-2 border-black inline-block mt-1">Indian Cooking Art</span>
                  </h1>
                  <p className="text-black text-sm md:text-base max-w-xl leading-relaxed font-bold">
                    Explore legacy recipes of the subcontinent, dial-in your preferred spice levels, match your available kitchen ingredients, and buy handcrafted whole spices to elevate your home dining!
                  </p>
                </div>
                <div className="w-full md:w-1/3 aspect-[4/3] border-4 border-black overflow-hidden shadow-neo-md shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop"
                    alt="Authentic South Asian Spices"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Dynamic Warning Alert about Password protection */}
              {!username && (
                <div className="border-3 border-black bg-yellow-100 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-black font-bold shadow-neo-sm">
                  <ShieldAlert size={18} className="text-black shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex-1">
                    <strong>Personalization Tip:</strong> You are currently using a guest session. Sign in to password-protect your account, secure your billing checkout, and persist your saved favorites across devices!
                  </div>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="text-xs font-black text-black underline hover:text-[#FF9933] whitespace-nowrap uppercase tracking-wider"
                  >
                    Authenticate now
                  </button>
                </div>
              )}

              {/* Main Catalog Section */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Advanced sidebar filters */}
                <div className="w-full lg:w-[28%] shrink-0">
                  <SidebarFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedSpiceLevels={selectedSpiceLevels}
                    setSelectedSpiceLevels={setSelectedSpiceLevels}
                    availableIngredients={userIngredients}
                    setAvailableIngredients={setUserIngredients}
                    onlyMatchAvailable={onlyMatchAvailable}
                    setOnlyMatchAvailable={setOnlyMatchAvailable}
                  />
                </div>

                {/* Recipes list grid */}
                <div className="flex-1 w-full space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-black border-b-4 border-black pb-2 mb-2 w-full">
                      Recipes Collection ({filteredRecipes.length})
                    </h3>
                  </div>

                  {filteredRecipes.length > 0 ? (
                    <motion.div
                      layout
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {filteredRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          isFavorited={favorites.includes(recipe.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onSelect={(rec) => {
                            setSelectedRecipe(rec);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          userIngredients={userIngredients}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-16 bg-white border-4 border-black p-8 shadow-neo-md">
                      <span className="text-4xl mb-3 block">🍲</span>
                      <p className="font-display font-black text-black text-sm uppercase tracking-wider">No Recipes Found</p>
                      <p className="text-xs text-gray-700 mt-2 max-w-[280px] mx-auto font-bold">
                        No recipe matches your current search terms, spice level filters, or kitchen pantry match requirements. Try resetting filters!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'favorites' ? (
            /* Tab: Saved Favorites */
            <motion.div
              key="favorites-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="border-b-4 border-black pb-3 mb-6">
                <h1 className="font-display text-2xl font-black uppercase text-black">Your Personalized Favorites</h1>
                <p className="text-xs font-bold text-gray-700 mt-1">Saved recipes requiring specialized spice kits.</p>
              </div>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {RECIPES.filter((r) => favorites.includes(r.id)).map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isFavorited={true}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={(rec) => {
                        setSelectedRecipe(rec);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      userIngredients={userIngredients}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border-4 border-black p-8 shadow-neo-md">
                  <span className="text-4xl mb-3 block">💖</span>
                  <p className="font-display font-black text-black text-sm uppercase tracking-wider">No Saved Favorites Yet</p>
                  <p className="text-xs text-gray-700 mt-2 max-w-[280px] mx-auto font-bold">
                    Click the heart icon on any recipe catalog item to save it to your personalized account favorites!
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* Tab: Shopping Cart & Order History */
            <motion.div
              key="cart-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CartView
                cartItems={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onOpenCheckout={() => setIsCheckoutOpen(true)}
                isLoggedIn={!!authToken}
                onOpenAuth={() => setIsAuthOpen(true)}
                orders={orders}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Auth Modal (Password protected login & registration) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        authToken={authToken || ''}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Interactive AI Cooking Assistant Sidebar Panel */}
      <AiChefAssistant
        isOpen={isChefOpen}
        onClose={() => setIsChefOpen(false)}
      />

    </div>
  );
}
