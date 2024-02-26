import styled from "styled-components";
import { Header, AppNameComponent, AppIcon, SearchComponent,
SearchInput, SearchIcon } from "./components/headerComponent";
import { RecipeListContainer } from "./components/recipeComponent";
import RecipeComponent from "./components/recipeComponent";
import { useState } from "react";
import Axios from "axios";
const Container = styled.div`
display: flex;
flex-direction: column;

`;
const Placeholder = styled.img`
width: 120px;
height: 120px;
margin-top: 200px;
opacity: 50%;
filter: grayscale(100%);
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 100%;
    filter: grayscale(0%);
  }
`;
const APP_ID = '13d16661';
const APP_KEY = '7ba510b7025015cf42681f7614d2ebc3';

function App() {
  const [timeoutId, setTimeOutId] = useState();
  const [recipeList, setRecipeList] = useState([]);

  const fetchRecipe = async(searchString) => {
    const response = await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipeList(response.data.hits);  
  };

  const onTextChange = (event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const timeout = setTimeout(() => {
      fetchRecipe(event.target.value)
    }, 500);

    setTimeOutId(timeout);
  }

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="hamburger.svg"/>
          Recipe Finder
        </AppNameComponent>
      <SearchComponent>
        <SearchIcon src="/search-icon.svg" alt="Icon"/>
        <SearchInput placeholder="Search recipe" onChange={onTextChange}/>
      </SearchComponent>
      </Header>
      <RecipeListContainer>
        {recipeList.length ? recipeList.map((recipeObj, index) => (
          <RecipeComponent key={index} recipeObj={recipeObj.recipe}/>
        )) : (
          <Placeholder src="hamburger.svg" />
        )}
      
      </RecipeListContainer>
    </Container>
  );
}
export default App;
