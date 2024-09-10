import React from "react";
import { Link } from "react-router-dom";


const defaultImage = "https://via.placeholder.com/150?text=No+Image";

const RecipeList = ({ recipes }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border-b pb-4 flex items-center">
            <img
              src={recipe.image || defaultImage}
              alt={recipe.name}
              className="w-16 h-16 mr-4 rounded"
            />
            <Link
              to={`/recipe/${recipe.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p className="text-gray-500">{recipe.cuisine}</p>
              <p className="text-gray-700">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
