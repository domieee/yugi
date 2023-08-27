import { Sheet, Typography } from '@mui/joy'
import React from 'react'
import styles from './UpcomingTournaments.module.css'
export default function UpcomingTournaments({ data }) {
    return (
        data.length === 0 ?
            <Sheet
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '75px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                classname={styles.noDataContainer}
                variant='outlined'
                color='primary'>
                <Typography>No upcoming tournaments</Typography>
            </Sheet> :
            data.map((item, index) => (
                <Sheet
                    className={styles.upcomingTournamentItem}
                    variant='soft'
                    color='primary'
                    key={index}>
                    <Typography>{item.datetimes.UIDate}</Typography>
                </Sheet>
            ))
    )
}
