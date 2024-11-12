"use client";

import React, { useEffect, useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import supabase from "../../lib/supabase";

function Home({ pageNo, setPageNo }) {
  const [formData, setFormData] = useState({
    email: "",
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

  useEffect(() => {}, [formData]);

  console.log("pageNo", pageNo);

  return (
    <div className="w-screen min-h-screen relative   flex  md:flex-row  flex-col  md:items-center md:justify-center md:px-[15%] px-[5%] md:pt-[4%] md:space-x-10 lg:space-x-0">
      <div
        className={`md:w-1/2 w-full flex justify-end  ${
          pageNo == 1 || pageNo == 4 ? "" : "md:hidden "
        }`}
      >
        <img src="/images/shoes.png" className="responsive-image  " 
        style={{zIndex : 20}}/>
        <style jsx>{`
          .responsive-image {
            box-shadow: none;
          }

          /* Apply the box shadow starting from medium (768px) screens */
          @media (min-width: 768px) {
            .responsive-image {
              box-shadow: 0px 30px 20px -25px rgba(0, 0, 0, 1);
            }
          }
        `}</style>
      </div>

      <div
        className={` w-[50%] h-[30%] md:w-[25%] md:h-[50%] absolute left-[5%] md:top-[8%] md:left-[13%] top-[0px] ${
          pageNo == 1 || pageNo == 4 ? "" : "md:hidden "
        }`}
        style={{
          clipPath:
            "polygon(100% 33%, 49% 33%, 100% 77%, 82% 96%, 32% 54%, 32% 100%, 0 100%, 0 0, 100% 0)",
          backgroundColor: " rgba(74, 74, 74, 1)",
        }}
      ></div>

      {pageNo == 1 && (
        <Page1
          setPageNo={setPageNo}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {pageNo == 2 && (
        <Page2
          setPageNo={setPageNo}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {pageNo == 3 && (
        <Page3
          setPageNo={setPageNo}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {pageNo == 4 && (
        <Page4
          setPageNo={setPageNo}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}

export default Home;
