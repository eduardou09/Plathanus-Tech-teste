import { FaPlus } from "react-icons/fa";
import Modal from "../../components/Modal/modal";
import Input from "../../components/Input/input";
import LineCards from "../../components/LineCards/lineCards";
import useNewsStore from "../../store/newsStore";
import { useEffect } from "react";
import Read from "../../components/Read/read";

export default function homeMain({
  isOpen,
  onSubmit,
  openModal,
  closeModal,
  register,
  control,
  errors,
  handleSubmit,
  searchTerm,
  setSearchTerm,
  news,
  seeMore, 
  setSeeMore,
  handleSee,
  newsSelected
}) {
  console.log({seeMore})
  console.log({ news });
  return (
    <main className="flex flex-col gap-2 w-full">
   
      {seeMore &&(
        <Read
        closeModal={() => setSeeMore(false)}
        newsSelected={newsSelected}
        />
      )}
      {isOpen && (
        <Modal
          onSubmit={onSubmit}
          closeModal={closeModal}
          register={register}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      )}
    
      <section className="flex gap-3 items-center w-full justify-between flex-wrap">
        <h1 className="text-black font-semibold text-2xl">Plathanus News</h1>

        <div className="flex gap-3 items-center">
          <div
            className="bg-button rounded-[8px] flex items-center p-3 cursor-pointer"
            onClick={openModal}
          >
            <FaPlus className="text-lg" />
          </div>
          <Input
            placeholder="Buscar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>
      <section className="">
        {news.last7News.length > 0 && (
          <LineCards news={news.last7News} title={"Últimas Notícias"}    handleSee={ handleSee}/>
        )}
        {news.otherNews.length > 0 && (
          <LineCards news={news.otherNews} title={"Notícias Anteriores "}   handleSee={ handleSee} />
        )}
      </section>
    </main>
  );
}
