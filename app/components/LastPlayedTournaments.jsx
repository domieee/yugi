import Link from 'next/link';
import React from 'react'
import styles from './LastPlayedTournaments.module.css'
import { Sheet } from '@mui/joy';
export default function LastPlayedTournaments({ tournament }) {
    return (
        <Link href={`tournaments/${tournament._id}`}>
            <Sheet variant='soft' color='primary' className={styles.lastPlayedTournamentsItem}>
                <p>{tournament.tournamentType}</p>
                <p>{tournament.datetimes.UIDate}</p>
                <p>{tournament.location.length !== 0 ? tournament.location : 'N/A'}</p>
                {/* Add more elements and logic as needed */}
            </Sheet>
        </Link>
    );
}