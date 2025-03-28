import { FaPlus } from "react-icons/fa";
import Modal from "../../components/Modal/modal";
import Input from "../../components/Input/input";
import LineCards from "../../components/LineCards/lineCards";
import useNewsStore from "../../store/newsStore";
import { useEffect } from "react";

export default function homeMain({isOpen, onSubmit, openModal, closeModal}) {
  const { news, fetchNews, handleEdit} = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

console.log({news})
    return (
        <div className="flex flex-col gap-10 w-full">
          {isOpen && <Modal onSubmit={onSubmit} closeModal={closeModal} />}
  
        {/* Botão que abre a modal */}
        <div className="flex gap-3 items-center w-full justify-end">
          <div
            className="bg-button rounded-[8px] flex items-center p-3 cursor-pointer"
          onClick={openModal}
          >
            <FaPlus className="text-lg" />
          </div>
          <Input />
        </div>
  
       
        <div className=""> 
  <div className="">
    <LineCards news={news} handleEdit={handleEdit}/>
    <LineCards news={news} />
  </div>
</div>
      </div>
    )
}

