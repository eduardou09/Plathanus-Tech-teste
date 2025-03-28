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
  const [seeMore, setSeeMore] = useState(false);
  const [newsSelected, setNewsSelected] = useState(null);
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
    console.log('--- Effect triggered ---');
    console.log('Current editValues:', editValues);
    
    if (editValues) {
      console.log('Preparing to reset form with values:', {
        title: editValues.title,
        content: editValues.content,
        author: editValues.author?.name || ""
      });
      
      const newValues = {
        title: editValues.title,
        content: editValues.content,
        author: editValues.author?.name || ""
      };
      
      reset(newValues);
      console.log('Form reset called with values');
      
      setCurrentId(editValues.id);
      console.log('Current ID set to:', editValues.id);
      
      setIsOpen(true);
      console.log('Modal opened');
    } else {
      console.log('Clearing form');
      reset();
      setCurrentId(null);
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

const handleSee = (item) =>{
  setSeeMore(true)
  setNewsSelected(item)
}

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
        seeMore={ seeMore} 
        setSeeMore={ setSeeMore}
        handleSee={handleSee}
        newsSelected={newsSelected}
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


  const searchTerm = filter.toLowerCase(); 
  console.log({ searchTerm });


  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.content.toLowerCase().includes(searchTerm) ||
    item.author?.name.toLowerCase().includes(searchTerm)
  );

  const sortedFilteredNews = filteredNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const last7News = sortedFilteredNews.slice(0, 7);

  const otherNews = sortedFilteredNews.slice(7);

  return { last7News, otherNews };
};

