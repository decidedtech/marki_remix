"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const MonthSelect: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const startingYear = 2024; // Ensure years start from 2024

  // Get initial values from URL or default to current month and year
  const defaultMonth = searchParams.get("m") ?? currentMonthIndex.toString();
  const defaultYear = searchParams.get("y") ?? startingYear.toString();

  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);

  // Define parameter types
  function handleSelectionChange(newMonth: string, newYear: string) {
    const params = new URLSearchParams(searchParams);

    if (newMonth) {
      params.set("m", newMonth);
    } else {
      params.delete("m");
    }

    if (newYear) {
      params.set("y", newYear);
    } else {
      params.delete("y");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex space-x-2">
      {/* Month Select */}
      <select
        name="month"
        id="month-select"
        value={selectedMonth}
        className="select select-sm select-bordered text-blue-600 text-sm rounded"
        onChange={(e) => {
          const newMonth = e.target.value;
          setSelectedMonth(newMonth);
          handleSelectionChange(newMonth, selectedYear);
        }}
      >
        <option value="">Select a month</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>
      {/* Year Select */}
      <select
        name="year"
        id="year-select"
        value={selectedYear}
        className="select select-sm select-bordered text-blue-600 text-sm rounded"
        onChange={(e) => {
          const newYear = e.target.value;
          setSelectedYear(newYear);
          handleSelectionChange(selectedMonth, newYear);
        }}
      >
        <option value="">Select a year</option>
        {Array.from({ length: 5 }, (_, i) => (
          <option key={i} value={(startingYear + i).toString()}>
            {startingYear + i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;
