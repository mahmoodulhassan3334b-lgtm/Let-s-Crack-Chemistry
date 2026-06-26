export type OriginType = 'Pakistani' | 'Indian' | 'Both';
export type SpiceLevelType = 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';

export interface Ingredient {
  name: string;
  amount: string;
  category: string; // e.g., 'Spices', 'Meat', 'Pantry', 'Fresh Produce'
}

export interface EcomProduct {
  id: string;
  name: string;
  price: number;
  type: 'Spice Kit' | 'Raw Ingredient';
  description: string;
  image: string;
}

export interface Recipe {
  id: string;
  name: string;
  origin: OriginType;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  spiceLevel: SpiceLevelType;
  ingredients: Ingredient[];
  instructions: string[];
  isVegetarian: boolean;
  isGlutenFree: boolean;
  ecommerceItems: EcomProduct[];
}

export interface CartItem {
  id: string; // can be ecomProduct id
  name: string;
  price: number;
  quantity: number;
  image: string;
  recipeId: string;
  recipeName: string;
}

export interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    recipeName: string;
  }[];
  total: number;
  date: string;
  address: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export interface UserSession {
  username: string;
  favorites: string[];
  cart: CartItem[];
  orders: Order[];
}
