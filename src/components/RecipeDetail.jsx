import React from "react";
import { useParams } from "react-router-dom";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

const RecipeDetail = ({ recipes }) => {
  const { name } = useParams();
  const recipe = recipes.find((recipe) => generateSlug(recipe.name) === name); 

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-700 mb-4">Category: {recipe.category}</p>
      <p className="text-gray-600">{recipe.description}</p>
    </div>
  );
};

export default RecipeDetail;
