import React from "react";
import Forecast from "@/components/sections/Forecast/Forecast";
import Header from "@/components/sections/Header/Header";

const City = () => {
  return (
    <>
      <Header favorite main/>
      <Forecast />
    </>
  );
};

export default City;
