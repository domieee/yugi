import styles from './tournamentsStats.module.css'


export default function TournamentStats({ title, data }) {
    return (
        <>
            <div className={styles.container}>
                <h4 className={styles.heading}>{title}</h4>
                <p className={styles.data}>{data.length === 0 || data === 0 ? 'N/A' : data}</p>
            </div>
        </>
    )
}