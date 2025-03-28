import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// init Swiper:
import Card from "../Card/card";

const LineCards = ({ news, title,   handleSee}) => {
  return (
    <div className="overflow-x-hidden    py-5">
      <div className="flex flex-col ml-5 mt-2 max-w-fit py-5">
        <span className="text-xl text-black font-semibold ">
          {title}
        </span>
        <span className="h-1  bg-[#f90200] rounded-full"/>
      </div>

      <Swiper
  spaceBetween={30}  /* Espaço menor no mobile */
  slidesPerView={1.1}  /* Mostra 10% do próximo card como hint */
  loop={true}
  className="!overflow-visible py-4" 
  wrapperClass=""  /* Padding lateral menor */
  breakpoints={{
    640: {
      slidesPerView: 2,
      spaceBetween: 8
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 12
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
      wrapperClass: "px-4 py-4" ,
      className: "!overflow-visible py-8"
    }
  }}
>
  {news.map((item) => (
    <SwiperSlide key={item.id} className="h-auto"> {/* Slide com altura automática */}
      <Card item={item}   handleSee={handleSee}/>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
};

export default LineCards;
