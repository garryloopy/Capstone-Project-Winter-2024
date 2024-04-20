import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function OrderChart() {
  const options = {
    scales: {
      yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Order Chart",
        font: {
          size: 20,
        },
      },
    },
    indexAxis: "x",
    barThickness: 50,
  };

  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: null,
        data: [],
        backgroundColor: "Orange",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    // Get 30 days of data
    const currentDate = new Date();
    const previousMonth = new Date(currentDate);
    previousMonth.setDate(previousMonth.getDate() - 1);

    const daysInPreviousMonth = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth() + 1,
      0
    ).getDate();

    const startDate = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth(),
      1
    );

    const endDate = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth(),
      daysInPreviousMonth
    );

    try {
      const res = await fetch("/api/getOrderList");
      if (res.ok) {
        const orders = await res.json();
        const orderCounts = {};

        orders.forEach((order) => {
          const orderDate = new Date(order.createdAt);
          if (orderDate >= startDate && orderDate <= endDate) {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
            }).format(new Date(order.createdAt));

            orderCounts[formattedDate] = (orderCounts[formattedDate] || 0) + 1;
          }
        });

        const labels = Object.keys(orderCounts);
        const data = labels.map((label) => orderCounts[label]);

        const graphData = {
          labels: labels,
          datasets: [
            {
              label: "Order(s)",
              data: data,
              backgroundColor: "Orange",
              borderWidth: 1,
            },
          ],
        };
        setGraphData(graphData);
      } else {
        console.log("Error fetching order data");
      }
    } catch (error) {
      console.error("An error occurred while fetching order data:", error);
    }
  };

  return (
    <section>
      <div id="order-chart">
        <Bar data={graphData} options={options} />
      </div>
    </section>
  );
}
