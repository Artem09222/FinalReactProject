import ModalPlusBtn from "../ModalPlusBtn/ModalPlusBtn";
import { useState } from "react";
import styles from './PlusBtn.module.css'
const PlusBtn = ({ onAddTransaction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <button onClick={handleOpenModal} className={styles.plusList}>+</button>
            {isModalOpen && (
                <ModalPlusBtn
                    onClose={handleCloseModal}
                    onAddTransaction={onAddTransaction}
                />
            )}
        </>
    );
};

export default PlusBtn;
