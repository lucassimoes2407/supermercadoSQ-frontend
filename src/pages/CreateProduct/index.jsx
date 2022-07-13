import react from 'react';
import { Box, Button, Input, TextField } from "@mui/material";
import "./index.css";
import UploadIcon from '@mui/icons-material/Upload';
import CheckIcon from '@mui/icons-material/Check';
import { postProduct } from '../../services/product'
import backend_connection from '../../config/api';

const CreateProduct = () => {

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            let product = data.get('product');
            let brand = data.get('brand');
            let ingredients = data.get('ingredients');
            let codUser = 1;

            // console.log(process.env);
            const { response } = await postProduct(product, brand, ingredients, codUser);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="createProduct__div">
            <h1 >Novo Produto</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1,
                        width: '95%',
                        flexDirection: 'column'
                    },
                }}
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <TextField id="product" label="Produto" variant="outlined" />
                <TextField id="brand" label="Marca" variant="outlined" />
                <TextField
                    id="ingredients"
                    label="Ingredientes"
                    multiline
                    minRows={3}
                    maxRows={6}
                // value={value}
                // onChange={handleChange}
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    <UploadIcon /> Enviar Foto
                    <input
                        accept="image/*"
                        type="file"
                        hidden
                    />

                </Button>

                <Button
                    variant="contained"
                    component="label"
                >
                    <CheckIcon /> Cadastrar
                    <input
                        type="submit"
                        hidden
                    />
                </Button>
            </Box>
        </div>

    )
}

export default CreateProduct;