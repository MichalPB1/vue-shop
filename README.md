# vue-training-basics

> Vue training - basics for companies

## Build Setup

``` bash
# install dependencies
npm install

npm run dev

# for API run
node api/api.js

# and access as http://localhost:3000/api/{API_RESOURCE}
```

## Assignment

Your task is to create a simple CRUD shop using the provided API.

Try to use `vue-router` and state management with `vuex` to create those pages.
By keeping clean and decoupled structure you would get better rating.

1. Homepage with products `/`

    - List of products
        - Auto-refresh of products (optional)
    - Filters for products:
        - search by title (dynamic)
        - by price range (dynamic)
        - by category (dynamic, optional)
- Product details page `/product/<ID>`
    - related products (optional)
    - reviews (optional)
- Product management page `/manage`
    - add product
    - remove product


Consider using / implementing (optional):

- Separated mutation types
- Separate Vuex Store for management and viewing actions
- If you cannot deal with `vue-router` try to create separate files for each route, for example: `index.html, product.html and manage.html` and use hash for productID (e.g. `product.html#8`)
- Add nice loader when data is loading
- Live update product list each 30 seconds (you may need to change API a bit...)
- Use minimal styles from `static/base.css` or use anything to style-up the app a bit, its your choice :)

## Available API resources:


`GET /api/products` Returns an array of all available products

Query string params:
- `priceFrom=X` returns only products above this price
- `priceTo=X` returns only products below this price
- `categories=[1, 2, 3]` returns only products within those categories
- `search=iPhone` returns only products matching title

--

`GET /api/product/:productId` Returns one `:productId` product data

--

`GET /api/relatedProducts/:productId` Returns related products for `:productId` product
Limit is set to 5 by default

--

`GET /api/categories` Returns all categories

--

`POST /api/addProduct` Add a new product

Request body data to be send within post request:

```
{
    title: String,
    shortDescription: String,
    fullDescription: String,
    price: Number,
    category: Number,
    image: String,
}
```

Json Response:

```
{
    "success": Boolean,
    "message": String,
    "error": Object
}
```

--

`POST /api/removeProduct` Remove existing product

Product id must be send in body:

```
productId=2
```

curl example:

```
curl -XPOST http://localhost:3000/api/removeProduct --data productId=1
```
