"use client";

import React from "react";
import { useState } from "react";


const telemetry_form = () => {

   const [formData, setTelemetry] = useState({
    voltage: "",
    current: "",
    temperature: "",
    soc: "",
  });
  const [latestData, setData] = useState({
    voltage: "",
    current: "",
    temperature: "",
    soc: "",
  });
  

  const handleChange = (e: any) => {
    setTelemetry({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postData = async () => {
   
    //console.log("Telemetry form data is : " ,formData);
    const loadData = {
      voltage: Number(formData.voltage),
      current: Number(formData.current),
      temperature: Number(formData.temperature),
      soc: Number(formData.soc),
    };
    try {
      await fetch("/api/telemetry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loadData),
      });
      alert("Data Sent Succesfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try{
      const response = await fetch("/api/telemetry")
      const result = await response.json()
      console.log(`Data : ${result}`)
      if(result && result.voltage !== undefined){
        
        setData({
          voltage: result.voltage,
          current: result.current,
          temperature: result.temperature,
          soc: result.soc,
        })
      }


    }catch(error){
      console.error("Error fetching latest data",error)
    }

  };

  return (
    <div className="flex flex-col w-full max-w-md justify-center bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Telemetry Form
      </h2>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">Voltage </label>
        <input
          type="number"
          name="voltage"
          value={formData.voltage}
          onChange={handleChange}
          placeholder="Enter Voltage"
          className="border border-gray-300 rounded-md bg-white"
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">Current </label>
        <input
          type="number"
          name="current"
         value={formData.current}
         onChange={handleChange}
         placeholder="Enter Current"
         className="border border-gray-300 rounded-md bg-white"
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">Temperature </label>
        <input
          type="number"
           name="temperature"
        value={formData.temperature}
        onChange={handleChange}
        placeholder="Enter Temperature"
         className="border border-gray-300 rounded-md bg-white"
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">SOC </label>
        <input
          type="number"
           name="soc"
        value={formData.soc}
        onChange={handleChange}
        placeholder="Enter SOC"
         className="border border-gray-300 rounded-md bg-white"
        />
      </div>



      
      
      <div className="flex flex-row justify-center gap-2 mt-5">
        <button
          onClick={postData}
          className="bg-emerald-700  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          POST Data
        </button>
        <button onClick={getData} className="bg-emerald-700  text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          GET Data
        </button>
      </div>
      <div className="flex flex-col w-full max-w-md mt-5 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Battery's Latest Parameters 
      </h2>
      <div className="flex flex-col justify-center gap-3.5">
        <div className="flex flex-row justify-left gap-10" > 
           <label className="font-bold  w-32">Voltage - </label><span>{latestData.voltage}</span>
           <label className="font-bold  w-32">Current - </label><span>{latestData.current}</span>
         
        </div>
        <div className="flex flex-row justify-left gap-10">
           <label className="font-bold  w-32">Temperature- </label><span>{latestData.temperature}</span>
           <label className="font-bold  w-32">SOC- </label><span>{latestData.soc}</span>
        </div>
      </div>
      </div>
    </div>

    
  );
};

export default telemetry_form;
