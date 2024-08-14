import { Typography } from '@mui/material';

export default function RecipeDescription({recipeDescription}) {
    return (
        <>
            {recipeDescription ? (recipeDescription.map((recipe) => (
                <Typography sx={{py:1}} variant="body2">{recipe.description}</Typography>
            ))) : (
                <Typography sx={{textAlign: 'center'}} variant="body2">Загрузка...</Typography>
            )}
        </>
    );
}