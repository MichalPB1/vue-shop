'use strict';

const categories = [
    { id: 1, name: 'Motors' },
    { id: 2, name: 'Health & Beauty'},
    { id: 3, name: 'Electronics'},
    { id: 4, name: 'Home & Garden'}
];

module.exports = {
    getCategories: function getCategories() {
        return categories;
    }
};
