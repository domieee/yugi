'use client'

import React from 'react'
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { MdMoreVert } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useStore } from '../stores/userStore';

export default function MenuButtonTournamentOverview(tournament) {
    console.log("🚀 ~ file: MenuButtonTournamentOverview.jsx:14 ~ MenuButtonTournamentOverview ~ tournament:", tournament.id.id[0])

    const router = useRouter()

    const id = useStore((state) => state.id)
    const role = useStore((state) => state.role)

    const setUserName = useStore((state) => state.setUserName)
    const setUserID = useStore((state) => state.setUserID)
    const setUserRole = useStore((state) => state.setUserRole)

    return (
        role === 'moderator' || role === 'administrator' ?
            <Dropdown>
                <MenuButton
                    sx={{
                        width: '20px',
                        height: '20px'
                    }}
                    slots={{ root: IconButton }}
                    slotProps={{ root: { color: 'primary' } }}
                    size="sm"
                >
                    <MdMoreVert />
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    color='primary'
                    variant='outlined'>
                    <MenuItem
                        onClick={() => router.push(`/interface/${tournament.id.id[0]}`)}>
                        Edit Tournament
                    </MenuItem>
                    {role === 'administrator' ?
                        <MenuItem color='danger'>Delete Tournament</MenuItem> :
                        null}

                </Menu>
            </Dropdown> :
            null
    )
}
