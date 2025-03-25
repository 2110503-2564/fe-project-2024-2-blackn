"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import getMe from "@/libs/(auth)/getMe";

interface DentistCardProps {
  name: string;
  expertise: string;
  experience: number;
  imageUrl?: string;
}

export const DentistCard: React.FC<DentistCardProps> = ({
  name,
  expertise,
  experience,
  imageUrl = "/placeholder-dentist.png",
}) => {
  const router = useRouter();
  const token = Cookies.get("token");
  // const userCheck = async () => {
  //   try {
  //     await getMe(token as string);
  //   } catch (err) {
  //     // Cookies.remove("token");
  //   }
  // };
  // userCheck();
  return (
    <div className="relative p-6 bg-sky-200 rounded-3xl w-[360px] max-w-full mx-auto flex flex-col items-center shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
    <div className="text-2xl font-semibold text-center">{name}</div>
  
    <div className="w-[90%] h-1 bg-green-100 rounded-full my-4" />
  
    <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden bg-white">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 180px"
      />
      <div className="mt-5 text-3xl max-sm:text-2xl">{expertise}</div>
      <div className="mt-5 text-3xl max-sm:text-2xl">
        {experience} Years of Experience
      </div>
      <button
        onClick={() => {
          token
            ? router.push("/booking?dentist=" + name)
            : router.push("/login");
        }}
        className="absolute right-8 bottom-8 text-3xl bg-white border-black rounded-3xl h-[85px] w-[146px] max-md:relative max-md:right-auto max-md:bottom-auto max-md:mx-auto max-md:my-5 max-sm:w-full max-sm:text-2xl max-sm:h-[60px] hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        Booking
      </button>
    </div>
  
    <div className="mt-6 text-lg text-center font-medium">{expertise}</div>
    <div className="mt-2 text-lg text-center">{experience} Years of Experience</div>
  
    <button
      onClick={() => {
        token ? router.push("/booking") : router.push("/login");
      }}
      className="mt-6 text-xl bg-white rounded-xl px-6 py-3 hover:bg-gray-100 hover:scale-105 transition-all duration-300 active:scale-95"
    >
      Booking
    </button>
  </div>
  

  );
};
