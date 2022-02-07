import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/products';

const create = async (newProduct) => {
    let createdProduct;
    await axios.post(baseUrl, newProduct)
        .then(response => createdProduct = response.data)
        .catch(error => error);
    //console.log(createdProduct);
    return createdProduct;
}

export default {create}