import logoMoneyGuard from '../../images and logos/logoMoneyGuard.png'
import logoExit from '../../images and logos/logoExit.png'
import styles from './Header.module.css'
const Header = ({ userName, onLogOut }) => {
    const handleLogOut = () => {
        localStorage.removeItem("user");
        onLogOut()
      };
    return (
        <div className={styles.headerBlock}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerSectionLogo}>
                    <img src={logoMoneyGuard} alt="Logo" className={styles.headerImg} />
                    <br /> 
                    <h2 className={styles.headerLogoTitle}>Money Guard</h2>
                </div>
                <div className={styles.headerSectionExit}>
                    <h2 className={styles.headerSectionExitTitle}>{userName || "Anonymous"} |</h2>
                    <img src={logoExit} alt="Logo" className={styles.headerLogoExit} />
                    <button className={styles.headerExitAlt} onClick={handleLogOut}>Exit</button>
                </div>
            </div>
        </div>
    )
}

export default Header