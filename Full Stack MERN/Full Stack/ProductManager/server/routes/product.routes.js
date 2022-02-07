const ProductController = require('../controllers/Product.controller');

module.exports = (app) => {
    app.get('/api/products', ProductController.getAll);
    app.get('/api/products/:id', ProductController.getProduct);
    app.post('/api/products', ProductController.createProduct);
    app.put('/api/products/:id', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
}