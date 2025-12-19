

const telemetry_form = () => {

 
  return (  
    <div className="flex flex-col w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">Telemetry Form</h2>
      Voltage :  <input 
                      type ="number" 
                      id ="voltage_input"                  
                      placeholder="Enter Voltage"
                      ></input>
      Current : <input 
                      type ="number" 
                      id="current_input"                      
                      placeholder="Enter Current">
                      </input>
      Temperature : <input 
                      type ="number" 
                      id="temp_input" 
                      placeholder="Enter Temperature">                       
                      </input>
      SOC :         <input 
                     type ="number" 
                     id="SOC_input" 
                     placeholder="Enter SOC">
                     </input><br></br>
      <button 
        className="bg-green-600  text-white font-bold py-2 px-4 rounded hover:bg-green-700"
      >
        Send Data
      </button>
    </div> 
    
  )
}

export default telemetry_form