const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/getInfoDocument/:filename", documentController.getInfoDocument);

module.exports = router;
