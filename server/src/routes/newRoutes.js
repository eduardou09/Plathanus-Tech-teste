// src/routes/newsRoutes.js
const express = require('express');
const { getNews, createNews, deleteNews } = require('../controllers/newsController');

const router = express.Router();

router.get('/', getNews);
router.post('/', createNews);
router.delete('/:id', deleteNews)

module.exports = router;