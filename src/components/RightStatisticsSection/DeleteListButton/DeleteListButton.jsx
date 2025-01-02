import styles from "./DeleteListButton.module.css"

const DeleteListBtn = ({ deleteList }) => {
    return (
        <button className={styles.delete} onClick={deleteList}>Delete</button>
    )
}

export default DeleteListBtn