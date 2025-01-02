import styles from './CurrencyRates.module.css';

const rates = [
    { currency: 'USD', purchase: '27.55', sale: '27.65' },
    { currency: 'EUR', purchase: '30.00', sale: '30.10' },
];

const CurrentRates = () => {
    return (
        <div className={styles.currencyRates}>
            <div className={styles.header}>
                <div className={styles.headerItem}>Currency</div>
                <div className={styles.headerItem}>Purchase</div>
                <div className={styles.headerItem}>Sale</div>
            </div>
            {rates.map((rate, index) => (
                <div key={index} className={styles.rateRow}>
                    <div className={styles.cell}>{rate.currency}</div>
                    <div className={styles.cell}>{rate.purchase}</div>
                    <div className={styles.cell}>{rate.sale}</div>
                </div>
            ))}
        </div>
    );
};

export default CurrentRates;