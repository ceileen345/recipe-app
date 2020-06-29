import React, {useState} from 'react'
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import './App.css'
import Recipe from './components/Recipe.js'
import Alert from './components/Alert.js'

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "7e7bedf7";
  const APP_KEY = "77029440900e27690cdcd24778df7b54";
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if(query !== ""){
      const result = await Axios.get(url);
      if(!result.data.more) {
        return setAlert("No recipes found");
      }
      setRecipes(result.data.hits);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please type a search term")
    }
  }

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Type Food Here"
        autoComplete="off" onChange={onChange}
        value={query}
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  )
}

export default App
