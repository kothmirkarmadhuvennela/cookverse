const recipes = [
  {
    id: 1,
    title: "Spicy Chicken Curry",
    category: "Dinner",
    time: "35 min",
    difficulty: "Medium",
    thumbnail:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/2tM1LFFxeKg",
    description: "A rich and flavorful curry made with warm spices and creamy sauce.",
    ingredients: [
      "500g chicken",
      "2 tbsp oil",
      "1 onion, chopped",
      "2 garlic cloves",
      "1 tbsp curry powder",
      "1 cup coconut milk",
      "Salt and pepper"
    ],
    steps: [
      "Heat oil in a pan and sauté the onion until soft.",
      "Add garlic and curry powder, stir for 30 seconds.",
      "Add chicken and cook until lightly browned.",
      "Pour in coconut milk and simmer for 15 minutes.",
      "Season with salt and pepper, then serve hot."
    ]
  },
  {
    id: 2,
    title: "Veggie Omelette",
    category: "Breakfast",
    time: "15 min",
    difficulty: "Easy",
    thumbnail:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/6tnl7uM0yKk",
    description: "A quick breakfast loaded with vegetables and protein.",
    ingredients: [
      "3 eggs",
      "1 tomato, chopped",
      "1/2 cup spinach",
      "1/4 onion",
      "1 tbsp butter",
      "Salt and pepper"
    ],
    steps: [
      "Whisk eggs with salt and pepper.",
      "Cook onion and vegetables in butter for 2 minutes.",
      "Pour in eggs and swirl gently.",
      "Cook until set and fold the omelette.",
      "Serve warm with toast or salad."
    ]
  },
  {
    id: 3,
    title: "Creamy Pasta",
    category: "Lunch",
    time: "25 min",
    difficulty: "Easy",
    thumbnail:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/7l1K7YxjVdM",
    description: "A smooth and comforting creamy pasta with garlic and herbs.",
    ingredients: [
      "200g pasta",
      "2 tbsp butter",
      "2 garlic cloves",
      "1 cup cream",
      "Parmesan",
      "Fresh parsley"
    ],
    steps: [
      "Boil the pasta until al dente and drain.",
      "Sauté garlic in butter for 30 seconds.",
      "Add cream and parmesan, stir gently.",
      "Mix in pasta and toss until coated.",
      "Finish with parsley and serve."
    ]
  },
  {
    id: 4,
    title: "Chocolate Mug Cake",
    category: "Dessert",
    time: "10 min",
    difficulty: "Easy",
    thumbnail:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
    video: "https://www.youtube.com/embed/0XR0VUnmVxc",
    description: "A fast and delicious dessert for chocolate lovers.",
    ingredients: [
      "4 tbsp flour",
      "2 tbsp cocoa powder",
      "2 tbsp sugar",
      "1/2 tsp baking powder",
      "3 tbsp milk",
      "1 tbsp oil"
    ],
    steps: [
      "Mix flour, cocoa, sugar, and baking powder in a mug.",
      "Add milk and oil, stir until smooth.",
      "Microwave for 60–90 seconds.",
      "Let it cool for 1 minute.",
      "Serve with ice cream or chocolate sauce."
    ]
  }
];

const recipeList = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const modal = document.getElementById("recipeModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalTime = document.getElementById("modalTime");
const modalDifficulty = document.getElementById("modalDifficulty");
const ingredientList = document.getElementById("ingredientList");
const stepList = document.getElementById("stepList");
const recipeVideo = document.getElementById("recipeVideo");

let selectedCategory = "All";

function renderRecipes(items) {
  if (!items || items.length === 0) {
    recipeList.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipeList.innerHTML = items
    .map(
      (recipe) => `
        <article class="recipe-card">
          <img src="${recipe.thumbnail}" alt="${recipe.title}" />
          <div class="recipe-info">
            <div class="recipe-top">
              <h3>${recipe.title}</h3>
              <span class="badge">${recipe.category}</span>
            </div>

            <div class="meta-row">
              <span>⏱ ${recipe.time}</span>
              <span>🔥 ${recipe.difficulty}</span>
            </div>

            <p>${recipe.description}</p>

            <button class="view-btn" data-id="${recipe.id}">View Process</button>
          </div>
        </article>
      `
    )
    .join("");
}

function getFilteredRecipes() {
  const query = searchInput.value.trim().toLowerCase();

  return recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;

    const matchesSearch =
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

function updateRecipes() {
  renderRecipes(getFilteredRecipes());
}

searchInput.addEventListener("input", updateRecipes);

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    selectedCategory = chip.dataset.category;
    chips.forEach((item) => item.classList.toggle("active", item === chip));
    updateRecipes();
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".view-btn");
  if (!button) return;

  const recipeId = Number(button.dataset.id);
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) return;

  modalTitle.textContent = recipe.title;
  modalCategory.textContent = recipe.category;
  modalTime.textContent = recipe.time;
  modalDifficulty.textContent = recipe.difficulty;
  recipeVideo.src = recipe.video;

  ingredientList.innerHTML = recipe.ingredients
    .map((item) => `<li>${item}</li>`)
    .join("");

  stepList.innerHTML = recipe.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  recipeVideo.src = "";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
    recipeVideo.src = "";
  }
});

renderRecipes(recipes);
