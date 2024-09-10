import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { name } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Tarif ismine göre Strapi API'den veri çekme
    axios
      .get(`http://localhost:1337/api/recipes?filters[name][$eq]=${name}`)
      .then((response) => {
        if (response.data.data.length > 0) {
          setRecipe(response.data.data[0].attributes);
        }
      })
      .catch((error) => {
        console.error("Error fetching the recipe details:", error);
      });
  }, [name]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={
          recipe.image
            ? recipe.image.url
            : "https://via.placeholder.com/150?text=No+Image"
        }
        alt={recipe.name}
        className="w-64 h-64 rounded mb-4"
      />
      <p className="text-gray-700 mb-4">Cuisine: {recipe.cuisine}</p>
      <p className="text-gray-600">{recipe.description}</p>
    </div>
  );
};

export default RecipeDetail;
