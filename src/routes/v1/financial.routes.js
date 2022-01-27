const express = require('express');
const financialRoutes = express.Router();
const financialController = require('../../controllers/financialController');
const multer = require('multer');
const upload = multer();


financialRoutes.get('/financial', financialController.index);
financialRoutes.get('/financial/:userId', financialController.indexOne);
financialRoutes.post('/financial/:userId', upload.single('file'), financialController.importTransactions);
financialRoutes.delete('/financial/:userId/:financialId', financialController.deleteFinancialdata);


module.exports = financialRoutes;