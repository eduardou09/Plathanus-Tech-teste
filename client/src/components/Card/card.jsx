import useNewsStore from "../../store/newsStore";
import Button from "../Button/button";
import { FaTrashAlt } from "react-icons/fa";

const Card = ({ item, loadingNumber, handleSee }) => {
  const { deleteNews, setEditValues } = useNewsStore();
  return (
    <div className="flex flex-col bg-white p-4 gap-5 rounded-[20px] max-h-[230px] min-h-[280px] flex-1  max-md:w-full shadow-md hover:shadow-lg transition-shadow duration-300 ">
      <div className="flex flex-col gap-3 mt-4  justify-between flex-1 w">
        <h2 className="text-2xl font-bold text-black overflow-hidden flex-1 h-full jus line-clamp-2 mb-">
          {item.title}
        </h2>
        <div className="flex  flex-col gap-3 ">
          <p className="overflow-hidden flex-1 h-full jus line-clamp-3 text-[#646363]">
            {item.content}
          </p>
          <section className="flex justify-between">
            <h4 className="text-base text-[#AEADAD]">{item.author.name}</h4>{" "}
            <div onClick={()=> handleSee(item)} className="text-base text-[#AEADAD] underline hover:text-black cursor-pointer">
              Ver mais
            </div>
          </section>
        </div>
        <div className="flex w-full gap-1">
          <Button
            title={"Editar"}
            width={"w-2/3 "}
            className={"self-stretch"}
            onClick={() => setEditValues(item)}
          />
          <Button
            title={<FaTrashAlt />}
            width={"w-1/3"}
            className={"self-stretch bg-red-500 hover:bg-red-600 text-white "}
            onClick={() => deleteNews(item.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
