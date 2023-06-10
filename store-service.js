const fs = require("fs");
const fsPromises = require('fs').promises;

let items = [];
let categories = [];

function initialize() {
    var pr = new Promise(function (resolve, reject) {
        fs.promises.readFile('./data/items.json')
            .then(function (result) {
                items = JSON.parse(result);
                console.log("items read successfully");
                //console.log(items);
            })
            .catch(function (error) {
                console.log("Coulnt read items");
            })
            .finally(() => {
                fs.promises.readFile('./data/categories.json')
                    .then(function (result1) {
                        categories = JSON.parse(result1);
                        console.log("categories read successfully");
                        
                    })
                    .catch(function (err) {
                        console.log("Could not read categories");
                    })
                    .finally(()=>{
                        if (items.length == 0 || categories.length == 0) {
                            reject("Could not READ FILE");
                        }
                        else {
                            resolve("file read successfully");
                        }
                    });
        });
    });
    return pr;
}

function getAllItems() {
    let pr = new Promise((resolve, reject) => {
        if (items.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(items);
        }
    });
    return pr;
}

function getPublishedItems() {
    var pub = [];
    let pr = new Promise((resolve, reject) => {
        items.forEach(e => {
            if (e.published==true) {
                pub = pub.concat(e);
            }
        });
        //console.log(pub);
        if (pub.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(pub);
        }
    });
    return pr;
}

function getCategories() {
    let pr = new Promise((resolve, reject) => {
        if (categories.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(categories);
        }
    });
    return pr;
}

module.exports = { initialize, getAllItems, getPublishedItems, getCategories };