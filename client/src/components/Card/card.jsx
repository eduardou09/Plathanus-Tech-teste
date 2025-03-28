import useNewsStore from "../../store/newsStore";
import Button from "../Button/button";
import { FaTrashAlt } from "react-icons/fa";


const Card = ({ item, loadingNumber, handleEdit }) => {

  const { deleteNews, setEditValues  } = useNewsStore();
  return (
    <div className="flex flex-col bg-white p-4 gap-5 rounded-[20px] max-h-[230px] min-h-[280px] flex-1 min-w-[380px] max-w-[400px] shadow-md hover:shadow-lg transition-shadow duration-300 ">

      <div className="flex flex-col gap-5 mt-4  max-h-[268px] justify-between flex-1 w">

      <h2 className="text-xl font-bold text-black overflow-hidden flex-1 h-full jus line-clamp-2 mb-">{item.title}</h2>
        <div className="flex justify-between flex-col">
        <p className="overflow-hidden flex-1 h-full jus line-clamp-2 ">{item.content}</p>
          <h4 className="text-base text-[#AEADAD]">{item.author.name}</h4>
          
        </div>
          <div className="flex w-full gap-1"> 
          <Button title={"Editar"} width={"w-2/3 "}  className={"h-full"} onClick={()=>setEditValues(item)}/>
          <Button title={<FaTrashAlt />} width={"w-1/3"} className={"h-full bg-red-500 hover:bg-red-600 text-white "} onClick={()=>deleteNews(item.id)}/>
          </div>
        
       
      </div>
    </div>
  );
};

export default Card;