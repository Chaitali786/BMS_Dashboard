"use client";
import React from "react";
import { useState } from "react";

const telemetry_form = () => {
  const [latestData, setData] = useState({
    voltage: "",
    current: "",
    temperature: "",
    soc: "",
  });

  const [isDataSaved, showPostDataMsg] = useState(false);
  const [isDataFetched, showFetchingMsg] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const postData = async (formData: FormData) => {
    const telemetryFormData = Object.fromEntries(formData);
    console.log("Telemetry form data is : ", telemetryFormData);

    const loadData = {
      voltage: Number(telemetryFormData.voltage),
      current: Number(telemetryFormData.current),
      temperature: Number(telemetryFormData.temperature),
      soc: Number(telemetryFormData.soc),
    };
    if (
      !telemetryFormData.voltage ||
      !telemetryFormData.current ||
      !telemetryFormData.temperature ||
      !telemetryFormData.soc
    ) {
      showPostDataMsg(false);
    } else {
      try {
        const response = await fetch("/api/telemetry", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loadData),
        });
        if (response.ok) {
          showPostDataMsg(true);
          setTimeout(() => showPostDataMsg(false), 3000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getData = async () => {
    try {
      showFetchingMsg(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch("/api/telemetry");
      const result = await response.json();

      if (result && result.voltage !== undefined) {
        setData({
          voltage: result.voltage,
          current: result.current,
          temperature: result.temperature,
          soc: result.soc,
        });
        setIsDashboardVisible(true)
      }
    } catch (error) {
      console.error("Error fetching latest data", error);
    } finally {
      showFetchingMsg(false);
    }
  };

  const getVoltageStatus = (voltageCurrentValue: any) => {
    const voltageLatest = Number(voltageCurrentValue);
    if (voltageLatest < 200) return "low";
    if (voltageLatest > 240) return "high";
  };

  return (
    <form
      action={postData}
      className="flex flex-col w-full max-w-md justify-center bg-gray-100 p-8 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
        Telemetry Form
      </h2>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32"> Voltage </label>
        <input
          type="number"
          name="voltage"
          placeholder="Enter Voltage"
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white "
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">Current </label>
        <input
          type="number"
          name="current"
          placeholder="Enter Current"
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white "
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">Temperature </label>
        <input
          type="number"
          name="temperature"
          placeholder="Enter Temperature"
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white "
        />
      </div>
      <div className="flex items-center justify-between  mb-4">
        <label className="font-bold  w-32">SOC </label>
        <input
          type="number"
          name="soc"
          placeholder="Enter SOC"
          required
          min="1"
          className="border border-gray-300 rounded-md bg-white "
        />
      </div>
      <div className="flex flex-row justify-center gap-2 mt-5">
        <button
          type="submit"
          className="bg-emerald-600  text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
        >
          POST Data
        </button>
        <button
          type="button"
          onClick={getData}
          className="bg-emerald-600  text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
        >
          GET Data
        </button>
      </div>
      {isDataSaved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded text-[10px] font-bold mt-2 ">
          Battery Data Saved Sucessfully !
        </div>
      )}
      {isDataFetched && (
        <div className="w-4 h-4 border-2 border-gray border-t-transparent rounded-full animate-spin"></div>
      )}
      {isDataFetched ? "Fetching Data ......" : ""}
      {isDashboardVisible &&
        <div className="w-full max-w-md mt-5 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 ">
        <h2 className="text-center text-xl font-bold mb-4 text-gray-700 border-b pb-2">
          Battery Dashboard
        </h2>

        <table className="w-full text-sm border-collapse border border-gray-300 bg-white">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="font-bold py-2 px-2 border-r bg-emerald-200 border-gray-300">
                Voltage
              </td>
              <td
                className={"px-2 border-r border-gray-300" }
              >
                {latestData.voltage}v
              </td>
              <td className="font-bold py-2 px-2 border-r bg-emerald-200 border-gray-300">
                Current
              </td>
              <td className="px-2">{latestData.current}A</td>
            </tr>

            <tr>
              <td className="font-bold py-2 px-2 border-r bg-emerald-200 border-gray-300">
                Temperature
              </td>
              <td className="px-2 border-r border-gray-300">
                {latestData.temperature}&deg;C
              </td>
              <td className="font-bold py-2 px-2 border-r bg-emerald-200 border-gray-300">
                SOC
              </td>
              <td className="px-2">{latestData.soc}%</td>
            </tr>
          </tbody>
        </table>

        {getVoltageStatus(latestData.voltage) === "low" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-[10px] font-bold mt-2">
            LOW Voltage Detected!
          </div>
        )}
        {getVoltageStatus(latestData.voltage) === "high" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-[10px] font-bold mt-2">
            HIGH Voltage Detected!
          </div>
        )}
      </div>

      }
      
    </form>
  );
};

export default telemetry_form;
