"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  totalPendingBalance: number;
  totalPremiums: number;
}

const BalancePremiumChart = ({ totalPendingBalance, totalPremiums }: Props) => {
  const data = {
    labels: ["Premium Balances", "Total Premiums"],
    datasets: [
      {
        label: "Amount in Ksh",
        data: [totalPendingBalance, totalPremiums],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Color for Pending Balance
          "rgba(54, 162, 235, 0.6)", // Color for Total Premiums
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Border color for Pending Balance
          "rgba(54, 162, 235, 1)", // Border color for Total Premiums
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {};

  return <Doughnut data={data} options={options} className="h-full w-full" />;
};

export default BalancePremiumChart;
