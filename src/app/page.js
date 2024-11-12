"use client";

import Home from "@/components/home";
import React, { useEffect, useState } from "react";
export default function index() {
  const [pageNo, setPageNo] = useState(1);

  // const { data } = await supabase.from("survey").select();
  // console.log("222" , data);
  useEffect(() => {}, [pageNo]);

  return (
    <div
      style={{
        background: "linear-gradient(291.34deg, #010101 0%, #4D4D4D 100%)",
      }}
    >
      <Home pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
}
