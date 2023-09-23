import styles from './SubmitBtn.module.css';

function SubmitBtn({ text }) {
    return (
        <div>
            <input type="submit" value={text} className={styles.btn} />
        </div>
    )
}

export default SubmitBtn;