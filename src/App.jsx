import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeForm from "./components/RecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import CategorySelector from "./components/CategorySelector";
import RecipeList from "./components/RecipeList"; 

function App() {
  const [selectedCuisine, setSelectedCuisine] = useState(""); // Seçilen mutfak kategorisi
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi

  // Arama fonksiyonu
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Mutfak Kategorisi Seçici */}
                <CategorySelector
                  selectedCuisine={selectedCuisine}
                  setSelectedCuisine={setSelectedCuisine}
                />

                {/* Arama Çubuğu */}
                <div className="mb-6 mx-auto w-72">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search recipes by name or description..."
                    className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                  />
                </div>

                {/* Tarif Ekleme Formu */}
                <RecipeForm />

                {/* Tarif Listeleme (API'den veri çeken component) */}
                <RecipeList
                  selectedCuisine={selectedCuisine}
                  searchTerm={searchTerm}
                />
              </>
            }
          />

          {/* Tarif Detay Sayfası */}
          <Route path="/recipe/:name" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
