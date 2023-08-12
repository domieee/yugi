import styles from './tournamentsStats.module.css'

import { Typography } from '@mui/joy'


export default function TournamentStats({ icon, title, data }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>
                    {icon} <Typography level='body-sm' component='h4' fontWeight={400} >{title}</Typography>
                </div>
                <Typography level='h4' component='p' className={styles.data}>{data.length === 0 || data === 0 ? 'N/A' : data}</Typography>

            </div>
        </>
    )
}