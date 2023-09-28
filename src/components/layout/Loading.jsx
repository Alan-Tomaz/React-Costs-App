import styles from './Loading.module.css';
import loading from '../../img/loading.svg';

function Loading() {
    return (
        <div className={styles.loader_container}>
            <img src={loading} alt="Loading" className={styles.loading} />
        </div>
    )
}

export default Loading;