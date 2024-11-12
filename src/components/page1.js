import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

function Page1({ setPageNo, formData, setFormData }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleNextPage = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("survey")
      .select()
      .eq("email", formData?.email);

    console.log("data 121212", data);

    if (!data || data.length === 0) {
      // const {data} = await supabase
      //   .from("survey")
      //   .insert([
      //     {
      //       email: formData?.email,
      //       progress: {
      //         step1: "",
      //         step2: {
      //           Comfort: "",
      //           Looks: "",
      //           Price: "",
      //         },
      //       },
      //       status: "in-progress",
      //     },
      //   ])
      const { data, error, count } = await supabase.from("survey").insert([
        {
          email: formData?.email,
          progress: {
            step1: "",
            step2: {
              Comfort: "",
              Looks: "",
              Price: "",
            },
          },
          status: "in-progress",
        },
      ]);
      // .then((data) => {
      setFormData({
        email: formData?.email,
        progress: {
          step1: "",
          step2: {
            Comfort: "",
            Looks: "",
            Price: "",
          },
        },
        status: "in-progress",
      });

      setPageNo(2);
      setIsLoading(false);

      console.log("datatatatafta ", data);
    }
    // else {
    //   setFormData(data[0]);
    //   console.log("my formData", formData);
    //   setPageNo(2);
    else {
      setFormData(data[0]);
      setIsLoading(false);

      console.log(
        !formData?.progress?.step1,
        !formData?.progress?.step2?.Comfort,
        !formData?.progress?.step2?.Looks,
        !formData?.progress?.step2?.Price
      );

      console.log(
        "2222",
        formData?.progress?.step1 !== "",
        formData?.status !== "complete"
      );
      if (
        !formData?.progress?.step1 &&
        !formData?.progress?.step2?.Comfort &&
        !formData?.progress?.step2?.Looks &&
        !formData?.progress?.step2?.Price
      ) {
        setPageNo(2);
      } else if (
        formData?.progress?.step1 !== "" &&
        formData?.status !== "complete"
      ) {
        setPageNo(3);
      } else if (
        formData?.progress?.step1 !== "" &&
        formData?.progress?.step2?.Comfort !== "" &&
        formData?.progress?.step2?.Looks !== "" &&
        formData?.progress?.step2?.Price !== "" &&
        formData?.status == "complete"
      ) {
        setPageNo(4);
      } else {
        setPageNo(2);
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 flex  md:mt-0  flex-col md:items-end items-cener justify-start md:justify-center mt-[-28%] sm:mt-[-15%] p-5">
      <h1
        className="lg:text-6xl text-2xl  text-white text-center md:text-2xl xl:text-8xl 2xl:text-9xl"
        style={{
          zIndex: "2000",
        }}
      >
        Questionnaire
      </h1>
      <div
        style={{ backgroundColor: "rgba(237, 182, 210, 1)", zIndex: "2000" }}
        className="p-8 rounded-3xl mt-3"
      >
        <p className="sm:font-bold ">Welcome!</p>
        <p className="mt-5">
          We're excited to hear your thoughts, ideas, and insights. Don't worry
          about right or wrong answers—just speak from the heart. Your genuine
          feedback is invaluable to us!
        </p>
      </div>

      <div class="w-full ">
        <label class="block tracking-wide  text-lg font-bold mb-2 mt-3 text-white">
          Email
        </label>
        <input
          class="appearance-none block w-full  text-gray-700 border  mb-3 leading-tight rounded-full py-5 px-6"
          id="grid-first-name"
          type="text"
          placeholder="Enter email address"
          value={formData?.email}
          required
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              email: e.target?.value,
            }));
          }}
        />
      </div>
      <button
        class="w-full  text-black rounded-full py-5 px-6 font-extrabold text-lg hover:bg-yellow-500 transition duration-300 flex justify-between my-3"
        style={{ backgroundColor: "rgba(187, 233, 74, 1)" }}
        onClick={() => {
          handleNextPage();
        }}
        disabled={!formData?.email}
      >
        {isLoading ? (<p>...loading</p>) : (
        <>
          <p> Start Survey</p>
          <p className="font-extrabold">&#8599; </p>
        </>
        )}
      </button>
    </div>
  );
}

export default Page1;
