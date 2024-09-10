import React, { useState } from "react";
import Select from "react-select";
import Flag from "react-world-flags";

// Ülke ve mutfak verileri
const countries = [
  { label: "Italy", code: "IT" },
  { label: "India", code: "IN" },
  { label: "Mexico", code: "MX" },
  { label: "Japan", code: "JP" },
  { label: "France", code: "FR" },
];

const RecipeForm = ({ addRecipe }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState(countries[0]); 
  const [image, setImage] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(),
      name,
      description,
      cuisine: cuisine.label, 
      image,
    };

    addRecipe(newRecipe);
    setName("");
    setDescription("");
    setCuisine(countries[0]);
    setImage(null);
  };

  const handleCuisineChange = (selectedOption) => {
    setCuisine(selectedOption);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Bayrak ve ülke adıyla birlikte stilize edilmiş dropdown seçenekleri
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FCF5E5" : "white", 
      color: "black", 
      padding: 10,
      cursor: "pointer",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": { borderColor: "#aaa" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      zIndex: 999,
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "black",
    }),
  };

  const formatOptionLabel = ({ label, code }) => (
    <div className="flex items-center">
      <Flag code={code} className="mr-2 w-6 h-4" /> {label}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>

      {/* Tarif İsmi */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Recipe Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Açıklama Alanı */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Mutfak (Cuisine) Dropdown */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="cuisine"
        >
          Select Cuisine
        </label>
        <Select
          value={cuisine}
          onChange={handleCuisineChange}
          options={countries}
          formatOptionLabel={formatOptionLabel} 
          styles={customStyles}
          isSearchable
          className="w-full"
        />
      </div>

      {/* Fotoğraf Yükleme Alanı */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
