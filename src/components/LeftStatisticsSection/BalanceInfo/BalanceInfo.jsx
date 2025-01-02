import styles from './BalanceInfo.module.css';

const BalanceInfo = () => {
    return (
        <div className={styles.balanceInfo}>
            <h3 className={styles.balanceInfoTitle}>YOUR BALANCE</h3>
            <span className={styles.balanceInfoTitle2}>₴ 24 000.00</span>
        </div>
    );
};

export default BalanceInfo;