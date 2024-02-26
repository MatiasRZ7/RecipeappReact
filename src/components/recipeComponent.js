import React from 'react';
import styled, {keyframes, css} from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 300px;
gap: 10px;
box-shadow: 0px 3px 10px 0px #aaa;
`;

export const CoverImage = styled.img`
height: 200px;
object-fit: cover;
`;

export const RecipeName = styled.span`
font-size: 20px;
font-weight: bold;
color:  ;
margin: 10px 0px;
`;

const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const Ingredients = styled.span.attrs(({ isClicked }) => ({
  }))`
font-size: 18px;
border: 1px solid green;
color: black;
margin-bottom: 12px;
cursor: pointer;
padding: 10px 15px;
border-radius: 5px;
color: green;
text-align: center;
transition: color 0.3s ease-out;
&:hover {
color: black;}
animation: ${props => props.$isClicked ? css`${clickAnimation} 0.3s linear` : 'none'};
`

export const SeeMoreText = styled(Ingredients)`
color: #eb3300;
border: 1px solid #eb3300;
`;

const RecipeComponent = (props) => {
    const [isIngredientsClicked, setIsIngredientsClicked] = useState(false);
    const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
    const {recipeObj} = props;
    const [show, setShow] = React.useState(false);
    const handleIngredientsClick = () => {
      setIsIngredientsClicked(true);
      setTimeout(() => setIsIngredientsClicked(false), 300);
      setShow(true);
    };
  
    const dialogRef = useRef(null);
  
    useEffect(() => {
        const closeIngredients = (event) => {
          
          if (show && dialogRef.current && !dialogRef.current.contains(event.target)) {
            handleClose();
          }
        };
      
        document.addEventListener('click', closeIngredients);
      
        return () => {
          document.removeEventListener('click', closeIngredients);
        };
      }, [show]);
        const handleSeeMoreClick = () => {
      setIsSeeMoreClicked(true);
      setTimeout(() => setIsSeeMoreClicked(false), 300);
      window.open(recipeObj.url);

    };
        const handleClose = () => {
        setShow(false);
      };
        const handleDialogSeeMoreClick = () => {
        window.open(recipeObj.url);
        handleClose();
    };
    return (
        <>
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle id="alert-dialog-slide-title">Ingredients</DialogTitle>
            <DialogContent>
                <table>
                    <thead>
                    <tr>
                        <th>Ingredients</th>
                        <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                        {recipeObj.ingredients.map((ingredientsObj, index)=>
                        <tr key={index}>
                            <td>{ingredientsObj.text}</td>
                            <td>{ingredientsObj.weight}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
          <Ingredients onClick={handleDialogSeeMoreClick}>See More</Ingredients>
          <SeeMoreText onClick={handleClose}>Close</SeeMoreText>
        </DialogActions>
        </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image}/>
        <RecipeName>{recipeObj.label}</RecipeName>
        <Ingredients $isClicked={isIngredientsClicked} onClick={handleIngredientsClick}>Ingredients</Ingredients>
        <SeeMoreText $isClicked={isSeeMoreClicked} onClick={handleSeeMoreClick}>See complete recipe</SeeMoreText>
      </RecipeContainer>
      </>
    );
};

export default RecipeComponent;