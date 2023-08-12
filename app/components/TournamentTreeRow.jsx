'use client'


import styles from './TournamentTree.module.css'
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';


import {
    GiStabbedNote,
    GiStack,
    GiTrophy,
    GiFamilyTree,
    GiPerson,
    GiTabletopPlayers
} from "react-icons/gi";

import { HiExternalLink } from "react-icons/hi";

import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TournamentTreeRow({ data, title, expandedStatus, xs }) {

    const [open, setOpen] = useState({ state: false, item: null });

    const [expanded, setExpanded] = useState(expandedStatus)

    const toggleItemExpanded = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const handleRedirect = () => {
        const newWindow = window.open(open.item, '_blank');
        if (newWindow) {
            newWindow.focus();
        }
        setOpen(false);
    }

    return (
        <>
            <div onClick={() => toggleItemExpanded()} className={styles.expandRow}>
                <h4>{title}</h4>
                <MdKeyboardArrowDown className={expanded ? styles.iconExpandedFalse : styles.icon} />
            </div>
            <article id={xs} >
                {
                    data.map((item, index) => (
                        <div onClick={() => setOpen({ state: true, item: item.deckLink })} key={index} xs={2} className={expanded ? styles.treeRowContainerExpanded : styles.treeRowContainerExpandedFalse}>
                            <div className={styles.informationRow}><GiPerson /> <Typography component='p' level='body-md' >{item.name.length > 0 ? item.name : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow} ><GiStack /> <Typography component='p' level='body-md'>{item.deck.length > 0 ? item.deck : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow}><GiStabbedNote /> <Typography component='p' level='body-md'>{item.deckNote.length > 0 ? item.deckNote : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow}><HiExternalLink /><Typography component='p' level='body-md'>{item.deckLink.length > 0 ? item.deckLink : 'N/A'}</Typography ></div>
                        </div >
                    ))
                }
            </article>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open.state}
                onClose={() => setOpen({ state: false, item: null })}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.surface',
                        }}
                    />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Redirect to external Page?
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">

                        You are about to be redirected to an external page. Would you like to proceed?
                    </Typography>

                    <Typography fontWeight='lg' level='body-sm' textColor="inherit">
                        <HiExternalLink /> {open.item}
                    </Typography>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '5px' }}>
                        <Button variant='outlined' size='sm' onClick={() => setOpen({ state: false, item: null })}>Decline</Button>
                        <Button size='sm' onClick={() => handleRedirect()}>Redirect</Button>
                    </div>

                </Sheet>
            </Modal>

        </>


    );
}