import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Flame, Users, Check, ShoppingCart, Heart, ShieldCheck } from 'lucide-react';
import { Recipe, EcomProduct } from '../types';

interface RecipeDetailsProps {
  key?: string;
  recipe: Recipe;
  onBack: () => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: EcomProduct, recipeName: string) => void;
  userIngredients: string[];
}

export default function RecipeDetails({
  recipe,
  onBack,
  isFavorited,
  onToggleFavorite,
  onAddToCart,
  userIngredients,
}: RecipeDetailsProps) {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);

  const toggleStep = (index: number) => {
    if (checkedSteps.includes(index)) {
      setCheckedSteps(checkedSteps.filter((i) => i !== index));
    } else {
      setCheckedSteps([...checkedSteps, index]);
    }
  };

  const handleAddToCart = (product: EcomProduct) => {
    setAddingId(product.id);
    onAddToCart(product, recipe.name);
    setTimeout(() => setAddingId(null), 1000); // feedback timeout
  };

  // Helper to highlight ingredients matching the user's pantry
  const matchesPantry = (ingName: string) => {
    return userIngredients.some(
      (userIng) =>
        ingName.toLowerCase().includes(userIng.toLowerCase()) ||
        userIng.toLowerCase().includes(ingName.toLowerCase())
    );
  };

  // Spice level colors
  let spiceBg = 'bg-emerald-50 text-emerald-700 border-emerald-150';
  if (recipe.spiceLevel === 'Medium') spiceBg = 'bg-amber-50 text-amber-700 border-amber-150';
  else if (recipe.spiceLevel === 'Hot') spiceBg = 'bg-orange-50 text-orange-700 border-orange-150';
  else if (recipe.spiceLevel === 'Extra Hot') spiceBg = 'bg-rose-50 text-rose-850 border-rose-150 animate-pulse';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      id="recipe-details-container"
      className="max-w-4xl mx-auto bg-white border-4 border-black shadow-neo-lg overflow-hidden mb-12 text-black"
    >
      {/* Top action header bar */}
      <div className="flex items-center justify-between p-5 border-b-4 border-black bg-[#FFFBF0]">
        <button
          onClick={onBack}
          id="details-back-btn"
          className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black uppercase text-xs cursor-pointer shadow-neo-sm hover:shadow-none"
        >
          <ArrowLeft size={16} />
          Back to Recipes
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            id="details-fav-btn"
            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-[#FF9933] text-black hover:bg-black hover:text-white transition-all text-xs font-black uppercase cursor-pointer shadow-neo-sm hover:shadow-none"
          >
            <Heart
              size={16}
              className={isFavorited ? 'fill-rose-500 text-rose-500' : 'text-black'}
            />
            <span>{isFavorited ? 'Favorited' : 'Add Favorite'}</span>
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative aspect-[2.2/1] w-full bg-gray-100 border-b-4 border-black">
        <img
          src={recipe.image}
          alt={recipe.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8 text-white">
          <span className="bg-[#FF9933] text-black border-2 border-black font-black tracking-widest uppercase text-xs px-3.5 py-1.5 shadow-neo-sm">
            {recipe.origin} Special
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight mt-4 drop-shadow-sm">
            {recipe.name}
          </h1>
        </div>
      </div>

      <div className="p-8">
        {/* Quick specs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border-4 border-black bg-[#FFFBF0] text-center mb-8 shadow-neo-md">
          <div>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1.5">Spice Level</p>
            <div className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-black uppercase border-2 border-black ${spiceBg} shadow-neo-sm`}>
              <Flame size={12} />
              <span>{recipe.spiceLevel}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1.5">Prep Time</p>
            <div className="inline-flex items-center gap-1.5 text-black bg-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-neo-sm">
              <Clock size={14} className="text-black" />
              <span>{recipe.prepTime}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1.5">Cook Time</p>
            <div className="inline-flex items-center gap-1.5 text-black bg-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-neo-sm">
              <Clock size={14} className="text-black" />
              <span>{recipe.cookTime}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1.5">Servings</p>
            <div className="inline-flex items-center gap-1.5 text-black bg-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-neo-sm">
              <Users size={14} className="text-black" />
              <span>{recipe.servings} Serves</span>
            </div>
          </div>
        </div>

        {/* Recipe description */}
        <div className="prose max-w-none text-black leading-relaxed mb-10 text-base font-bold italic">
          <p>{recipe.description}</p>
        </div>

        {/* Ingredients & Instructions columns */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column: Ingredients */}
          <div className="w-full md:w-[38%]">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-black border-b-4 border-black pb-3 mb-4">
              Ingredients List
            </h2>
            <div className="space-y-2.5">
              {recipe.ingredients.map((ing, idx) => {
                const userHasIt = matchesPantry(ing.name);
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 border-2 border-black transition-all text-xs ${
                      userHasIt
                        ? 'bg-[#FF9933] border-black text-black font-black shadow-neo-sm'
                        : 'bg-white border-black text-black font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full border border-black ${userHasIt ? 'bg-[#138808]' : 'bg-gray-200'}`} />
                      <span>{ing.name}</span>
                    </div>
                    <span className={`font-mono font-black ${userHasIt ? 'text-black' : 'text-gray-500'}`}>
                      {ing.amount}
                    </span>
                  </div>
                );
              })}
            </div>

            {userIngredients.length > 0 && (
              <p className="text-[10px] text-black uppercase tracking-wider font-black mt-3 text-center bg-yellow-100 border border-black p-1">
                Highlighted ingredients match Kitchen Pantry!
              </p>
            )}
          </div>

          {/* Right Column: Steps with checklists */}
          <div className="flex-1">
            <h2 className="font-display text-xl font-black uppercase tracking-tight text-black border-b-4 border-black pb-3 mb-4">
              Step-by-Step Instructions
            </h2>
            <div className="space-y-4">
              {recipe.instructions.map((step, idx) => {
                const isChecked = checkedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex gap-4 p-4 border-2 border-black cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gray-100 border-black text-gray-500 line-through'
                        : 'bg-white border-black hover:bg-[#FFFBF0] shadow-neo-sm text-black hover:shadow-neo-md font-bold'
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black transition-all ${
                          isChecked
                            ? 'bg-[#138808] text-white'
                            : 'bg-white text-black font-black'
                        }`}
                      >
                        {isChecked ? <Check size={14} /> : <span className="text-xs font-black">{idx + 1}</span>}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* E-Commerce Spice & Kits Section */}
        {recipe.ecommerceItems && recipe.ecommerceItems.length > 0 && (
          <div className="mt-12 pt-10 border-t-4 border-black">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-black uppercase text-black flex items-center gap-2">
                  <ShoppingCart className="text-[#FF9933] animate-bounce" size={24} />
                  Spice & Ingredient Kits
                </h2>
                <p className="text-xs font-bold text-gray-700">Buy the exact pre-measured spices and fresh kits needed for {recipe.name}!</p>
              </div>
              <span className="mt-2 md:mt-0 text-[11px] font-black uppercase text-black bg-yellow-300 px-3 py-1.5 border-2 border-black flex items-center gap-1 shadow-neo-sm">
                <ShieldCheck size={14} /> Traditional Quality Guaranteed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {recipe.ecommerceItems.map((prod) => {
                const isAdding = addingId === prod.id;
                return (
                  <div
                    key={prod.id}
                    id={`product-card-${prod.id}`}
                    className="flex flex-col border-3 border-black bg-white overflow-hidden shadow-neo-md hover:shadow-neo-lg transition-all"
                  >
                    <div className="relative aspect-[16/10] bg-gray-50 border-b-2 border-black">
                      <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
                      <span className="absolute left-3 top-3 bg-black text-[10px] font-black tracking-wider uppercase text-white px-2.5 py-1 border border-white/25 shadow-neo-sm">
                        {prod.type}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="font-display font-black text-base text-black uppercase tracking-tight line-clamp-1">{prod.name}</h4>
                      <p className="text-xs font-medium text-gray-700 line-clamp-2 mt-1 mb-3 leading-relaxed flex-1">
                        {prod.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-black mt-auto">
                        <span className="font-mono text-base font-black text-black bg-yellow-300 px-2 py-0.5 border-2 border-black shadow-neo-sm">${prod.price.toFixed(2)}</span>
                        
                        <button
                          onClick={() => handleAddToCart(prod)}
                          id={`add-cart-btn-${prod.id}`}
                          className="flex items-center gap-1.5 bg-black hover:bg-[#FF9933] hover:text-black text-white border-2 border-black py-2.5 px-4 text-xs font-black uppercase tracking-wider cursor-pointer shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                          {isAdding ? (
                            <>
                              <Check size={14} />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={13} />
                              <span>Add to cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
