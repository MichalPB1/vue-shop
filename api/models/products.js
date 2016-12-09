'use strict';

let products;

const dataPath = '../data.json';
const fs = require('fs');
const path = require('path');

const savePath = path.join(__dirname, dataPath);

function getData() {
    products = JSON.parse(fs.readFileSync(savePath, 'utf8'));
    console.log('Data reloaded');
}

getData();

module.exports = {
    getProducts: function getProduct() {
        return products;
    },

    getProductById: function getProductById(id) {
        var productId = parseInt(id, 10);
        return products.filter(function (element) {
            return element.id === productId;
        })[0];
    },

    getRelatedProducts: function getRelatedProducts(limit, exclude) {
        var currentElement = 0;
        exclude = exclude ? parseInt(exclude, 10) : 0;


        return products.filter(function (element) {
            if (currentElement > limit) {
                return false;
            }

            currentElement++;

            if (element.id !== exclude) {
                return element;
            }
            return false;
        });
    },

    addProduct: function addProduct(productData) {
        return new Promise(function (resolve, reject) {
            const products = require('../data.json');
            const lastId = products.reduce(function (previous, current) {
                return Math.max(previous, current.id);
            }, 0);

            productData.id = (lastId + 1);
            productData.reviews = [];
            products.push(productData);

            fs.writeFile(savePath, JSON.stringify(products, null, 4), function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
                getData();
            });
        });
    },

    removeProduct: function removeProduct(productId) {
        return new Promise(function (resolve, reject) {
            let products = require('../data.json');

            products = products.filter((product) => parseInt(product.id) !== parseInt(productId));

            fs.writeFile(savePath, JSON.stringify(products, null, 4), function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
                getData();
            });
        });
    }
};
