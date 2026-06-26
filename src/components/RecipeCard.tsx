import { motion } from 'motion/react';
import { Heart, Clock, Flame, Percent } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  key?: string;
  recipe: Recipe;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (recipe: Recipe) => void;
  userIngredients: string[];
}

export default function RecipeCard({
  recipe,
  isFavorited,
  onToggleFavorite,
  onSelect,
  userIngredients,
}: RecipeCardProps) {
  // Calculate Ingredient Match
  const totalIngredients = recipe.ingredients.length;
  const matchedIngredients = recipe.ingredients.filter((ing) =>
    userIngredients.some(
      (userIng) => ing.name.toLowerCase().includes(userIng.toLowerCase()) ||
                   userIng.toLowerCase().includes(ing.name.toLowerCase())
    )
  ).length;

  const matchPercent = totalIngredients > 0 ? Math.round((matchedIngredients / totalIngredients) * 100) : 0;

  // Spice level styling
  let spiceBg = 'bg-[#138808] text-white border-2 border-black';
  let spiceEmoji = '🟢';
  if (recipe.spiceLevel === 'Medium') {
    spiceBg = 'bg-[#FF9933] text-black border-2 border-black';
    spiceEmoji = '🟡';
  } else if (recipe.spiceLevel === 'Hot') {
    spiceBg = 'bg-orange-600 text-white border-2 border-black';
    spiceEmoji = '🟠';
  } else if (recipe.spiceLevel === 'Extra Hot') {
    spiceBg = 'bg-red-600 text-white border-2 border-black animate-pulse';
    spiceEmoji = '🔴';
  }

  // Origin label color
  let originBg = 'bg-sky-100 text-black border-2 border-black';
  if (recipe.origin === 'Pakistani') {
    originBg = 'bg-[#138808] text-white border-2 border-black';
  } else if (recipe.origin === 'Indian') {
    originBg = 'bg-[#FF9933] text-black border-2 border-black';
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4, x: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      id={`recipe-card-${recipe.id}`}
      className="group relative flex flex-col overflow-hidden border-4 border-black bg-white shadow-neo-md hover:shadow-neo-lg transition-all"
    >
      {/* Recipe Image & Hover Zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 cursor-pointer border-b-4 border-black" onClick={() => onSelect(recipe)}>
        <img
          src={recipe.image}
          alt={recipe.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity" />

        {/* Origin Badge */}
        <span className={`absolute left-4 top-4 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase shadow-neo-sm ${originBg}`}>
          {recipe.origin}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          id={`fav-btn-${recipe.id}`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-gray-400 shadow-neo-sm transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${isFavorited ? 'fill-rose-500 text-rose-500' : 'text-black hover:text-rose-500'}`}
          />
        </button>

        {/* Preparation Time Overlay */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-black text-white bg-black/70 px-2 py-1 border border-white/20">
          <Clock size={13} className="text-[#FF9933]" />
          <span>{recipe.prepTime} PREP</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          onClick={() => onSelect(recipe)}
          className="font-display text-2xl font-black uppercase leading-[1.1] text-black line-clamp-1 cursor-pointer hover:text-[#FF9933] transition-colors tracking-tight"
        >
          {recipe.name}
        </h3>
        <p className="mt-2 text-xs font-medium text-gray-700 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Divider */}
        <div className="my-4 border-b-2 border-black" />

        {/* Bottom Metadata row */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Spice level badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase ${spiceBg}`}>
            <Flame size={12} />
            <span>{recipe.spiceLevel}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-black bg-yellow-100 border-2 border-black px-2 py-1 shadow-neo-sm">
            <Clock size={12} className="text-black" />
            <span>{recipe.cookTime} COOK</span>
          </div>
        </div>

        {/* Pantry Match Progress */}
        {userIngredients.length > 0 && (
          <div className="mt-4 border-2 border-black bg-[#FFFBF0] p-2.5 shadow-neo-sm">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-black text-black uppercase tracking-wider flex items-center gap-1">
                <Percent size={11} className="text-black" />
                Pantry Match
              </span>
              <span className="font-mono text-black font-extrabold">
                {matchPercent}% ({matchedIngredients}/{totalIngredients})
              </span>
            </div>
            {/* Visual match bar */}
            <div className="h-2.5 w-full bg-white border border-black overflow-hidden">
              <div
                className="h-full bg-[#138808] border-r border-black transition-all duration-500"
                style={{ width: `${matchPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
