// ------------------- Import's -------------------
const express = require('express');
const mainController = require('../controllers/main.controller');

// **** Router ****
const router = express.Router();

// **** Routes ****
router.route("/")
    .get(mainController.index) ;        // fetch all notes (READ)

router.route("/about")
    .get(mainController.about);

router.route("/:id")
    .get(mainController.detail);

// router.route('/cart/add')
//     .post(mainController.addCart);

// router.route('/cart/update')
//     .post(mainController.updateCart);

// router.route('/cart/add')
//     .post(mainController.removeCart);

// ------------------- Exports -------------------
module.exports = router;
