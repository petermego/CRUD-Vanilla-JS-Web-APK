'use strict';
let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btnDelete = document.getElementById('deleteAll');

let dataProduct;
let mode = 'create';
let temp;
let searchMode = 'title';

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    category.value = '';
    count.value = '';
}

function showProducts() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateProductData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('delete-all');
    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
}

showProducts();

submit.onclick = function() {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != '' && price.value != '') {
        if (mode === 'create') {
        if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
            dataProduct.push(newProduct);
        }
        } else {
            dataProduct.push(newProduct);
        }
        } else {
            dataProduct[temp] = newProduct;
            mode = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }
    
    localStorage.setItem('product', JSON.stringify(dataProduct));
    clearData();
    showProducts();
}

function deleteProduct(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showProducts();
}

function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showProducts();
}

function updateProductData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

function getSearchMode(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMode = 'title';
    } else {
        searchMode = 'category';
    }
    search.placeholder = 'Search By ' + searchMode;
    search.focus();
    search.value = '';
    showProducts();
}

function searchData(value) {
    let table = '';
    if (searchMode == 'title') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                 table += `
            <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateProductData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                 table += `
            <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateProductData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}