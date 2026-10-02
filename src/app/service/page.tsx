"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import image1 from "../../../public/images/image1.jpg";
import image2 from "../../../public/images/image2.jpg";
import logo1 from "../../../public/images/cloudedu.png";
import logo2 from "../../../public/images/cmclogo.png";
import logo3 from "../../../public/images/snp.png";
import logo4 from "../../../public/images/zebec.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const WORDS = ["UI & UX", "Development", "Blockchain"];
const SLIDES = [...WORDS, ...WORDS];

export default function SpecialPage() {
  const images = [image1, image2, image1, image2];
  const logos = [logo1, logo2, logo3, logo4];

  return (
    <main className={jakarta.className}>
      {/* First row */}
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:h-[306px] my-12 lg:my-[137px] mx-6 md:mx-12 lg:mx-[112px]">
        <div className="flex flex-col justify-between gap-8">
          <div className="text-2xl md:text-4xl w-full lg:w-[625px]">
            Experience our expert solutions tailored to enhance your business
            with top-tier design, development, and animation.
          </div>
          <div className="bg-primary w-fit px-5 py-3 rounded-3xl">Services</div>
        </div>

        <Swiper
          modules={[Autoplay]}
          direction="vertical"
          slidesPerView={3}
          loop
          speed={600}
          allowTouchMove={false}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          className="!h-[210px] md:!h-[306px] w-full lg:!w-[625px] !mx-0 text-2xl md:text-4xl font-bold"
        >
          {SLIDES.map((word, i) => (
            <SwiperSlide key={i} className="!flex items-center">
              {word}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Second row */}
      <div className="flex flex-col overflow-x-auto gap-6 lg:gap-[59px] my-12 lg:my-[137px] ml-6 md:ml-12 lg:ml-[112px] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 lg:gap-[59px]">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Project image ${index + 1}`}
              width={1012}
              className="rounded-xl shrink-0 max-w-none h-auto w-[85vw] md:w-[640px] lg:w-[1012px]"
            />
          ))}
        </div>
        <div>
          <div className="bg-slate-400 w-[89vw] h-2 rounded-2xl"></div>
        </div>
      </div>

      {/* Third row */}
      <div className="min-h-[306px] mx-6 md:mx-12 lg:mx-[112px] flex flex-col items-center justify-end py-10 lg:p-20">
        <div className="w-fit text-xl md:text-2xl font-semibold mb-8">
          Our Partners
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 lg:gap-[162px]">
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Partner logo ${index + 1}`}
              width={143}
              className="rounded-xl h-auto w-24 md:w-[143px]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
