const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = 8000;
app.use(morgan('short'));
require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
const routes = require('./server/routes/product.routes');
routes(app);

app.get('/', (req, resp) => {
    return resp.send("NodeJS server works!")
});

app.get('/api', (req, resp) => {
    return resp.send("Product Api: http://localhost:8000/api/products");
});

app.listen(port, 'localhost', () => console.log("Server listening on port " + port));
