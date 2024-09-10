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
      cuisine: "Italy",
      description: "A classic Italian pasta dish...",
    },
    {
      id: 2,
      name: "Chicken Curry",
      cuisine: "India",
      description: "A spicy and flavorful curry...",
    },
    {
      id: 3,
      name: "Beef Tacos",
      cuisine: "Mexico",
      description: "Delicious tacos with seasoned beef...",
    },
  ]);

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Arama işlemi
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (selectedCuisine ? recipe.cuisine === selectedCuisine : true) && // Mutfak filtresi
      (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) // Anahtar kelimeye göre arama
    );
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategorySelector
                  selectedCuisine={selectedCuisine}
                  setSelectedCuisine={setSelectedCuisine}
                />
                <div className="mb-6 mx-auto w-72">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search recipes by name or description..."
                    className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                  />
                </div>
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
