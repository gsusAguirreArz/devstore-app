// ------------------- Imports -------------------
// import db ORM
const Response = require('../util/domain/response');
const httpStatus = require('../util/domain/httpStatus');
const logger = require('../util/logger/logger');
const Products = require("../models/product.model");
// const db = require('../database/models/index');
// const Notes = db.Note;


// ------------------- Controller CODE -------------------
const controller = {
    // '/' - Root show Home page
    index: (req, res) => {
        const products = Products.findall();
        logger.info(`${req.method} ${req.originalUrl}, fetching home page`);
        // logger.error(e.message);
        return res
                    .status(httpStatus.OK.code)
                    .render('main/index', {products: products, cart: req.session.cart});
    },
    about: (req, res) => {
        logger.info(`${req.method} ${req.originalUrl}, fetching home page`);
        // logger.error(e.message);
        return res.render('main/about');
    },
    detail: (req, res) => {
        const ID = req.params.id;
        logger.info(`${req.method} ${req.originalUrl}, fetching product with id: ${ID}`);
        const product = Products.find(ID);
        if (!product)
            return res
                        .status(httpStatus.NOT_FOUND.code)
                        .send(
                            new Response(
                                httpStatus.NOT_FOUND.code,
                                httpStatus.NOT_FOUND.status,
                                "Product not found"
                            )
                        );
        else
            return res
                        .status(httpStatus.OK.code)
                        .render('products/product', {product: product});
    },
    addCart: (req,res) => {
        const ID = req.body.id;
        const product = Products.find(ID);
        const cart = req.session.cart

        const prodincart = cart.find(prod => product.id == prod.id);
        if ( prodincart )
            req.session.cart = req.session.cart.map( prod => {
                if ( prod.id == product.id )
                    prod.quantity += 1;
                return prod;
            });
        else
            req.session.cart.push({...product, quantity: 1});
        return res.redirect('/');

    },
    updateCart: (req, res) => {
        if ( parseInt(req.body.quantity) <= 0 )
            req.session.cart = req.session.cart.filter( prod => prod.id != req.body.id );
        else
            req.session.cart = req.session.cart.map( prod => {
                if ( prod.id == req.body.id )
                    prod.quantity = parseInt(req.body.quantity);
                return prod;
            });
        return res.redirect('/');
    },
    removeCart: (req, res) => {
        req.session.cart = req.session.cart.filter( prod => prod.id != req.body.id );
        return res.redirect('/');
    }
};

// ------------------- Exports -------------------
module.exports = controller;
