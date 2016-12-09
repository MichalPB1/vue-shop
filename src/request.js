import ajax from 'superagent';

const api = 'http://localhost:3000/api/';

export function getProducts() {
    return ajax.get(`${api}products`);
}

export function getProduct(id) {
    return ajax.get(`${api}product/${id}`);
}

export function addProduct(product) {
    console.log('req ', product);
    return ajax.post(`${api}addProduct`).send(product);
}

export function deleteProduct(id) {
    console.log('product delete', id);
    return ajax.post(`${api}removeProduct`).send({
      productId: id
    });
}

export function getCategories() {
    return ajax.get(`${api}categories`);
}

export function getCategoryProducts(category_id) {
    return ajax.get(`${api}products`);
}

export function getRelatedProducts(product_id) {
    return ajax.get(`${api}relatedProducts/${product_id}`);
}
