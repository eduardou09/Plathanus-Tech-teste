// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});