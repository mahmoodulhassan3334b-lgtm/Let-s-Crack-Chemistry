import { useState } from 'react';
import { Search, Flame, ListFilter, Check, RotateCcw, HelpCircle } from 'lucide-react';
import { SpiceLevelType } from '../types';
import { ALL_INGREDIENTS } from '../data';

interface SidebarFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSpiceLevels: SpiceLevelType[];
  setSelectedSpiceLevels: (levels: SpiceLevelType[]) => void;
  availableIngredients: string[];
  setAvailableIngredients: (ingredients: string[]) => void;
  onlyMatchAvailable: boolean;
  setOnlyMatchAvailable: (val: boolean) => void;
}

const TOP_INGREDIENTS = [
  'Basmati Rice (Aged)',
  'Yogurt',
  'Paneer Cheese',
  'Onions (Thinly sliced)',
  'Ginger-Garlic Paste',
  'Fresh Spinach (Palak)',
  'Tomato Puree',
  'Butter',
  'Ghee / Oil',
  'Red Chili Powder',
  'Green Chilies',
  'White Chickpeas (Kabuli Chana)',
  'Beef Chuck or Shank',
  'Boneless Chicken Thighs',
  'Heavy Cream',
  'Pistachios (Slivered)'
];

export default function SidebarFilters({
  searchQuery,
  setSearchQuery,
  selectedSpiceLevels,
  setSelectedSpiceLevels,
  availableIngredients,
  setAvailableIngredients,
  onlyMatchAvailable,
  setOnlyMatchAvailable,
}: SidebarFiltersProps) {
  const [ingSearch, setIngSearch] = useState('');

  const toggleSpiceLevel = (level: SpiceLevelType) => {
    if (selectedSpiceLevels.includes(level)) {
      setSelectedSpiceLevels(selectedSpiceLevels.filter((l) => l !== level));
    } else {
      setSelectedSpiceLevels([...selectedSpiceLevels, level]);
    }
  };

  const toggleIngredient = (ing: string) => {
    if (availableIngredients.includes(ing)) {
      setAvailableIngredients(availableIngredients.filter((i) => i !== ing));
    } else {
      setAvailableIngredients([...availableIngredients, ing]);
    }
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedSpiceLevels([]);
    setAvailableIngredients([]);
    setOnlyMatchAvailable(false);
  };

  const filteredAllIngredients = ALL_INGREDIENTS.filter(
    (ing) =>
      ing.toLowerCase().includes(ingSearch.toLowerCase()) &&
      !TOP_INGREDIENTS.includes(ing)
  );

  return (
    <div id="sidebar-filters" className="w-full bg-white border-4 border-black p-6 flex flex-col gap-6 shadow-neo-md text-black">
      {/* Search Recipe Input */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-black mb-2.5">Search Recipes</h4>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search chicken, paneer, garlic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-3 border-black bg-white text-sm text-black font-bold focus:outline-none placeholder:text-gray-400 shadow-neo-sm"
          />
        </div>
      </div>

      {/* Spice Level Filters */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-black mb-3 flex items-center gap-1.5">
          <Flame size={14} className="text-[#FF9933]" />
          Spice Level
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {(['Mild', 'Medium', 'Hot', 'Extra Hot'] as SpiceLevelType[]).map((level) => {
            const isSelected = selectedSpiceLevels.includes(level);
            let colorClass = '';
            if (level === 'Mild') {
              colorClass = isSelected ? 'bg-[#138808] text-white border-2 border-black' : 'hover:bg-emerald-50 text-[#138808] border border-black bg-emerald-50/20';
            } else if (level === 'Medium') {
              colorClass = isSelected ? 'bg-[#FF9933] text-black border-2 border-black font-black' : 'hover:bg-amber-50 text-amber-900 border border-black bg-amber-50/20';
            } else if (level === 'Hot') {
              colorClass = isSelected ? 'bg-orange-600 text-white border-2 border-black' : 'hover:bg-orange-50 text-orange-950 border border-black bg-orange-50/20';
            } else {
              colorClass = isSelected ? 'bg-red-600 text-white border-2 border-black animate-pulse' : 'hover:bg-rose-50 text-rose-950 border border-black bg-rose-50/20';
            }

            return (
              <button
                key={level}
                onClick={() => toggleSpiceLevel(level)}
                className={`px-3 py-2 text-[11px] font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 cursor-pointer shadow-neo-sm ${colorClass}`}
              >
                <span className={`${level === 'Extra Hot' ? 'animate-bounce' : ''}`}>🌶️</span>
                <span>{level}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ingredient Availability Matcher */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
            <ListFilter size={14} className="text-black" />
            Kitchen Pantry
          </h4>
          {availableIngredients.length > 0 && (
            <button
              onClick={() => setAvailableIngredients([])}
              className="text-[10px] text-red-600 hover:text-red-700 font-black uppercase tracking-wider underline"
            >
              Clear Pantry
            </button>
          )}
        </div>
        <p className="text-[11px] text-gray-700 leading-relaxed font-bold mb-3">
          Select the ingredients you have in your kitchen to view your Match Percentage!
        </p>

        {/* Top Common Ingredients Checkboxes */}
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {TOP_INGREDIENTS.map((ing) => {
            const hasIt = availableIngredients.includes(ing);
            return (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`w-full flex items-center justify-between p-2 border-2 border-black text-left text-xs transition-all cursor-pointer ${
                  hasIt
                    ? 'bg-[#FF9933] text-black font-black shadow-neo-sm'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                <span className="truncate">{ing}</span>
                {hasIt && <Check size={14} className="text-black shrink-0 font-black" />}
              </button>
            );
          })}
        </div>

        {/* Custom Ingredient search & dropdown */}
        <div className="mt-3">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Search more ingredients..."
              value={ingSearch}
              onChange={(e) => setIngSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 border-2 border-black bg-white text-[11px] text-black font-bold focus:outline-none"
            />
          </div>

          {ingSearch.trim() && (
            <div className="mt-2 border-2 border-black max-h-[140px] overflow-y-auto bg-white p-1 shadow-neo-sm space-y-1 z-10 relative">
              {filteredAllIngredients.length > 0 ? (
                filteredAllIngredients.map((ing) => {
                  const hasIt = availableIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      onClick={() => {
                        toggleIngredient(ing);
                        setIngSearch('');
                      }}
                      className="w-full text-left text-[11px] px-2 py-1.5 hover:bg-orange-100 font-bold text-black border border-transparent hover:border-black flex justify-between items-center"
                    >
                      <span>{ing}</span>
                      {hasIt && <Check size={10} className="text-black font-black" />}
                    </button>
                  );
                })
              ) : (
                <p className="text-[10px] text-gray-400 p-2 text-center">No matching ingredients found.</p>
              )}
            </div>
          )}
        </div>

        {/* Toggle Show Matchable only */}
        {availableIngredients.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="match-only-checkbox"
              checked={onlyMatchAvailable}
              onChange={(e) => setOnlyMatchAvailable(e.target.checked)}
              className="h-4 w-4 border-2 border-black text-black bg-white focus:ring-black cursor-pointer"
            />
            <label htmlFor="match-only-checkbox" className="text-xs font-black text-black cursor-pointer uppercase tracking-wider">
              High pantry match (&gt; 50%)
            </label>
          </div>
        )}
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={resetAll}
        className="w-full py-2.5 bg-black text-white border-2 border-black text-xs font-black uppercase tracking-widest hover:bg-[#FF9933] hover:text-black transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        <RotateCcw size={12} />
        Reset All Filters
      </button>
    </div>
  );
}
