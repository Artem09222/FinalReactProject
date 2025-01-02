import styles from './LeftStatisticsSection.module.css';
import BalanceInfo from './BalanceInfo/BalanceInfo';
import CurrentRates from './CurrencyRates/CurrencyRates';
import CurrencySale from './CurrencySale/CurrencySale';
import StatisticsTitle from './Statistics/Statistics';
import HomeTitle from './Home/Home';

const LeftStatisticsSection = ({ onSectionChange }) => {
    return (
        <div className={styles.leftStatisticsSection}>
            <div className={styles.leftStatisticsSectionWrapper}>
                <div className={styles.leftStatisticsSectionInfo}>
                <div onClick={() => onSectionChange('Home')}>
                        <HomeTitle />
                    </div>
                    <div onClick={() => onSectionChange('Statistics')}>
                        <StatisticsTitle />
                    </div>
                </div>
            </div>
            <BalanceInfo />
            <CurrentRates />
            <CurrencySale />
        </div>
    );
};

export default LeftStatisticsSection;