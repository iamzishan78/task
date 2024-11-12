import React, { useState } from "react";


function Page4({ setPageNo , formData }) {


  return (
    <div className="w-full md:w-1/2  flex  flex-col   justify-start   md:pr-20">
      {/* md:w-1/2 */}

      <div className="w-full text-right">
        <p className="text-white font-bold text-6xl pt-5">Thank You</p>
        <p className="text-white font-bold text-2xl ">for your feedback!</p>
        <div className="flex md:justify-end justify-between mt-4 space-x-3">
          <button
            class=" text-black rounded-full py-3 px-2 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 "
            style={{ backgroundColor: "rgba(237, 182, 210, 1)" }}
            onClick={() => {
              setPageNo(3);
            }}
          >
            <p> &#x2196; Back </p>
          </button>

          <button
            class=" text-black rounded-full py-3 px-2 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 bg-white "
            onClick={() => {
              setPageNo(1);
            }}
          >
            <p> Back To Home &#8599;</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page4;
