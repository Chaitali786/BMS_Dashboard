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
 const [isDataSaved, showPostDataMsg] = useState(false);
 const [isDataFetched, showFetchingMsg] = useState(false);
 

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
    if(formData.voltage==="" || formData.current ==="" || formData.temperature ==="" || formData.soc===""){
       showPostDataMsg(false);
       //alert("Please fill in all fields !")
    }
    else{
       try {
      const response= await fetch("/api/telemetry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loadData),
      });
      if (response.ok) {
      showPostDataMsg(true); 
      setTimeout(() => showPostDataMsg(false), 3000); 
     }
      //alert("Data Sent Succesfully!");
    } catch (error) {
      console.error(error);
    }
    }
   
  };
  

  const getData = async () => {
    try {
      showFetchingMsg(true)
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const response = await fetch("/api/telemetry");
      const result = await response.json();
      console.log(`Data : ${result}`);
      if (result && result.voltage !== undefined) {
        
        setData({
          voltage: result.voltage,
          current: result.current,
          temperature: result.temperature,
          soc: result.soc,
        });
      }
    } catch (error) {
      console.error("Error fetching latest data", error);
    }finally {
    showFetchingMsg(false); 
  }
  };
  
  const getVoltageStatus = (voltageCurrentValue: any) => {
    const voltageLatest = Number(voltageCurrentValue);
    return voltageLatest >= 240 || voltageLatest >= 200 ? "red" : "black";
  };
  return (
    <div className="flex flex-col w-full max-w-md justify-center bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Telemetry Form
      </h2>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32"> Voltage </label>
        <input
          type="number"
          name="voltage"
          value={formData.voltage}
          onChange={handleChange}
          placeholder="Enter Voltage"
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white invalid:border-red-500 invalid:text-red-600 focus:invalid:ring-red-500 "
          
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
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white  invalid:border-red-500 invalid:text-red-600 focus:invalid:ring-red-500"
          
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
          required
          min = "1"
          className="border border-gray-300 rounded-md bg-white  invalid:border-red-500 invalid:text-red-600 focus:invalid:ring-red-500"
          
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
          required
          min = "1"
          className="border border-gray-300 rounded-md bg-white  invalid:border-red-500 invalid:text-red-600 focus:invalid:ring-red-500"
           
         
        />
      </div>
      <div className="flex flex-row justify-center gap-2 mt-5">
        <button
          onClick={postData}
          className="bg-emerald-700  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          POST Data
        </button>
        <button
          onClick={getData}
          className="bg-emerald-700  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          GET Data
        </button>
      </div>
       {isDataSaved && (
           <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded text-[10px] font-bold mt-2">
            Battery Data Saved Sucessfully !
          </div>
        )}
        {isDataFetched && (
           <div className="w-4 h-4 border-2 border-green border-t-transparent rounded-full animate-spin"></div>
           
        )}
        {isDataFetched ? "Fetching..." : "Latest Data"}
      <div className="flex flex-col w-full max-w-md mt-5 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
          Battery Dashboard
        </h2>
        <div className="flex flex-col justify-center gap-3.5">
          <div className="flex flex-row justify-left gap-10">
            <label className="font-bold  w-32">Voltage - </label>
            <span
              className={
                getVoltageStatus(latestData.voltage) === "red"
                  ? "text-red-600 font-bold"
                  : "text-black font-bold"
              }
            >
              {latestData.voltage}v
            </span>
            <label className="font-bold  w-32">Current - </label>
            <span>{latestData.current}A</span>
          </div>
          <div className="flex flex-row justify-left gap-10">
            <label className="font-bold  w-32">Temperature- </label>
            <span>{latestData.temperature}&deg;C</span>
            <label className="font-bold  w-32">SOC- </label>
            <span>{latestData.soc}%</span>
          </div>
        </div>
        {getVoltageStatus(latestData.voltage) === "red" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-[10px] font-bold mt-2">
            High Voltage Detected! Please investigate  the deviation ! 
          </div>
        )}
      </div>
    </div>
  );
};

export default telemetry_form;
