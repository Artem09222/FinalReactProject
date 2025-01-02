import logoStatistics from '../../../images and logos/logoStatistics.png';
import styles from './Statistics.module.css'

const StatisticsTitle = () => {
    return (
        <div className={styles.navigationSectionStatistics}>
            <img src={logoStatistics} alt="Statistics Logo" className={styles.leftStatisticsSectionLogoStatistics} />
            <span className={styles.leftStatisticsSectionStatisticsTitle}>Statistics</span>
        </div>
    )
}

export default StatisticsTitle