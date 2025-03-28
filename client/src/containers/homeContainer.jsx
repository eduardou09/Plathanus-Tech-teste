import { useEffect, useState } from 'react';


import HomeMain from '../pages/Home';
import { newsService } from '../services/postNews';
import useNewsStore from '../store/newsStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsFormSchema } from '../validations/newSchema';



  export default function HomeContainer() {
    const [isOpen, setIsOpen] = useState(false);
    // const formMethods = useForm({
    //   resolver: zodResolver(newsFormSchema)
    // });
  

  const { createNews, news, loading, error , updateNewsStore, editValues, setEditValues } = useNewsStore();

   // Move o useForm para o container principal
   const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      content: '',
      author: editValues?.author?.name || '', 
    },
  });

 // Atualiza o formulário quando editValues muda
 useEffect(() => {
  if (editValues) {
    reset({title: editValues.title,
      content: editValues.content,
      author: editValues.author?.name || '', } );
    setIsOpen(true);
  }
}, [editValues, reset]);
  
  console.log({editValues})
  // Submit do formulário
  const onSubmit = async (data) => {
    console.log({data})
    try {

    if (data.name) {
      response = await updateNewsStore(data.id, data); 
      alert("Notícia atualizada com sucesso!");
    }  else {
      const response = await newsService(data);  
      alert("Notícia criada com sucesso!");
    }
   
      console.log("Resposta do backend:", response); 
      setIsOpen(false);
      // formMethods.reset();
  
      if (response.success) {
        alert("Notícia criada com sucesso!");
       
      }
    } catch (err) {
      console.error("Erro ao criar notícia:", err);
     
      alert("Erro ao criar notícia. Tente novamente.");
    }
  };


const handleEdit = (news) => {


}
 

  return (
   <HomeMain
   isOpen={isOpen}
   openModal={() => setIsOpen(true)}
   closeModal={() => setIsOpen(false)}
  // formMethods={formMethods}
   onSubmit={onSubmit}
   handleEdit={handleEdit}
   register={register}
   control={control}
   errors={errors}
   handleSubmit={handleSubmit}
    />
  );
}