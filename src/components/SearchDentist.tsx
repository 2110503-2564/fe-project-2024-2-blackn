"use client";

import { useState } from "react";

export default function SearchDentist(
   { selected, setSelected, setYears, AreaData, button, setButton, page, setPage, totalPage }:
   { selected: string[], setSelected: Function, setYears: Function, AreaData: string[], button: boolean, setButton: Function, page: number, setPage: Function, totalPage: number }
) {
   const [dropBox, setDropBox] = useState(false);

   const handleSelect = (item: string) => {
      let newSelected: string[];
      if(selected.find((selectedItem) => selectedItem === item)) {
         newSelected = selected.filter((selectedItem) => selectedItem !== item);
      }
      else {
         newSelected = [...selected, item];
      }

      console.log(newSelected);
      setSelected(newSelected);
   }
   return (
      <div className="flex flex-row justify-between mb-10">
         <div className="flex flex-col justify-start items-center">
            <div>
               <button
                  id="dropdownSearchButton"
                  className="inline-flex items-center text-center px-2 py-2 m-2 text-center bg-sky-200 rounded-3xl cursor-pointer h-auto w-auto max-sm:w-full hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-colors"
                  type="button"
                  onClick={() => setDropBox(!dropBox)}
               >
                  Select Area of Expertise
               </button>
               <div
                  id="dropdownSearch"
                  className="bg-white border border-gray-200 rounded-lg shadow-md"
                  style={{ display: dropBox ? "inherit" : "none" }}
               >
                  <ul
                     aria-labelledby="dropdownSearchButton"
                  >
                     {AreaData.map((data, index) => (
                        <li key={index}>
                           <div
                              className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                           >
                              <input
                                 id={`checkbox-item-${index}`}
                                 type="checkbox"
                                 value={data}
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                 checked={selected.includes(data)}
                                 onChange={() => {
                                    handleSelect(data);
                                 }}
                              />
                              <label
                                 htmlFor={`checkbox-item-${index}`}
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                              >
                                 {data}
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <input
                     type="number"
                     className="text-center w-auto h-auto px-2 py-2 m-2 text-center bg-sky-200 rounded-3xl cursor-pointer hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-colors"
                     placeholder="Years of Experience"
                     onChange={(e) => {
                        console.log(e.target.value);
                        setYears(Number(e.target.value));
                     }}
                  />
               </div>
            </div>
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-end">
               <button
                  className="inline-flex items-center text-center px-4 py-2 m-2 text-center bg-sky-200 rounded-3xl cursor-pointer h-15 w-30 hover:bg-sky-300 hover:ring-2 hover:ring-sky-400 hover:ring-offset-2 transition-colors"
                  type="button"
                  onClick={() => {
                     console.log("find");
                     setButton(!button);
                  }}
               >
                  Find
               </button>

               <button
                  className="inline-flex items-center text-center px-4 py-2 m-2 text-center bg-sky-200 rounded-3xl cursor-pointer h-15 w-30 hover:bg-sky-300 hover:ring-2 hover:ring-sky-400 hover:ring-offset-2 transition-colors"
                  type="button"
                  onClick={() => {
                     console.log("Reset");
                     setSelected([]);
                     setYears(null);
                     setButton(!button);
                  }}
               >
                  Reset
               </button>
            </div>
            <div>
               <div
                  className="w-auto h-auto p-2 m-2 bg-sky-200 rounded-3xl flex flex-row justify-center items-center"
               >
                  <button
                     className="text-center bg-white rounded-3xl cursor-pointer h-7 w-7 hover:bg-sky-300 mx-1"
                     type="button"
                     onClick={(e: React.MouseEvent) => {
                        console.log("Previous");
                        if(page > 1)
                           setPage(page - 1);
                     }}
                  >
                     &lt;
                  </button>
                  <div className="text-center w-auto h-auto mx-1">
                     {page} / {totalPage}
                  </div>
                  <button
                     className="text-center bg-white rounded-3xl cursor-pointer h-7 w-7 hover:bg-sky-300 mx-1"
                     type="button"
                     onClick={(e: React.MouseEvent) => {
                        console.log("Next");
                        if(page < totalPage)
                           setPage(page + 1);
                     }}
                  >
                     &gt;
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}