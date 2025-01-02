import React, { useState, useEffect } from 'react';
import styles from './StatisticsRigntSection.module.css';
import CircularChart from '../StatisticsRightSectionCircularRates/StatisticsRightSectionCircularRates'
import data from '../../data.json';

const StatisticsRigntSection = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [selectedYear, setSelectedYear] = useState('2022');
    const [statistics, setStatistics] = useState(null);

    const months = [
        'January', 'February', 'March', 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 
        'November', 'December'
    ];
    const years = ['2019', '2020', '2021', '2022', '2023'];

    useEffect(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        const savedYear = localStorage.getItem('selectedYear');
        if (savedMonth) setSelectedMonth(savedMonth);
        if (savedYear) setSelectedYear(savedYear);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedMonth', selectedMonth);
        localStorage.setItem('selectedYear', selectedYear);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (data[selectedYear] && data[selectedYear][selectedMonth]) {
            setStatistics(data[selectedYear][selectedMonth]);
        } else {
            setStatistics(null);
        }
    }, [selectedMonth, selectedYear]);

    return (
        <div className={styles.statisticsRigntSection}>
            <h2 className={styles.title}>Statistics</h2>

            <div className={styles.mainContent}>
                <div className={styles.chartContainer}>
                    <CircularChart size={80} thickness={6} />
                </div>

                <div className={styles.rightBlock}>
                    <div className={styles.filters}>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className={styles.dropdown}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className={styles.dropdown}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.content}>
                        {statistics ? (
                            <>
                                <div className={styles.leftSection}>
                                    <div className={styles.categoryList}>
                                        {Object.entries(statistics.categories).map(([category, amount]) => (
                                            <div key={category} className={styles.categoryItem}>
                                                <span className={styles.categoryColor}></span>
                                                <span>{category}</span>
                                                <span>₴ {amount.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.rightSection}>
                                    <div className={styles.summary}>
                                        <div>Expenses: <span className={styles.expenses}>₴ {statistics.expenses.toFixed(2)}</span></div>
                                        <div>Income: <span className={styles.income}>₴ {statistics.income.toFixed(2)}</span></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>No data available for the selected month and year.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsRigntSection;