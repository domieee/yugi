import styles from './tournamentsStats.module.css'

import { Typography, Sheet } from '@mui/joy'


export default function TournamentStats({ icon, title, data }) {
    return (
        <>
            <Sheet className={styles.container} color="primary" variant="soft">
                <div className={styles.heading}>
                    {icon} <Typography level='body-sm' component='h4' fontWeight={400} >{title}</Typography>
                </div>
                <Typography level='h4' component='p' className={styles.data}>{data.length === 0 || data === 0 ? 'N/A' : data}</Typography>

            </Sheet>
        </>
    )
}