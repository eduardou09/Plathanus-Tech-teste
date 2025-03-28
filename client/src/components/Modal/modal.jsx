import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdClose } from "react-icons/io";
import Input from "../Input/input";
import Select from "../Select/select";
// import { newsFormSchema } from "../../validations/newSchema";
import TextArea from "../TextArea/textArea";
import { newsFormSchema } from "../../validations/newSchema";

export default function Modal({ onSubmit, closeModal, register, control, errors, handleSubmit  }) {
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(newsFormSchema),
  // });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={closeModal}
      />

      <div className="relative z-50 bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-4 flex flex-col">
            <div className="flex w-full justify-between items-center">
              <h2 className="font-semibold text-2xl">Insira sua notícia</h2>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer"
              >
                <IoMdClose className="text-lg" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Input
                // defaultValue= {}
                {...register("title")}
                placeholder="Insira o título"
                width="w-full"
                label="Título"
                error={errors.title?.message}
              />

              {/* Campo Texto (TextArea) */}
              <TextArea
                {...register("content")}
                placeholder="Insira o texto completo..."
                label="Texto da Notícia"
                error={errors.content?.message}
                rows={5} // Define 5 linhas visíveis inicialmente
                className="min-h-[150px]" // Altura mínima garantida
              />

              <Input
                {...register("author")}
                placeholder="Insira nome do autor"
                width="w-full"
                label="Autor"
                error={errors.author?.message}
              />
{/* 
<Select
        control={control}
        name="category"
        label="Cidade"
        options={[
          { value: "1", label: "Florianópolis" },
          { value: "2", label: "Palhoça" },
        ]}
        error={errors.category?.message}
        rules={{ required: "Selecione uma cidade" }}
        watch={watch}
      /> */}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
