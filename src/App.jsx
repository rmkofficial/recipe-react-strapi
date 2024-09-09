import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import CategorySelector from "./components/CategorySelector"; 

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Spaghetti Carbonara",
      category: "Italy",
      description: "A classic Italian pasta dish...",
    },
    {
      id: 2,
      name: "Chicken Curry",
      category: "India",
      description: "A spicy and flavorful curry...",
    },
    {
      id: 3,
      name: "Beef Tacos",
      category: "Mexico",
      description: "Delicious tacos with seasoned beef...",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategorySelector
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <RecipeForm addRecipe={addRecipe} />
                <RecipeList recipes={filteredRecipes} />
              </>
            }
          />
          <Route
            path="/recipe/:name"
            element={<RecipeDetail recipes={recipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
