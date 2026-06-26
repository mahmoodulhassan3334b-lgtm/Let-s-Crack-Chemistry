import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Karachi Beef Biryani',
    origin: 'Pakistani',
    description: 'An iconic Pakistani street food legend. Layers of fragrant premium basmati rice, tender beef chuck slow-cooked in a robust, deeply spiced yogurt masala, layered with fresh mint, coriander, sliced lemons, and a splash of saffron water.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    prepTime: '30 mins',
    cookTime: '60 mins',
    servings: 6,
    spiceLevel: 'Hot',
    isVegetarian: false,
    isGlutenFree: true,
    ingredients: [
      { name: 'Beef Chuck or Shank', amount: '1 kg', category: 'Meat' },
      { name: 'Basmati Rice (Aged)', amount: '750g', category: 'Pantry' },
      { name: 'Yogurt', amount: '1.5 cups', category: 'Fresh Produce' },
      { name: 'Onions (Thinly sliced)', amount: '3 large', category: 'Fresh Produce' },
      { name: 'Ginger-Garlic Paste', amount: '2 tbsp', category: 'Pantry' },
      { name: 'Green Chilies (Slit)', amount: '6-8', category: 'Fresh Produce' },
      { name: 'Biryani Whole Spice Blend', amount: '2 tbsp', category: 'Spices' },
      { name: 'Red Chili Powder', amount: '1.5 tsp', category: 'Spices' },
      { name: 'Kashmiri Saffron (Zafran)', amount: '1 pinch', category: 'Spices' },
      { name: 'Fresh Mint & Coriander Leaves', amount: '1 cup', category: 'Fresh Produce' },
      { name: 'Kewra Water', amount: '1 tsp', category: 'Pantry' },
      { name: 'Oil / Ghee', amount: '0.5 cup', category: 'Pantry' }
    ],
    instructions: [
      'Wash basmati rice and soak in water for 30 minutes. Infuse saffron in 3 tbsp of warm milk.',
      'In a heavy-bottomed pot, heat ghee/oil and fry sliced onions until golden brown. Set aside half of the onions for layering.',
      'Add ginger-garlic paste and beef to the remaining onions. Sear beef on high heat until it changes color.',
      'Stir in yogurt, green chilies, red chili powder, salt, and the Biryani Whole Spice Blend. Cook on medium-low cover until beef is fully tender (about 45 mins). The gravy should be thick and rich.',
      'In a separate large pot, boil water with 2 tbsp salt, a few cardamom pods, and cloves. Cook the soaked rice until it is 70% done, then drain immediately.',
      'Layering: Spread half of the tender beef gravy at the bottom of the pot. Layer with half of the parboiled rice, sprinkle chopped mint, coriander, fried onions, and lemon slices. Add the rest of the beef gravy, followed by the remaining rice.',
      'Drizzle saffron milk and kewra water over the top. Cover tightly (Dum method) and cook on very low heat for 15-20 minutes until the rice is fluffy and steam emerges.',
      'Gently mix the layers before serving hot with a cool cucumber raita.'
    ],
    ecommerceItems: [
      {
        id: 'sp_biryani_kit',
        name: 'Karachi Biryani Whole Spice Kit',
        price: 5.99,
        type: 'Spice Kit',
        description: 'Premium mix of black cardamom, star anise, bay leaves, cinnamon, mace, and cloves for authentic aroma.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_basmati_1kg',
        name: 'Premium Aged Basmati Rice (1kg)',
        price: 6.49,
        type: 'Raw Ingredient',
        description: 'Extra-long grain basmati rice, aged for 2 years to deliver unmatched fluffiness and aroma.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_saffron_1g',
        name: 'Kashmiri Saffron (Zafran - 1g)',
        price: 14.99,
        type: 'Raw Ingredient',
        description: 'Handpicked Grade A kashmiri saffron threads for gorgeous golden color and exquisite fragrance.',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Delhi Style Butter Chicken',
    origin: 'Indian',
    description: 'An legendary Indian masterpiece originating from old Delhi. Juicy, yogurt-marinated chicken thighs charred in a clay oven (or cast iron pan), then gently simmered in a velvety, buttery tomato gravy infused with dried fenugreek leaves (Kasuri Methi).',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 4,
    spiceLevel: 'Mild',
    isVegetarian: false,
    isGlutenFree: true,
    ingredients: [
      { name: 'Boneless Chicken Thighs', amount: '800g', category: 'Meat' },
      { name: 'Kashmiri Chili Powder', amount: '2 tsp', category: 'Spices' },
      { name: 'Yogurt', amount: '0.5 cup', category: 'Fresh Produce' },
      { name: 'Butter', amount: '100g', category: 'Fresh Produce' },
      { name: 'Tomato Puree', amount: '2 cups', category: 'Pantry' },
      { name: 'Ginger-Garlic Paste', amount: '1.5 tbsp', category: 'Pantry' },
      { name: 'Garam Masala Blend', amount: '1 tsp', category: 'Spices' },
      { name: 'Heavy Cream', amount: '0.5 cup', category: 'Fresh Produce' },
      { name: 'Dried Fenugreek Leaves (Kasuri Methi)', amount: '1 tbsp', category: 'Spices' },
      { name: 'Cashews (Soaked & ground to paste)', amount: '10-12', category: 'Pantry' },
      { name: 'Honey / Sugar', amount: '1 tbsp', category: 'Pantry' }
    ],
    instructions: [
      'Marinate chicken thighs in yogurt, ginger-garlic paste, 1 tsp Kashmiri chili powder, salt, and lemon juice. Rest in fridge for 2 hours.',
      'Heat 2 tbsp butter in a pan and sear chicken pieces on high heat until beautifully charred and cooked 80% through. Remove and chop into bite-sized cubes.',
      'In the same pan, melt 3 tbsp butter, add tomato puree, cashew paste, remaining Kashmiri chili powder, and ginger-garlic paste. Simmer on medium-low for 10 minutes.',
      'Blend the gravy with an immersion blender until silken, then pass through a sieve if desired.',
      'Return the smooth gravy to the pan, add the cooked chicken cubes, honey, and garam masala. Cover and simmer on low for 8-10 mins.',
      'Stir in the heavy cream and rub Kasuri Methi between your palms to crush it over the dish.',
      'Let sit for 2 minutes to meld the flavors, then serve garnished with a swirl of cream and a pat of butter beside warm garlic naan.'
    ],
    ecommerceItems: [
      {
        id: 'sp_kasuri_methi',
        name: 'Kasuri Methi (Dried Fenugreek, 50g)',
        price: 3.49,
        type: 'Raw Ingredient',
        description: 'Fragrant sun-dried fenugreek leaves, the secret magic key to Butter Chicken aroma.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_makhani_kit',
        name: 'Delhi Makhani Spice & Cream Kit',
        price: 7.99,
        type: 'Spice Kit',
        description: 'Contains Premium Garam Masala, organic Kashmiri chili powder, cashew meal, and whole green cardamom.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '3',
    name: 'Lahori Nihari (Slow-Cooked Beef Stew)',
    origin: 'Pakistani',
    description: 'The ultimate King of Pakistani breakfast stews. Beef shanks slow-cooked overnight with marrow bones in a thick, velvety gravy enriched with a special roasted dry spice mix, finished with ginger juliennes, coriander, chopped fresh chilies, and lime.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    cookTime: '180 mins',
    servings: 6,
    spiceLevel: 'Extra Hot',
    isVegetarian: false,
    isGlutenFree: false, // uses wheat flour for thickening
    ingredients: [
      { name: 'Beef Shank (with bones & marrow)', amount: '1.2 kg', category: 'Meat' },
      { name: 'Lahori Nihari Spice Blend', amount: '3 tbsp', category: 'Spices' },
      { name: 'Wheat Flour (Atta)', amount: '0.5 cup', category: 'Pantry' },
      { name: 'Ghee', amount: '1 cup', category: 'Pantry' },
      { name: 'Onions (Sautéed)', amount: '1 large', category: 'Fresh Produce' },
      { name: 'Ginger Paste', amount: '2 tbsp', category: 'Pantry' },
      { name: 'Garlic Paste', amount: '1 tbsp', category: 'Pantry' },
      { name: 'Fresh Ginger (Julienned)', amount: '0.25 cup', category: 'Fresh Produce' },
      { name: 'Lemons & Fresh Coriander', amount: 'For garnish', category: 'Fresh Produce' }
    ],
    instructions: [
      'In a large heavy pot, heat ghee and add ginger-garlic paste. Fry for 1 minute until fragrant.',
      'Add the beef shanks and marrow bones. Sear on high heat for 5-7 minutes until the meat is browned on all sides.',
      'Add 2 tbsp of the Special Nihari Spice Blend and stir well. Pour in 6 cups of water and bring to a boil.',
      'Reduce heat to ultra-low, cover tightly, and simmer undisturbed for 3 to 4 hours (or overnight) until the meat is incredibly tender and falling off the bone.',
      'Mix wheat flour with 1 cup of cold water until entirely smooth. Slowly pour this slurry into the simmering stew while stirring constantly to avoid lumps.',
      'Let the stew simmer for another 15-20 minutes on medium heat. The gravy will thicken and become satiny and velvety.',
      'In a small skillet, heat 3 tbsp ghee with sliced onions and 1 tsp Nihari spice to create a Tarka (tempering oil). Pour this sizzling Tarka over the stew.',
      'Serve sizzling hot garnished with lots of fresh julienned ginger, chopped green chilies, coriander, and squeezed fresh lime juice alongside soft Roghni Naan.'
    ],
    ecommerceItems: [
      {
        id: 'sp_nihari_masala',
        name: 'Lahori Nihari Ground Spice Mix',
        price: 4.99,
        type: 'Spice Kit',
        description: 'Authentic stone-ground spices containing fennel, dry ginger (Sont), long pepper (Pipli), nutmeg, and mace.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_roghni_naan_kit',
        name: 'Roghni Naan Dough & Sesame Mix',
        price: 3.99,
        type: 'Spice Kit',
        description: 'Premium wheat flour pre-measured with dry yeast, sugar, salt, and black/white sesame seeds for home baking.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '4',
    name: 'Shahi Palak Paneer',
    origin: 'Indian',
    description: 'A vibrant and healthy North Indian royal favorite. Hand-ground fresh spinach simmered with aromatic spices, garlic, a touch of cream, and loaded with soft, pan-seared cubes of organic Indian cottage cheese (Paneer).',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 4,
    spiceLevel: 'Medium',
    isVegetarian: true,
    isGlutenFree: true,
    ingredients: [
      { name: 'Paneer Cheese', amount: '400g', category: 'Meat' }, // paneer under meat/protein
      { name: 'Fresh Spinach (Palak)', amount: '500g', category: 'Fresh Produce' },
      { name: 'Onions (Chipped)', amount: '1 medium', category: 'Fresh Produce' },
      { name: 'Tomatoes (Finely chopped)', amount: '2 medium', category: 'Fresh Produce' },
      { name: 'Green Chilies', amount: '3', category: 'Fresh Produce' },
      { name: 'Ginger (Grated)', amount: '1 tbsp', category: 'Fresh Produce' },
      { name: 'Garlic (Minced)', amount: '6 cloves', category: 'Fresh Produce' },
      { name: 'Cumin Powder', amount: '1 tsp', category: 'Spices' },
      { name: 'Kasoori Methi', amount: '1 tsp', category: 'Spices' },
      { name: 'Ghee / Oil', amount: '2 tbsp', category: 'Pantry' },
      { name: 'Fresh Cream', amount: '2 tbsp', category: 'Fresh Produce' }
    ],
    instructions: [
      'Blanch spinach leaves in salted boiling water for 2 minutes. Plunge immediately into ice-cold water to preserve the gorgeous vivid green color.',
      'Blend the blanched spinach with green chilies in a blender to a smooth puree.',
      'Cut paneer into 1-inch cubes. Heat 1 tbsp ghee in a pan and lightly pan-sear paneer cubes until slightly golden. Set aside in warm water to keep them soft.',
      'In the same pan, add the remaining ghee. Fry minced cumin seeds, garlic, ginger, and onions until translucent.',
      'Add chopped tomatoes and cook until they soften completely and oil starts separating.',
      'Stir in cumin powder, garam masala, salt, and the spinach puree. Cook on low heat for 5 minutes, adding a splash of water if too thick.',
      'Add the warm paneer cubes and let them simmer in the spinach gravy for 3-4 minutes so they absorb the savory spices.',
      'Stir in Kasuri Methi and fresh cream. Serve hot with a squeeze of fresh lemon juice alongside flatbread or jeera rice.'
    ],
    ecommerceItems: [
      {
        id: 'sp_paneer_masala',
        name: 'Royal Shahi Paneer Spice Blend',
        price: 4.29,
        type: 'Spice Kit',
        description: 'Exquisite dry roasted spice blend including coriander, cumin, dry mango (Amchur), nutmeg, and green cardamom.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '5',
    name: 'Pindi Chana Masala',
    origin: 'Both',
    description: 'A classic dark, tangy, and robust chickpea curry beloved in both Rawalpindi and Amritsar. Chickpeas simmered with dried amla (Indian gooseberry) and black tea bags for a deep, dark color, tossed with highly aromatic roasted spice spices.',
    image: 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?q=80&w=800&auto=format&fit=crop',
    prepTime: '15 mins',
    cookTime: '40 mins',
    servings: 4,
    spiceLevel: 'Medium',
    isVegetarian: true,
    isGlutenFree: true,
    ingredients: [
      { name: 'White Chickpeas (Kabuli Chana)', amount: '2 cups', category: 'Pantry' },
      { name: 'Black Tea Bag', amount: '2', category: 'Pantry' },
      { name: 'Dry Pomegranate Seeds (Anardana)', amount: '2 tbsp', category: 'Spices' },
      { name: 'Amchur Powder (Dry Mango)', amount: '1 tsp', category: 'Spices' },
      { name: 'Kashmiri Chili Powder', amount: '1.5 tsp', category: 'Spices' },
      { name: 'Coriander Seeds (Roasted & crushed)', amount: '1.5 tbsp', category: 'Spices' },
      { name: 'Ginger-Garlic Paste', amount: '1 tbsp', category: 'Pantry' },
      { name: 'Onions (Chopped)', amount: '2 medium', category: 'Fresh Produce' },
      { name: 'Tomato (Finely chopped)', amount: '1 large', category: 'Fresh Produce' },
      { name: 'Slit Green Chilies', amount: '4', category: 'Fresh Produce' },
      { name: 'Baking Soda', amount: '0.25 tsp', category: 'Pantry' }
    ],
    instructions: [
      'Soak chickpeas overnight with ample water. Drain and pressure-cook with fresh water, black tea bags, baking soda, and a pinch of salt until tender (about 6 whistles or 25 mins). Discard tea bags.',
      'In a dry skillet, roast pomegranate seeds, coriander seeds, cumin, and cloves until dark and fragrant. Grind to a fine dry powder.',
      'Heat ghee/oil in a pan. Sauté chopped onions until golden brown, then add ginger-garlic paste and sauté for another minute.',
      'Add chopped tomatoes and fry until mushy. Add the homemade ground spice mix, Kashmiri chili powder, amchur powder, and salt. Cook until ghee separates.',
      'Add the boiled, drained chickpeas and 1 cup of their boiling liquid. Mash a few chickpeas with a spatula to thicken the gravy.',
      'Simmer on medium heat for 15 minutes until the chickpeas have absorbed all the complex tangy flavor and gravy is thick.',
      'Garnish with julienned ginger, slit green chilies, and fresh chopped coriander. Serve piping hot with puffy Bhature or fluffy basmati rice.'
    ],
    ecommerceItems: [
      {
        id: 'sp_chana_masala',
        name: 'Pindi Chana Special Spice Kit',
        price: 3.99,
        type: 'Spice Kit',
        description: 'Contains whole pomegranate seeds (Anardana), roasted amchur, Kashmiri dry chili, cardamom, and black tea bags.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_chana_raw',
        name: 'Organic Kabuli Chickpeas (1kg)',
        price: 4.49,
        type: 'Raw Ingredient',
        description: 'Extra-large premium quality white chickpeas, high in protein and perfect for absorbing aromatic spices.',
        image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '6',
    name: 'Samosa Chaat street style',
    origin: 'Both',
    description: 'An explosion of sweet, tangy, and spicy street food flavors. Flaky, crispy potato and pea samosas crushed and smothered in warm chickpea curry, layered with thick chilled sweetened yogurt, spiced sweet tamarind pulp, and fiery fresh coriander-mint chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800&auto=format&fit=crop', // samosa/chaat image
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: 2,
    spiceLevel: 'Medium',
    isVegetarian: true,
    isGlutenFree: false,
    ingredients: [
      { name: 'Prepared Crispy Samosas', amount: '4 pieces', category: 'Pantry' },
      { name: 'Prepared Chickpea Curry (Chana)', amount: '1.5 cups', category: 'Pantry' },
      { name: 'Chilled Thick Yogurt (Sweetened)', amount: '1 cup', category: 'Fresh Produce' },
      { name: 'Sweet Tamarind Chutney', amount: '0.5 cup', category: 'Pantry' },
      { name: 'Spicy Mint-Coriander Chutney', amount: '0.5 cup', category: 'Fresh Produce' },
      { name: 'Sev (Crispy chickpea flour noodles)', amount: '0.5 cup', category: 'Pantry' },
      { name: 'Chaot Masala', amount: '2 tsp', category: 'Spices' },
      { name: 'Red Onion (Finely chopped)', amount: '0.5 cup', category: 'Fresh Produce' }
    ],
    instructions: [
      'Warm up the samosas in an oven or air fryer until they are intensely crispy and golden brown.',
      'Heat up your chickpea curry until hot.',
      'Assemble: Place 2 warm samosas in a shallow bowl and gently crush them with the back of a spoon.',
      'Pour a generous ladle of hot chickpea curry directly over the crushed samosas.',
      'Drizzle heavily with sweetened whisked yogurt, followed by sweet tamarind chutney and spicy mint chutney.',
      'Sprinkle finely chopped red onions, fresh coriander leaves, and a generous pinch of Chat Masala.',
      'Top with a handful of crunchy Sev for texture and some pomegranate seeds if available.',
      'Devour immediately while the samosas are still partially crispy and the layers of hot and cold create a perfect party in your mouth.'
    ],
    ecommerceItems: [
      {
        id: 'sp_chaat_masala',
        name: 'Street Style Chaat Masala (100g)',
        price: 2.99,
        type: 'Raw Ingredient',
        description: 'Tangy and salty seasoning containing black salt (Kala Namak), cumin, dry mango, and mint powder.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_tamarind_paste',
        name: 'Sweet Tamarind Chutney Paste',
        price: 3.99,
        type: 'Raw Ingredient',
        description: 'Rich concentration of real sour tamarind sweetened with organic jaggery and spiced with ginger powder.',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '7',
    name: 'Kashmiri Rogan Josh (Aromatic Lamb)',
    origin: 'Indian',
    description: 'A deeply fragrant signature Kashmiri lamb curry cooked in a thin, rich, intensely red sauce powered by dried ginger powder, fennel powder, and authentic Kashmiri red chilies, with a hint of asafetida and whole garam spices.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    prepTime: '25 mins',
    cookTime: '90 mins',
    servings: 4,
    spiceLevel: 'Hot',
    isVegetarian: false,
    isGlutenFree: true,
    ingredients: [
      { name: 'Lamb Shoulder (Cubed)', amount: '800g', category: 'Meat' },
      { name: 'Mustard Oil (Traditional)', amount: '0.5 cup', category: 'Pantry' },
      { name: 'Asafetida (Hing)', amount: '0.25 tsp', category: 'Spices' },
      { name: 'Kashmiri Red Chili Powder', amount: '2.5 tbsp', category: 'Spices' },
      { name: 'Fennel Seed Powder (Saunf)', amount: '1.5 tbsp', category: 'Spices' },
      { name: 'Dry Ginger Powder (Sonth)', amount: '1 tsp', category: 'Spices' },
      { name: 'Yogurt (Whisked)', amount: '1 cup', category: 'Fresh Produce' },
      { name: 'Green Cardamom & Cloves', amount: '4 each', category: 'Spices' },
      { name: 'Rattan Jot (Natural red herb) or Saffron', amount: '1 small stick', category: 'Spices' }
    ],
    instructions: [
      'Heat mustard oil in a heavy cooking pot until it smokes, then turn off the heat for 2 minutes to cool slightly (this mellows the harshness of mustard oil).',
      'Turn the heat back to medium. Add whole green cardamoms, cloves, and a pinch of asafetida.',
      'Add the lamb cubes to the aromatic oil and stir-fry for 7-10 minutes until the lamb is sealed and lightly browned.',
      'In a bowl, mix Kashmiri red chili powder with 2 tbsp of water to form a smooth paste. Stir this paste into the meat.',
      'Add fennel powder and ginger powder. Sauté for 2 minutes while sprinkling a tiny bit of water to keep the dry spices from burning.',
      'Reduce heat to low and gradually stir in the whisked yogurt. Stir continuously to prevent the yogurt from curdling.',
      'Pour in 1.5 cups of warm water. Cover the pot with a heavy lid and cook on low heat for 1 hour, or until the lamb is melt-in-the-mouth tender.',
      'Drizzle a pinch of garam masala over the thick red layer of oil (Rogan) floating on top. Serve with simple hot steamed basmati rice.'
    ],
    ecommerceItems: [
      {
        id: 'sp_rogan_chili',
        name: 'Pure Kashmiri Chili Powder (150g)',
        price: 5.49,
        type: 'Raw Ingredient',
        description: 'Vibrant crimson dry-ground chilies that provide the signature fiery red color with mild, pleasant heat.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_rogan_kit',
        name: 'Kashmiri Rogan Josh Spice Kit',
        price: 6.99,
        type: 'Spice Kit',
        description: 'Contains fennel powder, dry ginger powder, Rattan Jot bark for crimson color, asafetida, and cloves.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '8',
    name: 'Shahi Gulab Jamun',
    origin: 'Both',
    description: 'The undisputed royal dessert of South Asia. Delicate, pillowy spheres made of evaporated milk solids (Khoya) kneaded with a touch of flour, fried to dark golden brown, and soaked in warm, fragrant sugar syrup infused with saffron and cardamom.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop',
    prepTime: '20 mins',
    cookTime: '20 mins',
    servings: 6,
    spiceLevel: 'Mild',
    isVegetarian: true,
    isGlutenFree: false,
    ingredients: [
      { name: 'Khoya (Milk solids) or Milk Powder', amount: '2 cups', category: 'Pantry' },
      { name: 'All-Purpose Flour (Maida)', amount: '0.25 cup', category: 'Pantry' },
      { name: 'Baking Powder', amount: '1 pinch', category: 'Pantry' },
      { name: 'Ghee (For kneading & frying)', amount: '2 tbsp + for frying', category: 'Pantry' },
      { name: 'Sugar', amount: '2 cups', category: 'Pantry' },
      { name: 'Water', amount: '2 cups', category: 'Pantry' },
      { name: 'Green Cardamom Pods', amount: '5', category: 'Spices' },
      { name: 'Rose Water', amount: '1 tsp', category: 'Pantry' },
      { name: 'Pistachios (Slivered)', amount: '2 tbsp', category: 'Fresh Produce' }
    ],
    instructions: [
      'In a saucepan, combine sugar, water, and crushed cardamom pods. Bring to a boil, then simmer on low for 10 minutes to create a sticky, light-bodied syrup. Stir in rose water and saffron; keep warm.',
      'In a mixing bowl, crumble khoya or sift milk powder. Mix in the flour and baking powder.',
      'Add 2 tbsp warm milk and 1 tsp ghee, then gently knead to form a smooth, soft dough. Do not overwork the dough or the jamuns will become dense.',
      'Divide the dough into 15 small portions. Roll them gently between your palms into perfect, smooth balls with absolutely no cracks (cracks will cause them to split during frying).',
      'Heat ghee or oil in a deep frying pan on medium-low heat. The ghee should be warm, never hot.',
      'Gently slide the dough balls into the ghee. They should sink first, then slowly float to the top. Fry on very low heat, rotating the ghee continuously with a slotted spoon without touching the jamuns.',
      'Fry for 10-12 minutes until they turn a deep, even golden-mahogany brown. Drain and transfer directly into the warm sugar syrup.',
      'Let them soak in the syrup for at least 1-2 hours until they double in size and become incredibly soft, juicy, and sweet.',
      'Serve warm garnished with slivered pistachios and almonds.'
    ],
    ecommerceItems: [
      {
        id: 'sp_rose_water',
        name: 'Organic Culinary Rose Water (100ml)',
        price: 4.99,
        type: 'Raw Ingredient',
        description: 'Pure double-distilled edible rose petal extract for heavenly dessert aromatics.',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 'sp_gulab_mix',
        name: 'Instant Royal Gulab Jamun Flour Mix',
        price: 3.49,
        type: 'Spice Kit',
        description: 'Pre-balanced premium milk powder, cardamoms, and fine wheat flour mix for failure-free gulab jamuns.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop'
      }
    ]
  }
];

export const CATEGORIES = ['All', 'Pakistani', 'Indian', 'Vegetarian', 'Gluten Free'];

export const ALL_INGREDIENTS = [
  'Beef Chuck or Shank', 'Basmati Rice (Aged)', 'Yogurt', 'Onions (Thinly sliced)', 'Ginger-Garlic Paste',
  'Green Chilies (Slit)', 'Biryani Whole Spice Blend', 'Red Chili Powder', 'Kashmiri Saffron (Zafran)',
  'Fresh Mint & Coriander Leaves', 'Kewra Water', 'Oil / Ghee', 'Boneless Chicken Thighs',
  'Kashmiri Chili Powder', 'Butter', 'Tomato Puree', 'Garam Masala Blend', 'Heavy Cream',
  'Dried Fenugreek Leaves (Kasuri Methi)', 'Cashews (Soaked & ground to paste)', 'Honey / Sugar',
  'Beef Shank (with bones & marrow)', 'Lahori Nihari Spice Blend', 'Wheat Flour (Atta)',
  'Fresh Ginger (Julienned)', 'Paneer Cheese', 'Fresh Spinach (Palak)', 'Tomatoes (Finely chopped)',
  'Green Chilies', 'Garlic (Minced)', 'Cumin Powder', 'Kasoori Methi', 'Fresh Cream',
  'White Chickpeas (Kabuli Chana)', 'Black Tea Bag', 'Dry Pomegranate Seeds (Anardana)',
  'Amchur Powder (Dry Mango)', 'Coriander Seeds (Roasted & crushed)', 'Onions (Chopped)',
  'Tomato (Finely chopped)', 'Baking Soda', 'Prepared Crispy Samosas', 'Prepared Chickpea Curry (Chana)',
  'Chilled Thick Yogurt (Sweetened)', 'Sweet Tamarind Chutney', 'Spicy Mint-Coriander Chutney',
  'Sev (Crispy chickpea flour noodles)', 'Chaot Masala', 'Red Onion (Finely chopped)',
  'Lamb Shoulder (Cubed)', 'Mustard Oil (Traditional)', 'Asafetida (Hing)',
  'Fennel Seed Powder (Saunf)', 'Dry Ginger Powder (Sonth)', 'Rattan Jot (Natural red herb) or Saffron',
  'Khoya (Milk solids) or Milk Powder', 'All-Purpose Flour (Maida)', 'Baking Powder',
  'Sugar', 'Water', 'Green Cardamom Pods', 'Rose Water', 'Pistachios (Slivered)'
].sort();
