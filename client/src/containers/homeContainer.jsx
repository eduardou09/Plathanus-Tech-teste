import { useState } from 'react';

// import useNewsStore from '../stores/newsStore';
import HomeMain from '../pages/Home';
import { newsService } from '../services/newsServices';



  export default function HomeContainer() {
    const [isOpen, setIsOpen] = useState(false);
    // const formMethods = useForm({
    //   resolver: zodResolver(newsFormSchema)
    // });
  
  // Store (Zustand)
//   const { createNews, news, loading, error } = useNewsStore();

  // Submit do formulário
  const onSubmit = async (data) => {
    console.log({data})
    try {
      const response = await newsService(data); 
      console.log("Resposta do backend:", response); 
      

      setIsOpen(false);
      formMethods.reset();
  
     
      if (response.success) {
        alert("Notícia criada com sucesso!");
       
      }
    } catch (err) {
      console.error("Erro ao criar notícia:", err);
     
      alert("Erro ao criar notícia. Tente novamente.");
    }
  };

  console.log(isOpen)
  const eduardo = "aa"

  return (
   <HomeMain
   isOpen={isOpen}
   openModal={() => setIsOpen(true)}
   closeModal={() => setIsOpen(false)}
  // formMethods={formMethods}
   onSubmit={onSubmit}
    />
  );
}