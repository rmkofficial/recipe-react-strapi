import React, { useState } from "react";
import axios from "axios";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const formattedDescription = [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: description, 
          },
        ],
      },
    ];

    const newRecipe = new FormData();
    newRecipe.append(
      "data",
      JSON.stringify({ name, description: formattedDescription, cuisine })
    );
    if (image) {
      newRecipe.append("files.image", image); 
    }

    // Strapi API'ye yeni tarif gönderme
    axios
      .post("http://localhost:1337/api/recipes", newRecipe, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Recipe added successfully:", response.data);
        setName("");
        setDescription("");
        setCuisine("");
        setImage(null); 
      })
      .catch((error) => {
        console.error("There was an error adding the recipe!", error);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Recipe Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Cuisine
        </label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
