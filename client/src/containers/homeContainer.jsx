import { useEffect, useState } from "react";
import HomeMain from "../pages/Home";
import useNewsStore from "../store/newsStore";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsFormSchema } from "../validations/newSchema";
import { alertError, alertSuccess } from "../components/Alert/alert";
import { Toaster } from "react-hot-toast";

export default function HomeContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const formMethods = useForm({
  //   resolver: zodResolver(newsFormSchema)
  // });

  const {
    loading,
    error,
    updateNewsStore,
    editValues,
    setEditValues,
    createNewsStore,
    news, fetchNews 
  } = useNewsStore();

  // Move o useForm para o container principal
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      content: "",
      author: editValues?.author?.name || "",
      id: editValues?.id,
    },
  });



  // Atualiza o formulário quando editValues muda
  useEffect(() => {
    if (editValues) {
      reset({
        title: editValues.title,
        content: editValues.content,
        author: editValues.author?.name || "",
      });
      setCurrentId(editValues.id); // Armazena o ID separadamente
      setIsOpen(true);
    } else {
      reset(); // Limpa o formulário
      setCurrentId(null); // Reseta o ID
    }
  }, [editValues, reset]);

  const onSubmit = async (data) => {
    console.log({ data }, "submit");
    try {
      let response;
  
      if (currentId) {
        console.log("Modo edição");
        response = await updateNewsStore(currentId, data);
      } else {
        console.log("Modo criação");
        response = await createNewsStore(data);
  
        if (response && !response.success && !response.error) {
          response = { success: true, data: response };
        }
      }
  
      if (!response?.success) {
        throw new Error(response?.error || "Operação falhou sem mensagem de erro");
      }
  
      alertSuccess(
        currentId ? "Notícia atualizada com sucesso!" : "Notícia criada com sucesso!"
      );
  
      setIsOpen(false);
      reset();
      setCurrentId(null);
  
    } catch (err) {
      console.error("Erro completo:", {
        message: err.message,
        stack: err.stack,
        response: err.response?.data,
      });
  
      const errorMessage = err.response?.data?.message ||
                         err.message ||
                         "Erro ao processar a solicitação. Por favor, tente novamente.";
  
      // Se tiver um componente alertError também
      alertError({ 
        title: "Erro",
        message: errorMessage,
        type: "error"
      });
      
      // Ou se usar o mesmo componente para ambos:
      // alertSuccess({
      //   title: "Erro",
      //   message: errorMessage,
      //   type: "error"
      // });
    }
  };



  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {" "}
      <Toaster position="top-center" reverseOrder={false} />
      <HomeMain
        isOpen={isOpen}
        openModal={() => setIsOpen(true)}
        closeModal={() => setIsOpen(false)}
        // formMethods={formMethods}
        onSubmit={onSubmit}
        register={register}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
      searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        news={filteredData(news, searchTerm )}
      />
    </>
  );
}

const filteredData = (news, filter) => {
  console.log({ filter }); // Ver o que realmente está sendo passado

  // Se não houver filtro, ordena e separa as notícias
  if (!filter) {
    console.log("Nenhum filtro aplicado");

    // Ordenando as notícias pela data (do mais recente para o mais antigo)
    const sortedNews = [...news].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pegando as últimas 7 notícias
    const last7News = sortedNews.slice(0, 7);  // As 7 mais recentes

    // Pegando as demais notícias
    const otherNews = sortedNews.slice(7);  // As outras notícias

    return { last7News, otherNews };
  }

  // Caso haja filtro, converte o filtro para minúsculas
  const searchTerm = filter.toLowerCase(); // Acessando corretamente o valor do filtro
  console.log({ searchTerm });

  // Filtrando as notícias com base no filtro
  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.content.toLowerCase().includes(searchTerm) ||
    item.author?.name.toLowerCase().includes(searchTerm)
  );

  // Ordenando as notícias filtradas pela data (do mais recente para o mais antigo)
  const sortedFilteredNews = filteredNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pegando as últimas 7 notícias filtradas
  const last7News = sortedFilteredNews.slice(0, 7);

  // Pegando as outras notícias filtradas
  const otherNews = sortedFilteredNews.slice(7);

  return { last7News, otherNews };
};

