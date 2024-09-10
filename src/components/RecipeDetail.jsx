import React from "react";
import { useParams } from "react-router-dom";

// Slug oluşturma fonksiyonu
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

const defaultImage = "https://via.placeholder.com/150?text=No+Image";

const RecipeDetail = ({ recipes }) => {
  const { name } = useParams();
  const recipe = recipes.find((recipe) => generateSlug(recipe.name) === name); // Slug'a göre eşleşme

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image || defaultImage} 
        alt={recipe.name}
        className="w-64 h-64 rounded mb-4"
      />
      <p className="text-gray-700 mb-4">Cuisine: {recipe.cuisine}</p>
      <p className="text-gray-600">{recipe.description}</p>
    </div>
  );
};

export default RecipeDetail;
