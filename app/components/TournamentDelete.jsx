import React from 'react'

import { Button } from '@mui/joy'

export default function TournamentDelete({ role }) {
    return (
        role && role === 'administrator' ?
            <Button
                sx={{
                    marginRight: '20px'
                }}
                variant='outlined'
                color='danger'>
                Delete Tournament
            </Button> : null
    )
}
