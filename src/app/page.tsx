"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DentistCard } from "@/components/DentistCard";
import getDentists from "@/libs/(dentist)/getDentists";
import Image from "next/image";
import SearchDentist from "@/components/SearchDentist";
import getArea from "@/libs/(dentist)/getArea";

export default function Home() {
  const [dentists, setDentists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [years, setYears] = useState<number | null>(null);
  const [area, setArea] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState("Loading");
  const [button, setButton] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [value, setValue] = useState<string[]>();

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const data = await getDentists();
        setDentists(data.data);
        setTotalPage(data.pagination.total.page);
      } catch (err) {
        setError("Failed to load dentists");
      } finally {
        setLoading(false);
      }
    };

    const fetchArea = async () => {
      try {
        const data = await getArea();
        // console.log(data);
        setArea(data.data);
      } catch (err) {
        setError("Failed to load area");
      }
    };

    fetchDentists();
    fetchArea();
  }, []);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const data = await getDentists(value, page);
        setDentists(data.data);
        setTotalPage(data.pagination.total.page);
      } catch (err) {
        setError("Failed to load dentists");
      } finally {
        setLoading(false);
      }
    };
    fetchDentists();
  }, [page]);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        console.log("show selected", selected);
        let newValue: string[] = [];
        if (selected.length > 0) {
          let index = newValue.push("area_of_expertise=");
          for (const val of selected) {
            newValue[index - 1] += val + ",";
          }
          newValue[index - 1] = newValue[index - 1].substring(
            0,
            newValue[index - 1].length - 1
          );
        }
        if (years) {
          newValue.push("year_of_experience=" + years);
        }
        setValue(newValue);
        // console.log("show newValue", newValue);
        // console.log(value);
        const data = await getDentists(newValue, page);
        setDentists(data.data);
        setTotalPage(data.pagination.total.page);
        setPage(1);
      } catch (err) {
        setError("Failed to load dentists");
      } finally {
        setLoading(false);
      }
    };
    fetchDentists();
  }, [button]);

  useEffect(() => {
    const loadingStates = ["Loading", "Loading.", "Loading..", "Loading..."];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingStates[index]);
      index = (index + 1) % loadingStates.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="text-3xl">{loadingText}</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="text-3xl text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="p-5 mx-auto my-0 max-w-screen-xl transition-all duration-300 ease-in-out">
        <Navbar />

        {/* Hero Section */}
        <div className="mb-10 relative w-full h-[500px] max-sm:h-[250px] rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <Image
          src="/banner.png"
          alt="Banner"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        </div>

        {/* Divider */}
        <div className="mx-0 my-10 h-2 bg-gradient-to-r from-green-200 to-sky-200 rounded-3xl transform hover:scale-x-105 transition-all duration-300" />

        <div className="mb-10 text-3xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-sky-600">
          Our Professional Dentists
        </div>

        <SearchDentist
          selected={selected}
          setSelected={setSelected}
          AreaData={area}
          setYears={setYears}
          button={button}
          setButton={setButton}
          page={page}
          setPage={setPage}
          totalPage={totalPage}
        />

        <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] max-md:gap-5">
          {dentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              name={dentist.name}
              expertise={dentist.area_of_expertise}
              experience={dentist.year_of_experience}
              imageUrl={dentist.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
