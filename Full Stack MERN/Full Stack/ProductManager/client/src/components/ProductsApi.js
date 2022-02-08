import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/products';

const getAll = async () => {
    let products;
    await axios.get(baseUrl)
        .then(response => products = response.data)
        .catch(error => error);
    return products;
}

const get = async (id) => {
    let product;
    await axios.get(baseUrl + "/" + id)
        .then(response => product = response.data)
        .catch(error => error);
    return product;
}

const create = async (newProduct) => {
    let result;
    await axios.post(baseUrl, newProduct)
        .then(response => result = response.data)
        .catch(error => error);
    return result;
}

const update = async (updatedProduct, id) => {
    let result;
    await axios.put(baseUrl + "/" + id, updatedProduct)
        .then(response => result = response.data)
        .catch(error => error);
    return result;
}

const drop = async (id) => {
    let result;    
    await axios.delete(baseUrl + "/" + id)
        .then(response => result = response.data)
        .catch(error => error);
    return result;
}

export default {getAll, get, create, update, drop}