const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/getDocuments', emailController.getDocuments);

module.exports = router;
