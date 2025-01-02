import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip } from 'chart.js';
import styles from "./CurrencySale.module.css"

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip);

const CurrencySale = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const createGradient = (ctx, chartArea) => {
            if (!chartArea) return 'rgba(255, 99, 132, 0.2)'; // Резервний колір, якщо chartArea недоступний
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(30, 0, 100, 0.8)');
            gradient.addColorStop(1, 'rgba(60, 10, 150, 0.3)');
            return gradient;
        };

        const chartConfig = {
            type: 'line',
            data: {
                labels: ['USD', 'EUR', 'GBP', 'JPY', 'CHF'],
                datasets: [
                    {
                        label: 'Курсы покупки',
                        data: [27.55, 29.00, 30.00, 28.75, 29.5],
                        borderColor: '#ff6384',
                        backgroundColor: null, // Початково null
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ffffff',
                        pointRadius: 5,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Контролюється через контейнер
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        ticks: { color: '#ffffff' },
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        ticks: { color: '#ffffff' },
                    },
                },
                onResize: (chart) => {
                    // Перегенеруємо градієнт після зміни розмірів
                    const gradient = createGradient(chart.ctx, chart.chartArea);
                    chart.data.datasets[0].backgroundColor = gradient;
                    chart.update();
                },
            },
        };

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, chartConfig);

        // Установка градієнта після рендеру
        const gradient = createGradient(ctx, chartRef.current.chartArea);
        chartRef.current.data.datasets[0].backgroundColor = gradient;
        chartRef.current.update();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className={styles.currencyChartContainer}>
            <canvas ref={canvasRef} className={styles.canvas}/>
        </div>
    );
};

export default CurrencySale;