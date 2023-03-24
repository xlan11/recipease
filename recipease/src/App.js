import React, { useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=ee058bb9f2f5443590bc5934895370f3&ingredients=${ingredients}`
    );
    const data = await response.json();
    setRecipes(data);
    console.log(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search for recipes by ingredients:
          <input type="text" value={ingredients} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {recipes.length > 0 ? (
        <div>
          <h1>Recipes using {ingredients}:</h1>
          <ul>
              {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title}/>
              </li>              
            ))}
          </ul>
        </div>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
}

export default App;
