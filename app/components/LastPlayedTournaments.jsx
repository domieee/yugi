import Link from 'next/link';
import React from 'react'
import styles from './LastPlayedTournaments.module.css'
import { Sheet, Typography } from '@mui/joy';

import { GiTrophy, GiTabletopPlayers, GiPlanetConquest, GiCalendar, GiFamilyTree, GiStack } from "react-icons/gi";

export default function LastPlayedTournaments({ data }) {

    function labelProvider(tournament) {
        switch (tournament?.tournamentType) {
            case 'national':
                return (
                    <Typography
                        fontWeight={600}
                        variant='outlined'
                        color='primary'
                        className={styles.lastPlayedItemLabel}
                        level="body-xs"> National
                    </Typography >

                )
            case 'regional':
                return (
                    <Typography
                        fontWeight={600}
                        variant='outlined'
                        color='primary'
                        className={styles.lastPlayedItemLabel}
                        level="body-xs" > Regional
                    </Typography >

                )
            case 'other':
                return (
                    <Typography
                        fontWeight={600}
                        variant='outlined'
                        color='primary'
                        className={styles.lastPlayedItemLabel}
                        level="body-xs"> Other
                    </Typography >

                )
        }
    }

    return (
        data?.length > 0 ?

            data.map((tournament, index) => (
                <Link key={index} href={`tournaments/${tournament?._id}`
                }>
                    <Sheet variant='outlined' color='primary' className={styles.lastPlayedTournamentsItem}>
                        {labelProvider(tournament)}
                        <div className={styles.tableRow}>
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
                            <Typography sx={tournament?.location.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)`, fontStyle: 'italic' }} level='body-sm'>{tournament?.location.length !== 0 ? tournament?.location : 'N/A'}</Typography>
                        </div>
                        <div className={styles.tableRow}>
                            <GiTrophy style={{ color: `var(--joy-palette-neutral-300, #ffd700)` }} />
                            <Typography sx={{ color: `var(--joy-palette-neutral-300, #CDD7E1)` }} level='body-sm'>{tournament?.players[0][0].name} with {tournament?.players[0][0].deck}</Typography>
                        </div>
                        <div className={styles.tableRow}>
                            <GiCalendar style={{ color: `var(--joy-palette-neutral-300, #CDD7E1)` }} />
                            <Typography sx={{ color: `var(--joy-palette-neutral-300, #CDD7E1)` }} level='body-sm'>{tournament?.datetimes.UIDate}</Typography>
                        </div>
                        <div className={styles.tableRow}>
                            <GiTabletopPlayers style={tournament?.totalParticipants !== 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)`, fontStyle: 'italic' }} />
                            <Typography level='body-sm' sx={tournament?.totalParticipants !== 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)`, fontStyle: 'italic' }}>{tournament?.totalParticipants !== 0 ? tournament?.totalParticipants : 'N/A'}</Typography>
                        </div>
                    </Sheet>
                </Link >
            )) :
            <Typography>No data provided</Typography>
    )

}
