import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

export default function ProfitChart() {
	const options = {
		scales: {
			yAxes: [{ ticks: { beginAtZero: true } }],
		},
		plugins: {
			title: {
				display: true,
				text: "Monthly Profit Chart",
				font: {
					size: 20,
				},
			},
		},
	};

	const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [
			{
				label: "Profit",
				data: [],
				borderColor: "Orange",
				borderWidth: 2,
				fill: true,
			},
		],
	});

	useEffect(() => {
		fetchProfitData();
	}, []);

	const fetchProfitData = async () => {
		// Get 30 days of data
		const currentDate = new Date();
		const previousMonth = new Date(currentDate);
		previousMonth.setDate(previousMonth.getMonth() - 1);

		const daysInPreviousMonth = new Date(
			previousMonth.getFullYear(),
			previousMonth.getMonth() + 1,
			0
		).getDate();

		const startDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);

		const endDate = new Date(
			previousMonth.getFullYear(),
			previousMonth.getMonth(),
			daysInPreviousMonth
		);

		try {
			const res = await fetch("/api/getOrderList");
			if (res.ok) {
				const orders = await res.json();
				const orderAmount = {};

				orders.forEach((order) => {
					const orderDate = new Date(order.createdAt);
					if (orderDate >= startDate && orderDate <= endDate) {
						const formattedDate = new Intl.DateTimeFormat("en-US", {
							month: "short",
							day: "2-digit",
						}).format(orderDate);

						let totalAmount = 0;

						if (order.cartProducts && Array.isArray(order.cartProducts)) {
							order.cartProducts.forEach((product) => {
								const price = parseFloat(product.price.replace("$", ""));
								if (!isNaN(price)) {
									totalAmount += price;
								}
							});
						}

						orderAmount[formattedDate] = (orderAmount[formattedDate] || 0) + totalAmount;
					}
				});

				const labels = Object.keys(orderAmount);
				const data = labels.map((label) => orderAmount[label]);

				const newGraphData = {
					labels: labels,
					datasets: [
						{
							...graphData.datasets[0],
							data: data,
						},
					],
				};
				setGraphData(newGraphData);
			} else {
				console.log("Error fetching order data");
			}
		} catch (error) {
			console.error("An error occurred while fetching order data:", error);
		}
	};

	return (
		<section>
			<div id="profit-chart">
				<Line data={graphData} options={options} />
			</div>
		</section>
	);
}
