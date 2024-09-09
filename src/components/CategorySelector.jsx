import React from "react";
import Flag from "react-world-flags";

const categories = [
  { country: "Italy", code: "IT" },
  { country: "India", code: "IN" },
  { country: "Mexico", code: "MX" },
  { country: "Japan", code: "JP" },
  { country: "France", code: "FR" },
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2 text-center">Filter by Country</h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Click a flag to filter recipes by country
      </p>

      <div className="flex flex-wrap justify-center">
        {/* Tüm Tarifler seçeneği */}
        <div
          className={`cursor-pointer m-2 p-2 border rounded-lg ${
            selectedCategory === "" ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => setSelectedCategory("")}
        >
          <p className="text-center font-bold">All Recipes</p>
        </div>

        {/* Ülke bayrakları */}
        {categories.map((category) => (
          <div
            key={category.code}
            className={`cursor-pointer m-2 p-2 border rounded-lg hover:[#FCF5E5] ${
              selectedCategory === category.country
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedCategory(category.country)}
          >
            <Flag code={category.code} className="w-10 h-6 mb-1" />
            <p className="text-center">{category.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
