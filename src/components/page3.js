import React, { useState } from "react";
import supabase from "../../lib/supabase";


function Page3({ setPageNo, formData, setFormData }) {
  const options = [{ name: "Comfort" }, { name: "Looks" }, { name: "Price" }];
  const [isLoading, setIsLoading] = useState(false);

  // State to track selected dots for each option
  const [selectedDots, setSelectedDots] = useState(
    formData?.progress?.step2 || {}
  );

  console.log("", formData);

  const handleDotClick = (optionName, dotIndex) => {
    setSelectedDots((prev) => ({
      ...prev,
      [optionName]: dotIndex,
    }));

    setFormData((prev) => ({
      ...prev,
      progress: {
        ...prev?.progress,
        step2: {
          ...prev.progress?.step2,
          [optionName]: dotIndex, // Replace newValue with the desired value
        },
      },
    }));
  };

  console.log("form", formData);

  const handleNextPage = async () => {
    setIsLoading(true);
    try {
      // Update in Supabase
      const { data: updateData, error: updateError } = await supabase
        .from("survey")
        .update({ ...formData })
        .eq("email", formData?.email);

      if (updateError) {
        console.error("Error updating survey:", updateError);
        return;
      }

      // Make a POST request to your API
      const response = await fetch("/api/survey/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);

      setPageNo(4);

      // if (response.status === 204) {
      //   // Handle 204 No Content case if your API returns it
      //   console.log("No content returned, but request succeeded with 204 status.");
      //   setSuccess("Survey created successfully!");

      //   return;
      // }

      const data = await response.json();

      if (data?.message === "Survey submitted successfully!") {
        console.log("Survey successfully created:", data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error in handleNextPage:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex  flex-col  items-cener justify-center  text-center mt-[-28%] md:mt-0">
      <p
        className=""
        style={{
          color: "rgba(182, 182, 182, 1)",
          zIndex: 200000,
        }}
      >
        Question 2
      </p>
      <div
      style={{
        zIndex: 99999,
      }}
      >
        <p
          className="text-white font-bold text-2xl py-5"
          style={{
            zIndex: "999999",
          }}
        >
          How important are these aspects for you?
        </p>
      </div>

      <div className="space-y-6 mt-3">
        {options?.map((option) => (
          <div key={option.name} className="flex flex-col  w-full">
            {/* Option and Rating Dots */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-full  w-full">
              <span className="text-black font-semibold w-2/6">
                {option.name}
              </span>
              <div className="w-4/6 flex text-end">
                {[1, 2, 3, 4, 5]?.map((dot, index) => (
                  <div className="w-1/6 text-end mx-1 flex justify-end">
                    <div
                      key={index}
                      onClick={() => handleDotClick(option?.name, index)}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-colors  ${
                        selectedDots[option?.name] === index
                          ? "bg-red-700"
                          : "bg-black"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message for each option */}
            {selectedDots[option?.name] === "" && (
              <p className="text-red-500 text-sm mt-2 text-start">
                Please select a score.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          class=" text-black rounded-full py-3 px-8 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 "
          style={{ backgroundColor: "rgba(237, 182, 210, 1)" }}
          onClick={() => {
            setPageNo(2);
          }}
        >
          <p> &#x2196; Back </p>
        </button>

        <button
          class=" text-black rounded-full py-3 px-8 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 bg-white "
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              status: "complete",
            }));

            handleNextPage();
          }}
          disabled={
            formData?.progress?.step2?.Comfort == "" ||
            formData?.progress?.step2?.Comfort == "" ||
            formData?.progress?.step2?.Price == ""
          }
        >
          {isLoading ? <p>...loading</p> : <p> Send &#8599;</p>}
        </button>
      </div>
    </div>
  );
}

export default Page3;
