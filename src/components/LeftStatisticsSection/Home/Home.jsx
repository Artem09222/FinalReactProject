import logoHome from '../../../images and logos/logoHome.png';
import styles from './Home.module.css'

const HomeTitle = () => {
    return (
        <div className={styles.navigationSectionHome}>
            <img src={logoHome} alt="Home Logo" className={styles.leftStatisticsSectionLogoHome} />
            <span className={styles.leftStatisticsSectionHomeTitle}>Home</span>
        </div>
    )
}

export default HomeTitle