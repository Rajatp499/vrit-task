// app/.../page.tsx
"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import frame1 from "../../../public/images/Frame.svg";
import frame2 from "../../../public/images/frame2.svg";
import frame3 from "../../../public/images/frame3.svg";
import frame4 from "../../../public/images/frame4.svg";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useState } from "react";
import {
  easeIn,
  easeInOut,
  easeOut,
  motion,
  useAnimationControls,
} from "framer-motion";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cardDetails = [
  {
    id: 1,
    count: "05",
    titleLines: ["All", "Courses"],
    description: ["courses you're powering", "through right now."],
  },
  {
    id: 2,
    count: "05",
    titleLines: ["Ongoing", "Courses"],
    description: ["exciting new courses", "waiting to boost your skills."],
  },
  {
    id: 3,
    count: "10",
    titleLines: ["Upcoming", "Courses"],
    description: ["currently happening—don’t", "miss out on the action!"],
  },
];
const frames = [frame1, frame2, frame3, frame4];
const Page = () => {
  const controlsOuter = useAnimationControls();
  const controlsText = useAnimationControls();

  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [disableCliks, setDisableClicks] = useState<boolean>(false);

  //animation
  const handleAnimation = (id: number) => {
    setDisableClicks(true);
    controlsText.start({
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
      transition: { duration: 0.5 },
    });
    controlsOuter
      .start({
        width: "300px",
        transition: { duration: 1, ease: easeOut },
      })
      .then(() => {
        setSelectedCard(id);
      })
      .finally(() => {
        setDisableClicks(false);
      });
  };

  return (
    <div
      className={`${jakarta.className} m-6 md:m-12 2xl:m-[100px] flex flex-col gap-10 md:gap-16`}
    >
      <div>
        <div className="mb-4 text-lg md:text-xl">
          Explore our classes and master trending skills!
        </div>
        <div className="text-2xl font-bold md:text-3xl">
          Dive Into{" "}
          <span className="text-[#1DA077]">What’s Hot Right Now!</span> 🔥
        </div>
      </div>
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* stat cards */}
        <div className="  flex justify-between md:gap-14 gap-4 flex-wrap ">
          {cardDetails.map((n, index) => {
            if (selectedCard === n.id)
              return (
                <motion.div
                  animate={controlsOuter}
                  key={n.id}
                  className="flex w-full flex-col gap-6 rounded-3xl bg-[#C33241] p-6 sm:p-10 md:gap-10 xl:h-[461px] xl:w-[592px] xl:shrink-0 xl:p-14"
                >
                  <div className="flex items-center justify-end gap-2 text-base text-white transition-all duration-300 ease-in-out hover:gap-4">
                    <span>View all courses</span>
                    <FaArrowRightLong />
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {frames.map((f, index) => (
                      <Image
                        key={index}
                        src={f}
                        width={100}
                        alt={`Course preview ${index + 1}`}
                        className="h-auto w-full"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                    <div className="text-7xl font-bold text-white sm:text-8xl xl:text-9xl">
                      {n.count}
                      <sup>+</sup>
                    </div>
                    <motion.div animate={controlsText}>
                      <div className="mb-2 text-2xl font-semibold text-white md:mb-4 md:text-4xl">
                        {n.titleLines[0]}&ensp;{n.titleLines[1]}
                      </div>
                      <div className="text-base text-white">
                        {n.description[0]}&apos;{n.description[1]}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            return (
              <motion.div
                // on ={disableCliks}
                className="group relative disabled:cursor-not-allowed "
                key={n.id}
                onClick={() => !disableCliks && handleAnimation(n.id)}
              >
                <div className="absolute opacity-0 transition-all group-hover:opacity-100 top-[-40] left-20">
                  Click here <FaArrowTurnDown />
                </div>
                <div
                  className={`flex aspect-[350/575] w-full max-w-[300px]  h-[461px] flex-col justify-between  gap-8 rounded-[40px] bg-[#FBEAEA] p-6 text-[#C23544]`}
                >
                  <div className="flex flex-1 items-end justify-start gap-3 pl-8">
                    <h3 className="rotate-180 text-3xl font-bold leading-tight [writing-mode:vertical-rl] sm:text-4xl">
                      {n.titleLines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="rotate-180 text-md font-light leading-snug [writing-mode:vertical-rl] sm:text-base">
                      {n.description.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[150px] font-extrabold leading-[0.85] tracking-tighter sm:text-[180px]">
                      {n.count}
                    </span>
                    <span className="-ml-2 text-6xl font-extrabold leading-none sm:text-7xl">
                      +
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;

// interface StatCardProps {
//   id: number;
//   count: string;
//   titleLines: string[];
//   description: string[];
//   className?: string;
// }

// function StatCard({
//   id,
//   count,
//   titleLines,
//   description,
//   className = "",
// }: StatCardProps) {
//   return (
// <div
//   className={`flex aspect-[350/575] w-full max-w-[300px]  h-[461px] flex-col justify-between  gap-8 rounded-[40px] bg-[#FBEAEA] p-6 text-[#C23544] ${className}`}
// >
//   <div className="flex flex-1 items-end justify-start gap-3 pl-8">
//     <h3 className="rotate-180 text-3xl font-bold leading-tight [writing-mode:vertical-rl] sm:text-4xl">
//       {titleLines.map((line, i) => (
//         <span key={i} className="block">
//           {line}
//         </span>
//       ))}
//     </h3>
//     <p className="rotate-180 text-md font-light leading-snug [writing-mode:vertical-rl] sm:text-base">
//       {description.map((line, i) => (
//         <span key={i} className="block">
//           {line}
//         </span>
//       ))}
//     </p>
//   </div>
//   <div className="flex items-start">
//     <span className="text-[150px] font-extrabold leading-[0.85] tracking-tighter sm:text-[180px]">
//       {String(count).padStart(2, "0")}
//     </span>
//     <span className="-ml-2 text-6xl font-extrabold leading-none sm:text-7xl">
//       +
//     </span>
//   </div>
// </div>
//   );
// }

// function SelectedStatsCard({
//   id,
//   count,
//   titleLines,
//   description,
//   className = "",
// }: StatCardProps) {
//   return (
// <div className="flex w-full flex-col gap-6 rounded-3xl bg-[#C33241] p-6 sm:p-10 md:gap-10 xl:h-[461px] xl:w-[592px] xl:shrink-0 xl:p-14">
//   <div className="flex items-center justify-end gap-2 text-base text-white transition-all duration-300 ease-in-out hover:gap-4">
//     <span>View all courses</span>
//     <FaArrowRightLong />
//   </div>

//   <div className="grid grid-cols-4 gap-2 sm:gap-3">
//     {frames.map((f, index) => (
//       <Image
//         key={index}
//         src={f}
//         width={100}
//         alt={`Course preview ${index + 1}`}
//         className="h-auto w-full"
//       />
//     ))}
//   </div>

//   <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
//     <div className="text-7xl font-bold text-white sm:text-8xl xl:text-9xl">
//       {count}
//       <sup>+</sup>
//     </div>
//     <div>
//       <div className="mb-2 text-2xl font-semibold text-white md:mb-4 md:text-4xl">
//         {titleLines[0]}&ensp;{titleLines[1]}
//       </div>
//       <div className="text-base text-white">
//         {description[0]}&apos;{description[1]}
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }
