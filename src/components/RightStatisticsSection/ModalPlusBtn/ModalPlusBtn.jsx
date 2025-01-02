import { useState, useRef, useEffect } from "react";
import styles from "./ModalPlusBtn.module.css";
import imgCalendar from "../../../assets/photo_2024-12-22_12-34-16.jpg";
import categories from "../../../assets/categories";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalPlus = ({ onClose, onAddTransaction }) => {
    const [isIncome, setIsIncome] = useState(true);
    const [formData, setFormData] = useState({
        category: "",
        amount: "0.00",
        date: new Date(),
        comment: "",
    });
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target)
            ) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggle = () => {
        setIsIncome(!isIncome);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            date,
        }));
        setShowCalendar(false);
    };

    const handleCategorySelect = (category) => {
        setFormData((prevData) => ({
            ...prevData,
            category,
        }));
        setShowDropdown(false);
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();

        if (!formData.category || parseFloat(formData.amount) <= 0) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const newTransaction = {
            ...formData,
            type: isIncome ? "Income" : "Expense",
        };

        onAddTransaction(newTransaction);
        setFormData({ category: "", amount: "0.00", date: new Date(), comment: "" });
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h1 className={styles.h1}>Add Transaction</h1>
                <div className={styles.toggleWrapper}>
                    <span
                        className={`${styles.label} ${
                            isIncome ? styles.active : ""
                        }`}
                    >
                        Income
                    </span>
                    <div className={styles.toggleSwitch} onClick={toggle}>
                        <div
                            className={`${styles.circle} ${
                                isIncome ? styles.income : styles.expense
                            }`}
                        ></div>
                    </div>
                    <span
                        className={`${styles.label} ${
                            !isIncome ? styles.active : ""
                        }`}
                    >
                        Expense
                    </span>
                </div>
                <form onSubmit={handleAddTransaction}>
                    <div className={styles.categoryWrapper}>
                        <input
                            value={formData.category}
                            readOnly
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={styles.categoryInp}
                            type="text"
                            placeholder="Select category"
                            name="category"
                        />
                        {showDropdown && (
                            <div className={styles.dropdown}>
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.dropdownItem} ${
                                            formData.category === category
                                                ? styles.activeItem
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleCategorySelect(category)
                                        }
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.inputCalendarWrapper}
                        ref={calendarRef}
                    >
                        <input
                            className={styles.inpNumberCalendar}
                            type="number"
                            step="0.01"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        <div className={styles.dateWrapper}>
                            <input
                                type="text"
                                className={styles.inpDateCalendar}
                                name="dateCalendar"
                                value={formData.date.toLocaleDateString()}
                                readOnly
                                onClick={() => setShowCalendar(!showCalendar)}
                            />
                            {showCalendar && (
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    inline
                                />
                            )}
                            {!showCalendar && (
                                <img
                                    src={imgCalendar}
                                    alt="Calendar Icon"
                                    className={styles.calendarIcon}
                                    onClick={() => setShowCalendar(!showCalendar)}
                                />
                            )}
                        </div>
                    </div>
                    <input
                        value={formData.comment}
                        onChange={handleChange}
                        className={styles.commentInp}
                        type="text"
                        placeholder="Comment"
                        name="comment"
                    />
                    <button type="submit" className={styles.addButton}>
                        ADD
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalPlus;
