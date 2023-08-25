import { Typography } from '@mui/joy'
import React from 'react'

export default function UpcomingTournaments({ data }) {
    return (
        data.length === 0 ?
            <Typography>No upcoming tournaments</Typography> :
            <div>
                {data.map((item, index) => (
                    <Typography key={index}>{item.datetimes.UIDate}</Typography>
                ))}
            </div>
    )
}
