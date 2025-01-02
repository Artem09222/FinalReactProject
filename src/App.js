import { useEffect, useState } from 'react';
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
    <div className={styles.app}>
      {isAuthenticated ? (
        <>
          <Header userName={userName} onLogOut={handleLogOut} />
          <div className={styles.container}>
            <LeftStatisticsSection onSectionChange={setActiveRightSection} />
            <div className={styles.rightSection}>
              {changedRightSection()}
            </div>
          </div>
        </>
      ) : (
        <RegisterForm setUser={(name) => {
          setUserName(name);
          setIsAuthenticated(true);
        }} />
      )}
    </div>
  );
}

export default App;
