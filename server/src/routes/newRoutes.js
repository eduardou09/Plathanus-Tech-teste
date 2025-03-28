// src/routes/newsRoutes.js
const express = require('express');
const { getNews, createNews, deleteNews, updateNews } = require('../controllers/newsController');

const router = express.Router();

router.get('/', getNews);
router.post('/', createNews);
router.delete('/:id', deleteNews)
router.put('/:id', updateNews)

module.exports = router;