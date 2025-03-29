
const pool = require('../config/db');
const prisma = require('../lib/prisma');


const getNews = async (req, res) => {
  try {
   
    const newsWithAuthors = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',  // Ordena pela data de criação, do mais recente para o mais antigo
      },
      include: {
        author: true,  // Inclui os dados do autor nas notícias
      },
    });

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

   
    res.json(formattedNews);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};


  
// Criar nova notícia
const createNews = async (req, res) => {
  const { title, content, author } = req.body;


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
        authorId: authorData.id, 
      },
      include: { author: true }, // Incluir os dados do autor na resposta
    });

  
    res.status(201).json(news);
  } catch (error) {
    
    res.status(500).json({
      error: "Erro interno",
      details: error.message,
    });
  }
};


const deleteNews = async (req, res) => {
  const { id } = req.params;


  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
   
    const newsExists = await prisma.news.findUnique({
      where: { id: Number(id) }
    });

    if (!newsExists) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

  
    await prisma.news.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();

  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    

    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    res.status(500).json({ 
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;


  if (!title || !content || !author) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {

    const existingNews = await prisma.news.findUnique({
      where: { id: Number(id) },
    });

    if (!existingNews) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    const authorData = await prisma.author.upsert({
      where: { name: author },
      update: {},
      create: { name: author },
    });


    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        authorId: authorData.id, 
      },
      include: {
        author: true, 
      },
    });

    
    const formattedResponse = {
      id: updatedNews.id,
      title: updatedNews.title,
      content: updatedNews.content,
      createdAt: updatedNews.createdAt,
      author: {
        id: updatedNews.author.id,
        name: updatedNews.author.name,
      },
    };

    res.json(formattedResponse);

  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    

    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    res.status(500).json({ 
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { getNews, createNews, deleteNews, updateNews };

module.exports = { getNews, createNews, deleteNews, updateNews };