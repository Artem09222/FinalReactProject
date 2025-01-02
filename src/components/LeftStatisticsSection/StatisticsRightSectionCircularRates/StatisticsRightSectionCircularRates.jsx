import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from './StatisticsRightSectionCircularRates.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularChart = () => {
    const data = {
        labels: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"],
        datasets: [
            {
                data: [3000, 5000, 2000, 4000, 1000, 9000],
                backgroundColor: [
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                    "#FFCE56", // Yellow
                    "#4BC0C0", // Green
                    "#9966FF", // Purple
                    "#FF9F40", // Orange
                ],
                hoverBackgroundColor: [
                    "#FF4384",
                    "#2A92EB",
                    "#FFAE56",
                    "#3BA0A0",
                    "#8756FF",
                    "#FF7A20",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "75%", // Контролює ширину кільця
        plugins: {
            legend: {
                display: false, // Приховує легенду
            },
            tooltip: {
                enabled: true, // Увімкнення/вимкнення підказок
            },
        },
    };

    // Текст у центрі графіка
    const plugins = [
        {
            id: "centerText",
            beforeDraw: (chart) => {
                const { width } = chart;
                const { height } = chart;
                const ctx = chart.ctx;
                ctx.restore();

                const fontSize = (height / 150).toFixed(2); // Динамічний розмір шрифту
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = "middle";

                const text = "₴ 24 000.00";
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillStyle = "#FFFFFF"; // Колір тексту
                ctx.fillText(text, textX, textY);
                ctx.save();
            },
        },
    ];

    return (
        <div className={styles.circularChart} style={{ maxWidth: "300px", margin: "0 auto" }}>
            <Doughnut data={data} options={options} plugins={plugins} />
        </div>
    );
};

export default CircularChart;