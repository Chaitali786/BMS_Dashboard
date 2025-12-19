"use client";

import React from 'react'

import { useState } from "react";

const telemetry_form = () => {

  const [formData ,setTelemetry] = useState(
    {
    voltage :"",
    current :"",
    temperature:"",
    soc:""
   }
  ) 
  const handleChange = (e: any) => {
    setTelemetry({
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const sendData = () =>{
   console.log("Telemetry form data is : " ,formData);
  }
  return (  
    <div className="flex flex-col w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">Telemetry Form</h2>
      Voltage : <input 
                      type ="number"                      
                      name ="voltage"
                      value={formData.voltage} 
                      onChange={handleChange} 
                      placeholder="Enter Voltage"
                      ></input>
      Current : <input 
                      type ="number"                      
                      name = "current"
                      value={formData.current} 
                      onChange={handleChange}
                      placeholder="Enter Current">
                      </input>
      Temperature : <input 
                      type ="number"                     
                      name ="temperature"
                      value={formData.temperature} 
                      onChange={handleChange}
                      placeholder="Enter Temperature">                       
                      </input>
      SOC :         <input 
                     type ="number"                    
                     name ="soc"
                     value={formData.soc} 
                     onChange={handleChange}
                     placeholder="Enter SOC">
                     </input><br></br>
        <div className ="flex flex-row justify-center gap-2">
          <button onClick={sendData}
          className="bg-blue-600  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
        POST Data
      </button>
       <button onClick={sendData}
        className="bg-blue-600  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
      >
        GET Data
      </button>
      </div>        
      
    </div> 
    
  )
}

export default telemetry_form