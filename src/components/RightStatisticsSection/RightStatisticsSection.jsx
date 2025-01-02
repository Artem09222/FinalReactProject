import { useEffect, useState } from 'react';
import DeleteListBtn from './DeleteListButton/DeleteListButton';
import styles from './RightStatisticsSection.module.css';
import PlusBtn from './PlusBtn/PlusBtn';

const RightStatisticsSection = () => {
    const [records, setRecords] = useState([
        { date: '04.01.19', type: '-', category: 'Other', comment: 'Gift for your wife', sum: '300.00', sumClass: 'sum' },
        { date: '05.01.19', type: '+', category: 'Income', comment: 'January bonus', sum: '8 000.00', sumClass: 'sumUnique' },
        { date: '07.01.19', type: '-', category: 'Car', comment: 'Oil', sum: '1 000.00', sumClass: 'sum' },
        { date: '07.01.19', type: '-', category: 'Products', comment: 'Vegetables for the week', sum: '280.00', sumClass: 'sum' },
        { date: '07.01.19', type: '+', category: 'Income', comment: 'Gift', sum: '1 000.00', sumClass: 'sumUnique' },
    ]);

    useEffect(() => {
        const savedRecords = localStorage.getItem('records');
        if (savedRecords) {
            setRecords(JSON.parse(savedRecords));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('records', JSON.stringify(records));
    }, [records]);

    const deleteList = (index) => {
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
    }

    const handleAddTransaction = (transaction) => {
      const newTransaction = {
        date: new Date(transaction.date).toLocaleDateString(),
        type: transaction.type,
        category: transaction.category,
        comment: transaction.comment,
        sum: transaction.amount,
        sumClass: transaction.type === "+" ? "sumUnique" : "sum",
      };
      setRecords((prevRecords) => [...prevRecords, newTransaction]);
    };

    return (
        <div className={styles.rightStatisticsSection}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <div className={styles.headerItem}>Date</div>
                    <div className={styles.headerItem}>Type</div>
                    <div className={styles.headerItem}>Category</div>
                    <div className={styles.headerItem}>Comment</div>
                    <div className={styles.headerItem}>Sum</div>
                    <div className={styles.headerItem}></div>
                </div>
                {records.map((record, index) => (
                    <div key={index} className={styles.record}>
                        <div className={styles.date}>{record.date}</div>
                        <div className={styles.type}>{record.type}</div>
                        <div className={styles.category}>{record.category}</div>
                        <div className={styles.comment}>{record.comment}</div>
                        <div className={styles[record.sumClass]}>{record.sum}</div>
                        <DeleteListBtn deleteList={() => deleteList(index)} />
                    </div>
                ))}
              <PlusBtn onAddTransaction={handleAddTransaction} />
            </div>
        </div>
    );
};

export default RightStatisticsSection;