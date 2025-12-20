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
    <div className="flex flex-col w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Telemetry Form
      </h2>
      Voltage :{" "}
      <input
        type="number"
        name="voltage"
        value={formData.voltage}
        onChange={handleChange}
        placeholder="Enter Voltage"
      ></input>
      Current :{" "}
      <input
        type="number"
        name="current"
        value={formData.current}
        onChange={handleChange}
        placeholder="Enter Current"
      ></input>
      Temperature :{" "}
      <input
        type="number"
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
        placeholder="Enter Temperature"
      ></input>
      SOC :{" "}
      <input
        type="number"
        name="soc"
        value={formData.soc}
        onChange={handleChange}
        placeholder="Enter SOC"
      ></input>
      <br></br>
      <br></br>
      <div className="flex flex-row justify-center gap-2">
        <button
          onClick={postData}
          className="bg-blue-600  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          POST Data
        </button>
        <button onClick={getData} className="bg-blue-600  text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          GET Data
        </button>
      </div>
      <div className="flex flex-col w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Current Battery Parameters 
      </h2>
      <div className="flex flex-col justify-center gap-3.5">
        <div className="flex flex-row justify-left gap-10" > 
          <span>Voltage :{latestData.voltage}</span>
          <span>Current :{latestData.current}</span>
        </div>
        <div className="flex flex-row justify-left gap-10">
          <span>Temperature :{latestData.temperature}</span>
          <span>SOC :{latestData.soc}</span>
        </div>
      </div>
      </div>
    </div>

    
  );
};

export default telemetry_form;
