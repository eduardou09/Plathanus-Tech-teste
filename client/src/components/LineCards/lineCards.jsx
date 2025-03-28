import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// init Swiper:
import Card from "../Card/card";

const LineCards = ({ news, title ,handleEdit }) => {
  return (
    <div className="overflow-x-hidden  m-2 mt-4">
      <div className="flex flex-col ml-5 mt-2 max-w-fit">
        <span className="text-xl text-black font-semibold ">
          {title}
        </span>
        <span className="h-1  bg-[#f90200] rounded-full"/>
      </div>

      <Swiper
        spaceBetween={30} // Espaçamento entre os slides
        slidesPerView={5} // Exibe 5 slides por vez
        loop={true}
        // navigation={true} // Navegação habilitada
        pagination={{ clickable: true }} // Paginação habilitada
        className="!overflow-visible"
        wrapperClass="gap-16 p-4"
      
       
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <Card item={item} handleEdit={handleEdit} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LineCards;
