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
  imageUrl = "/placeholder-dentist.jpg",
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
    <div className="relative p-6 bg-sky-200 rounded-3xl h-[500px] max-md:p-5 max-md:h-auto max-sm:p-4">
      <div className="text-3xl text-center">{name}</div>
      <div className="mx-auto my-5 h-2 bg-green-100 rounded-3xl w-[307px]" />
      <div className="mx-auto my-5 bg-white rounded-full h-[237px] w-[237px] max-sm:h-[180px] max-sm:w-[180px] overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 180px, 237px"
        />
      </div>
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
  );
};
