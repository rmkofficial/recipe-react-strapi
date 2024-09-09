import React from "react";
import { Link } from "react-router-dom";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

const RecipeList = ({ recipes }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border-b pb-4">
            <Link to={`/recipe/${generateSlug(recipe.name)}`}>
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p className="text-gray-500">{recipe.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
