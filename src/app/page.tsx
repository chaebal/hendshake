"use client";

import Image from "next/image";
import Form from "next/form";
import { useState, useEffect } from "react";

export default function Home() {
  const [activity, setActivity] = useState<string>("");
  const [activities, setActivities] = useState<string[]>([]);

  const [price, setPrice] = useState<number | undefined>(undefined);
  const [prices, setPrices] = useState<number[]>([]);

  const [type, setType] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);

  const [booking, setBooking] = useState(false);

  const [acs, setAcs] = useState<string>("");
  const [acss, setAcss] = useState<string[]>([]);

  useEffect(() => {
    const savedActivities = JSON.parse(
      localStorage.getItem("activities") || "[]"
    );
    const savedPrices = JSON.parse(localStorage.getItem("prices") || "[]");
    const savedTypes = JSON.parse(localStorage.getItem("types") || "[]");
    const savedAcss = JSON.parse(localStorage.getItem("acss") || "[]");

    setActivities(savedActivities);
    setPrices(savedPrices);
    setTypes(savedTypes);
    setAcss(savedAcss);
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("prices", JSON.stringify(prices));
    localStorage.setItem("types", JSON.stringify(types));
    localStorage.setItem("acss", JSON.stringify(acss));
  }, [activities, prices, types, acss]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activity.trim() === "") return;
    if (price === undefined) return;

    setActivities([...activities, activity]);
    setActivity("");

    setPrices([...prices, price]);
    setPrice(undefined);

    setTypes([...types, type]);

    setAcss([...acss, acs]);

    console.log("New Entry Added:");
    console.log({
      activity,
      price,
      type,
      acs,
    });

    console.log("Updated Lists:");
    console.log("Activities:", [...activities, activity]);
    console.log("Prices:", [...prices, price]);
    console.log("Types:", [...types, type]);
    console.log("Acs:", [...acss, acs]);

    setType("");
    setAcs("");
  };

  const handleDelete = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
    setPrices(prices.filter((_, i) => i !== index));
    setTypes(types.filter((_, i) => i !== index));
    setAcss(acss.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-500">
          Add List
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Activity
            </label>
            <input
              type="text"
              className="w-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              placeholder="Enter your activity"
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              className="w-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              placeholder="Enter your price"
              value={price ?? ""}
              onChange={(e) =>
                setPrice(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Type
            </label>
            <select
              id="options"
              name="options"
              className="w-50 border border-gray-300 rounded-md px-4 py-2 text-gray-600"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="option1">Educational</option>
              <option value="option2">Recreational</option>
              <option value="option3">Social</option>
              <option value="option1">DIY</option>
              <option value="option2">Charity</option>
              <option value="option3">Cooking</option>
              <option value="option1">Relaxation</option>
              <option value="option2">Music</option>
              <option value="option3">Busywork</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mb-2 text-md font-medium text-gray-600">
              Booking<span className="text-red-500 text-md">*</span>
            </label>
            <input
              type="checkbox"
              className="w-10 h-3 scale-130 mb-1"
              id="booking"
              checked={booking}
              onChange={(e) => setBooking(e.target.checked)}
              required
            ></input>
          </div>
          <div className="flex items-center">
            <label className="mb-2 text-md font-medium text-gray-600">
              Accessiblity 0.0 to 1.0
            </label>
            <input
              className="ml-5 w-50 h-3 mb-1"
              type="range"
              id="acs"
              min="0.0"
              max="1.0"
              step="0.1"
              value={acs}
              onChange={(e) => setAcs(e.target.value)}
            ></input>
          </div>
          <button
            className="border border-gray-300 rounded-md px-4 py-2 text-white bg-blue-300 hover:border-blue-800 hover:text-blue-800"
            type="submit"
          >
            Submit
          </button>

          <h2 className="text-black">
            List of Activities | Total Activities: {activities.length}
          </h2>
          <ul>
            {activities.map((act, index) => (
              <li className="text-black" key={index}>
                {act} - RM{prices[index]} - {types[index]} - {acss[index]}
                <button
                  className=" ml-4 text-red-500 hover:underline"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}
