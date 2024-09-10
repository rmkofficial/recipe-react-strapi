import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Strapi API'sinden tarifleri çekme
    axios
      .get("http://localhost:1337/api/recipes")
      .then((response) => {
        console.log("API Response Data:", response.data.data); 
        setRecipes(response.data.data); 
      })
      .catch((error) => {
        console.error("Error fetching the recipes from Strapi:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      {recipes.length > 0 ? (
        <ul className="space-y-4">
          {recipes.map((recipe) => {
            const recipeData = recipe.attributes;

            
            const recipeDescription = recipeData.Description.map((desc) =>
              desc.children.map((child) => child.text).join(" ")
            ).join(" ");

            return (
              <li key={recipe.id} className="border-b pb-4 flex items-center">
                <div>
                  <h2 className="text-xl font-semibold">{recipeData.Name}</h2>
                  <p className="text-gray-700">{recipeDescription}</p>
                  <p className="text-gray-500">{recipeData.Cuisine}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
