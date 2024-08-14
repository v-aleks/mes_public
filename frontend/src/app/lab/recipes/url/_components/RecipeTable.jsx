import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function RecipeTable({recipe}) {
    return (
        <>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="">Название:</Typography></TableCell>
                        <TableCell><Typography variant="">Фаза:</Typography></TableCell>
                        <TableCell><Typography variant="">Концентрация:</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {recipe ? (recipe.map((recipe) => (
                    <TableRow key={recipe.component}>
                        <TableCell>{recipe.component}</TableCell>
                        <TableCell>{recipe.phase}</TableCell>
                        <TableCell>{recipe.concentration}</TableCell>
                    </TableRow>
                ))) : (
                    <TableRow>
                        <TableCell sx={{textAlign: 'center'}} colSpan={3}><LinearProgress color='warning'/></TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </>
    );
}