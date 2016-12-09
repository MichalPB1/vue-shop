'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();

// Request body validation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files served from /dist directory
app.use(express.static(__dirname + '/static'));

// CORS for API requests
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// API Routing
router.get('/products', (request, response) => {
    const ProductsModel = require('./models/products');
    let products = ProductsModel.getProducts();

    if (request.query.priceFrom) {
        products = products.filter(function (element) {
            return element.price >= parseInt(request.query.priceFrom, 10);
        });
    }

    if (request.query.priceTo) {
        products = products.filter(function (element) {
            return element.price <= parseInt(request.query.priceTo, 10);
        });
    }

    if (request.query.categories) {
        var filteredCategories = request.query.categories.map(Number);

        products = products.filter(function (element) {
            return filteredCategories.indexOf(+element.category) >= 0;
        });
    }

    if (request.query.search) {
        products = products.filter(function (element) {
            return ~element.title.toLowerCase().indexOf(request.query.search.toLowerCase());
        });
    }

    response.json(products);
});

router.get('/product/:productId', (request, response) => {
    const ProductsModel = require('./models/products');
    const product = ProductsModel.getProductById(request.params.productId);

    response.json(product);
});

router.get('/relatedProducts/:productId', (request, response) => {
    const ProductsModel = require('./models/products');
    const limit = 5;
    const excludeProduct = request.params.productId;

    response.json(ProductsModel.getRelatedProducts(5, excludeProduct));
});

router.get('/categories', (request, response) => {
    const CategoriesModel = require('./models/categories');
    const categories = CategoriesModel.getCategories();

    response.json(categories);
});

// add product apis
router.post('/addProduct', (request, response) => {
    console.log(request.body);
    const ProductsModel = require('./models/products');

    const data = {
        title: String(request.body.title),
        shortDescription: String(request.body.shortDescription),
        fullDescription: String(request.body.fullDescription),
        price: parseFloat(request.body.price),
        category: parseInt(request.body.category),
        image: String(request.body.image),
    };

    ProductsModel.addProduct(data)
        .then(() => {
            response.json({ success: true, message: 'Product has been added' });
        })
        .catch((error) => {
            response.json({ success: false, message: 'Product not saved', error: error });
        });
});

router.post('/removeProduct', (request, response) => {
    const ProductsModel = require('./models/products');

    ProductsModel.removeProduct(request.body.productId)
        .then(() => {
            response.json({ success: true, message: 'Product has been removed' });
            console.log('Product has been removed', request.body.productId);
        })
        .catch((error) => {
            response.json({ success: false, message: 'Cannot remove product' });
            console.log('Cannot remove product', request.body.productId);
        });
});

app.use('/api', router);

app.listen(3000, () => {
    console.log('Api started on port 3000');
});
