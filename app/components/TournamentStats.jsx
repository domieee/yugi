import styles from './tournamentsStats.module.css'

import { Typography } from '@mui/joy'


export default function TournamentStats({ title, data }) {
    return (
        <>
            <div className={styles.container}>
                <Typography level='body-sm' component='h4' fontWeight={400} className={styles.heading}>{title}</Typography>
                <Typography level='h4' component='p' className={styles.data}>{data.length === 0 || data === 0 ? 'N/A' : data}</Typography>
            </div>
        </>
    )
}