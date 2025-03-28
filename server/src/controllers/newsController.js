// src/controllers/newsController.js
const pool = require('../config/db');
const prisma = require('../lib/prisma');


// buscar noticas
const getNews = async (req, res) => {
  try {
    // Usando Prisma para buscar as notícias com os autores
    const newsWithAuthors = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',  // Ordena pela data de criação
      },
      include: {
        author: true,  // Inclui os dados do autor nas notícias
      },
    });

    // Formatação dos dados para a estrutura esperada
    const formattedNews = newsWithAuthors.map(news => ({
      id: news.id,
      title: news.title,
      content: news.content,
      createdAt: news.createdAt,
      author: {
        id: news.author.id,
        name: news.author.name,
      },
    }));

    // Envia a resposta com as notícias e seus autores
    res.json(formattedNews);
  } catch (err) {
    // Retorna erro caso algo falhe
    res.status(500).json({ error: err.message });
  }
};

  
// Criar nova notícia
// src/controllers/newsController.js
const createNews = async (req, res) => {
  const { title, content, author } = req.body;

  // Verificar se os dados necessários foram passados
  if (!title || !content || !author) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    // Primeiro, verifica ou cria o autor
    const authorData = await prisma.author.upsert({
      where: { name: author },
      update: {}, // Se o autor já existe, não faz nada
      create: { name: author }, // Se o autor não existe, cria
    });

    // Agora, cria a notícia, utilizando o id do autor retornado
    const news = await prisma.news.create({
      data: {
        title,
        content,
        authorId: authorData.id, // Usar o id do autor retornado do upsert
      },
      include: { author: true }, // Incluir os dados do autor na resposta, se necessário
    });

    // Retorna a notícia criada
    res.status(201).json(news);
  } catch (error) {
    // Retorna um erro em caso de falha
    res.status(500).json({
      error: "Erro interno",
      details: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params; // ID da notícia a ser excluída
  console.log('deleteNews', id);
  // Validação básica do ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // Verifica se a notícia existe
    const newsExists = await prisma.news.findUnique({
      where: { id: Number(id) }
    });

    if (!newsExists) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    // Exclui a notícia
    await prisma.news.delete({
      where: { id: Number(id) }
    });

    res.status(204).send(); // Resposta sem conteúdo para sucesso

  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    
    // Tratamento específico para erros do Prisma
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    res.status(500).json({ 
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { getNews, createNews, deleteNews };