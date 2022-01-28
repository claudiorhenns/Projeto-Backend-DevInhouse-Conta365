const express = require('express');
const useRoutes = express.Router();
const userController = require('../../controllers/userController');


useRoutes.get('/users', userController.index);
useRoutes.get('/user/:id', userController.indexOne);
useRoutes.post('/userCreate', userController.create);
useRoutes.patch('/userUpdate/:id', userController.updateOne);
useRoutes.delete('/userDelete/:id', userController.deleteOne);


module.exports =  useRoutes;