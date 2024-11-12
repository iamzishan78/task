import React, { useState } from "react";
import supabase from "../../lib/supabase";

function Page2({ setPageNo, formData, setFormData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    formData?.progress?.step1
  );

  const handleSelection = (option) => {
    setSelectedOption(option);

    setFormData((pre) => ({
      ...pre,
      progress: { ...pre?.progress, step1: option },
    }));
  };
  console.log("2 page", formData);

  const handleNextPage = async () => {
    setIsLoading(true);
    const data = await supabase
      .from("survey")
      .update({ ...formData })
      .eq("email", formData?.email)
      .then(() => {
        setIsLoading(false);
        setPageNo(3);
      });
  };
  return (
    <div className="w-full md:w-1/2 flex  flex-col  items-cener justify-center  text-center mt-[-28%] sm:mt-[-15%] ">
      <p
        className=""
        style={{
          color: "rgba(182, 182, 182, 1)",
          zIndex: 99999,
        }}
      >
        Question 1
      </p>
      <div
        style={{
          zIndex: 99999,
        }}
      >
        <p className="text-white font-bold text-2xl py-5" style={{}}>
          What is your preferred choice?
        </p>
      </div>

      <div className="flex  items-center justify-between space-x-4   text-white w-full ">
        <div
          onClick={() => handleSelection("orange")}
          className={`relative w-1/2 h-64 rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 ${
            selectedOption === "orange" ? "border-4 border-white" : ""
          }`}
          style={{ backgroundColor: "rgba(109,109,109,1)" }}
        >
          {/* Top Circle Indicator */}
          <div
            className={`absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 ${
              selectedOption === "orange" ? "bg-white" : "bg-transparent"
            }`}
          ></div>
          {/* Image and Label */}
          <p className="text-center">Nike Orange</p>
          <img
            src="/images/nike-orange.png"
            alt="Nike Orange"
            className="w-full h-40 object-contain mb-2"
          />
        </div>

        {/* Option 2 - Nike Black */}
        <div
          onClick={() => handleSelection("black")}
          className={`relative w-1/2 h-64  rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 ${
            selectedOption === "black" ? "border-4 border-white" : ""
          }`}
          style={{ backgroundColor: "rgba(109,109,109,1)" }}
        >
          {/* Top Circle Indicator */}
          <div
            className={`absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 ${
              selectedOption === "black" ? "bg-white" : "bg-transparent"
            }`}
          ></div>

          <p className="text-center">Nike Black</p>
          <img
            src="/images/nike-black.png"
            alt="Nike Orange"
            className="w-full h-40 object-contain mb-2"
          />
        </div>
      </div>

      {selectedOption === null && (
        <p className=" text-red-500 mt-2">Please select one</p>
      )}

      <div className="flex justify-between mt-5">
        <button
          class=" text-black rounded-full py-3 px-8 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 "
          style={{ backgroundColor: "rgba(237, 182, 210, 1)" }}
          onClick={() => {
            setPageNo(1);
          }}
        >
          <p> &#x2196; Back </p>
        </button>

        <button
          class=" text-black rounded-full py-3 px-8 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 "
          style={{ backgroundColor: "rgba(187, 233, 74, 1)" }}
          onClick={() => {
            handleNextPage();
          }}
        >
          {isLoading ? <p>...loading</p> : <p> Next &#8599;</p>}
        </button>
      </div>
    </div>
  );
}

export default Page2;
