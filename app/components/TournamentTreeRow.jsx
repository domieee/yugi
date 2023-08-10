'use client'

import { useState } from 'react';
import styles from './TournamentTree.module.css'

import {
    GiStabbedNote,
    GiStack,
    GiTrophy,
    GiFamilyTree,
    GiPerson,
    GiTabletopPlayers
} from "react-icons/gi";
import { Grid, Typography } from '@mui/joy/';

import { HiExternalLink } from "react-icons/hi";

import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TournamentTreeRow({ data, title, expandedStatus, xs }) {

    const [expanded, setExpanded] = useState(expandedStatus)

    const toggleItemExpanded = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    return (
        <>
            <div onClick={() => toggleItemExpanded()} className={styles.expandRow}>
                <h4>{title}</h4>
                <MdKeyboardArrowDown className={expanded ? styles.iconExpandedFalse : styles.icon} />
            </div>
            <article id={xs} >
                {
                    data.map((item, index) => (
                        <div key={index} xs={2} className={expanded ? styles.treeRowContainerExpanded : styles.treeRowContainerExpandedFalse}>
                            <div className={styles.informationRow}><GiPerson /> <Typography component='p' level='body-md' >{item.name.length > 0 ? item.name : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow} ><GiStack /> <Typography component='p' level='body-md'>{item.deck.length > 0 ? item.deck : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow}><GiStabbedNote /> <Typography component='p' level='body-md'>{item.deckNote.length > 0 ? item.deckNote : 'N/A'}</Typography ></div>
                            <div className={styles.informationRow}><HiExternalLink /><Typography component='p' level='body-md'>{item.deckLink.length > 0 ? item.deckLink : 'N/A'}</Typography ></div>
                        </div >
                    ))
                }
            </article >
        </>
    );
}