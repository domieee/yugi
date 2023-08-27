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
                        className={styles.lastPlayedItemLabel}
                        color="primary"
                        level="body-xs"
                        variant="outlined" > National
                    </Typography >

                )
            case 'regional':
                return (
                    <Typography
                        className={styles.lastPlayedItemLabel}
                        color="warning"
                        level="body-xs"
                        variant="outlined" > Regional
                    </Typography >

                )
            case 'other':
                return (
                    <Typography
                        className={styles.lastPlayedItemLabel}
                        color="success"
                        level="body-xs"
                        variant="outlined" > Other
                    </Typography >

                )
        }
    }

    return (
        data?.length > 0 ?
            data.map((tournament, index) => (
                <Link key={index} href={`tournaments/${tournament?._id}`
                }>
                    <Sheet variant='soft' color='primary' className={styles.lastPlayedTournamentsItem}>
                        {labelProvider(tournament)}
                        <div className={styles.tableRow}>
                            <GiTrophy style={{ color: 'white' }} />
                            <Typography level='body-sm'>{tournament?.players[0][0].name} with {tournament?.players[0][0].deck}</Typography>
                        </div>
                        <div className={styles.tableRow}>
                            <GiCalendar />
                            <Typography level='body-sm'>{tournament?.datetimes.UIDate}</Typography>
                        </div>
                        <div className={styles.tableRow}>
                            {tournament?.locationLabel.length > 0 ?
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${tournament.locationLabel.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${tournament.locationLabel.toLowerCase()}.png 2x`}
                                    alt=""
                                /> :
                                <GiPlanetConquest />
                            }
                            <Typography level='body-sm'>{tournament?.location.length !== 0 ? tournament?.location : 'N/A'}</Typography>
                        </div>
                    </Sheet>
                </Link >
            )) :
            <Typography>No data provided</Typography>
    );
}