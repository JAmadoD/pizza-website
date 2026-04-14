// Simplified menu data for local use, inspired by Royal Pizza Fall River's public menu.
// Prices are approximate and should be confirmed when ordering.

const MENU_DATA = {
  pizza: {
    title: "Pizza",
    subtitle: "Greek-style pans, small & large.",
    items: [
      {
        id: "pizza-cheese",
        name: "Cheese",
        description: "Classic cheese pizza.",
        prices: [{ size: "Small", price: 7.75 }, { size: "Large", price: 12.0 }]
      },
      {
        id: "pizza-1topping",
        name: "1 Topping",
        description: "Build your own with one topping.",
        prices: [{ size: "Small", price: 10.0 }, { size: "Large", price: 15.0 }]
      },
      {
        id: "pizza-2topping",
        name: "2 Topping",
        description: "Choose any two toppings.",
        prices: [{ size: "Small", price: 11.0 }, { size: "Large", price: 17.0 }]
      },
      {
        id: "pizza-3topping",
        name: "3 Topping",
        description: "Three toppings, your way.",
        prices: [{ size: "Small", price: 12.0 }, { size: "Large", price: 19.0 }]
      },
      {
        id: "pizza-portuguese-steak",
        name: "Portuguese Steak",
        description: "House specialty pizza with steak and bold local flavor.",
        prices: [{ size: "Small", price: 15.5 }, { size: "Large", price: 22.0 }]
      },
      {
        id: "pizza-greek",
        name: "Greek",
        description: "Feta-forward pizza with Mediterranean character.",
        prices: [{ size: "Small", price: 13.5 }, { size: "Large", price: 20.0 }]
      },
      {
        id: "pizza-steak-cheese",
        name: "Steak & Cheese",
        description: "Steakhouse-style pizza with melted cheese.",
        prices: [{ size: "Small", price: 12.0 }, { size: "Large", price: 18.0 }]
      },
      {
        id: "pizza-hawaiian",
        name: "Hawaiian",
        description: "Ham and pineapple.",
        prices: [{ size: "Small", price: 11.0 }, { size: "Large", price: 17.0 }]
      },
      {
        id: "pizza-royal-special",
        name: "Royal Extra Special",
        description: "Loaded with meats and veggies.",
        prices: [{ size: "Small", price: 13.0 }, { size: "Large", price: 20.0 }]
      },
      {
        id: "pizza-chicken-mozambique",
        name: "Chicken Mozambique",
        description: "Pizza with Mozambique-style chicken.",
        prices: [{ size: "Small", price: 12.0 }, { size: "Large", price: 18.0 }]
      }
    ]
  },
  calzones: {
    title: "Calzones",
    subtitle: "Baked to order with mozzarella cheese.",
    items: [
      { id: "calzone-cheese", name: "Cheese Calzone", description: "Classic mozzarella calzone.", prices: [{ size: "One size", price: 9.25 }] },
      { id: "calzone-spinach-feta", name: "Spinach & Feta", description: "Spinach and feta cheese.", prices: [{ size: "One size", price: 12.0 }] },
      { id: "calzone-steak", name: "Steak & Cheese", description: "Steak and cheese filling.", prices: [{ size: "One size", price: 13.0 }] },
      { id: "calzone-chicken-mozambique", name: "Chicken Mozambique", description: "Mozambique-style chicken calzone.", prices: [{ size: "One size", price: 13.0 }] }
    ]
  },
  grinders: {
    title: "Grinders & Subs",
    subtitle: "Available as subs, wraps, or pockets.",
    items: [
      { id: "grinder-italian", name: "Italian", description: "Cold cut combo with veggies.", prices: [{ size: "Small", price: 8.25 }, { size: "Large", price: 9.25 }] },
      { id: "grinder-steak-cheese", name: "Steak & Cheese", description: "Grilled steak with melted cheese.", prices: [{ size: "Small", price: 9.25 }, { size: "Large", price: 10.25 }] },
      { id: "grinder-chicken-cutlet", name: "Chicken Cutlet Parm", description: "Breaded chicken cutlet with sauce and cheese.", prices: [{ size: "Small", price: 8.5 }, { size: "Large", price: 9.5 }] },
      { id: "grinder-portuguese-steak", name: "Portuguese Steak", description: "A strong local favorite with steak and house flavor.", prices: [{ size: "Small", price: 10.0 }, { size: "Large", price: 11.0 }] },
      { id: "grinder-chourico-chips", name: "Chourico & Chips", description: "Portuguese chourico with fries.", prices: [{ size: "Small", price: 9.25 }, { size: "Large", price: 10.25 }] }
    ]
  },
  pasta: {
    title: "Pasta",
    subtitle: "Spaghetti or ziti.",
    items: [
      { id: "pasta-sauce", name: "Pasta with Sauce", description: "Simple red sauce.", prices: [{ size: "One size", price: 8.5 }] },
      { id: "pasta-meatballs", name: "Pasta with Meatballs", description: "Homestyle meatballs.", prices: [{ size: "One size", price: 11.0 }] },
      { id: "pasta-chicken-parm", name: "Chicken Parm Pasta", description: "Fried chicken cutlet with pasta.", prices: [{ size: "One size", price: 11.0 }] },
      { id: "pasta-tour-of-royal", name: "Tour of Royal", description: "Sampler-style pasta plate.", prices: [{ size: "One size", price: 15.5 }] }
    ]
  },
  fried: {
    title: "Fried & Sides",
    subtitle: "Wings, tenders, fries, and more.",
    items: [
      { id: "fried-wings", name: "Chicken Wings", description: "Crispy fried wings.", prices: [{ size: "9 pc", price: 11.0 }] },
      { id: "fried-fingers", name: "Chicken Fingers", description: "Breaded chicken strips.", prices: [{ size: "7 pc", price: 11.0 }] },
      { id: "fried-fish-chips", name: "Fish & Chips", description: "Fried fish with fries.", prices: [{ size: "One size", price: 13.75 }] },
      { id: "side-mozzarella-sticks", name: "Mozzarella Sticks", description: "Crispy fried mozzarella sticks.", prices: [{ size: "One size", price: 7.5 }] },
      { id: "side-fries", name: "Fries", description: "Golden fries.", prices: [{ size: "Small", price: 2.75 }, { size: "Large", price: 4.5 }] },
      { id: "side-loaded-fries", name: "Fries with Cheese, Bacon & Jalapeños", description: "Loaded fries with heat and crunch.", prices: [{ size: "One size", price: 7.5 }] }
    ]
  },
  salads: {
    title: "Salads & Wraps",
    subtitle: "Fresh salads, also available as wraps/pockets.",
    items: [
      { id: "salad-garden", name: "Garden Salad", description: "Lettuce, tomato, cucumber, and more.", prices: [{ size: "One size", price: 9.0 }] },
      { id: "salad-greek", name: "Greek Salad", description: "Garden salad with feta and olives.", prices: [{ size: "One size", price: 10.0 }] },
      { id: "salad-ceasar-chicken", name: "Caesar with Chicken", description: "Caesar salad with grilled or fried chicken.", prices: [{ size: "One size", price: 12.0 }] },
      { id: "wrap-chicken", name: "Chicken Wrap/Pocket", description: "Grilled or fried chicken with salad.", prices: [{ size: "One size", price: 10.5 }] }
    ]
  },
  gyros: {
    title: "Gyros",
    subtitle: "Served in warm pita.",
    items: [
      { id: "gyro-regular", name: "Gyro", description: "Classic gyro with toppings.", prices: [{ size: "One size", price: 9.25 }] },
      { id: "gyro-chicken", name: "Chicken Gyro", description: "Gyro with grilled chicken.", prices: [{ size: "One size", price: 10.5 }] }
    ]
  },
  desserts: {
    title: "Desserts",
    subtitle: "Finish on a sweet note.",
    items: [
      { id: "dessert-baklava", name: "Baklava", description: "Layered pastry with nuts and honey.", prices: [{ size: "One size", price: 3.75 }] },
      { id: "dessert-brownie", name: "Brownie Bites", description: "Rich chocolate brownies.", prices: [{ size: "One size", price: 4.0 }] }
    ]
  }
};
