"use client";
import Telemetry from "./components/telemetry_form";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-emerald-500 font-bold text-3xl mb-8 text-center">
          Batteries Made In Sweden
        </h1>
        <Telemetry />
      </main>
    </div>
  );
}
