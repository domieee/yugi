import { Sheet, Typography } from '@mui/joy'
import React from 'react'
import styles from './UpcomingTournaments.module.css'
import { GiCalendar, GiPlanetConquest } from 'react-icons/gi'
import Link from 'next/link'
export default function UpcomingTournaments({ data }) {

    function labelProvider(tournament) {
        switch (tournament?.tournamentType) {
            case 'national':
                return (
                    <Typography
                        fontWeight={600}
                        className={styles.lastPlayedItemLabel}
                        level="body-xs"> National
                    </Typography >

                )
            case 'regional':
                return (
                    <Typography
                        fontWeight={600}
                        className={styles.lastPlayedItemLabel}
                        level="body-xs" > Regional
                    </Typography >

                )
            case 'other':
                return (
                    <Typography
                        fontWeight={600}
                        className={styles.lastPlayedItemLabel}
                        level="body-xs"> Other
                    </Typography >

                )
        }
    }

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
            data.map((tournament, index) => (
                <Link
                    key={index}
                    href='/tournaments'>
                    <Sheet
                        sx={
                            {
                                width: '270px'
                            }
                        }
                        className={styles.upcomingTournamentItem}
                        variant='outlined'
                        color='primary'>
                        <div className={styles.container}>
                            {labelProvider(tournament)}
                            <div className={styles.typoRow}>
                                <GiCalendar />
                                <Typography level='body-sm' sx={{ color: `var(--joy-palette-neutral-300, #CDD7E1)` }}>{tournament.datetimes.UIDate}</Typography>
                            </div >
                            <div className={styles.typoRow}>
                                {tournament?.locationLabel.length > 0 ?
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${tournament.locationLabel.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${tournament.locationLabel.toLowerCase()}.png 2x`}
                                        alt=""
                                    /> :
                                    <GiPlanetConquest style={{ color: `var(--joy-palette-neutral-400, #9FA6AD)` }} />
                                }
                                <Typography level='body-sm' sx={tournament?.location.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)`, fontStyle: 'italic' }}>{tournament.location.length > 0 ? tournament.location : 'N/A'}</Typography>
                            </div>
                        </div>
                    </Sheet>
                </Link>
            ))
    )
}
