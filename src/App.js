import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';  // Імпортуйте motion
import styles from './App.css';
import Header from './components/Header/Header';
import LeftStatisticsSection from './components/LeftStatisticsSection/LeftStatisticsSection';
import RightStatisticsSection from './components/RightStatisticsSection/RightStatisticsSection';
import StatisticsRigntSection from './components/LeftStatisticsSection/StatisticsRigntSection/StatisticsRigntSection';
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
  const [activeRightSection, setActiveRightSection] = useState('Home')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setIsAuthenticated(true);
      setUserName(savedUser.name);
    }
  }, []);
  
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false); 
    setUserName('');
  };

  useEffect(() => {
    const savedSection = localStorage.getItem('activeRightSection');
    if (savedSection) {
        setActiveRightSection(savedSection);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeRightSection', activeRightSection);
  }, [activeRightSection]);

  const changedRightSection = () => {
    switch (activeRightSection) {
      case 'Home':
        return <RightStatisticsSection />;
      case 'Statistics':
        return <StatisticsRigntSection />;
      default:
        return null;
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
      className={styles.app}
    >
      {isAuthenticated ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} // Затримка для заголовка
            className={styles.header}
          >
            <Header userName={userName} onLogOut={handleLogOut} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }} // Затримка для лівої частини
            className={styles.container}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.leftStatisticsSection}
            >
              <LeftStatisticsSection onSectionChange={setActiveRightSection} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}  // Для правої частини з іншого боку
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.rightSection}
            >
              {changedRightSection()}
            </motion.div>
          </motion.div>
        </>
      ) : (
        <RegisterForm setUser={(name) => {
          setUserName(name);
          setIsAuthenticated(true);
        }} />
      )}
    </motion.div>
  );
}

export default App;
