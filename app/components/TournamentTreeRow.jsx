'use client'

import { useState } from 'react';
import styles from './TournamentTree.module.css'

import { MdKeyboardArrowDown } from 'react-icons/md';

export default function TournamentTreeRow({ data, title, expandedStatus }) {

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
            {data.map((item, index) => (
                <article key={index} className={expanded ? styles.treeRowContainerExpanded : styles.treeRowContainerExpandedFalse}>
                    <p>{item.name.length > 0 ? item.name : 'N/A'}</p>
                    <p>{item.deck.length > 0 ? item.deck : 'N/A'}</p>
                    <p>{item.deckNote.length > 0 ? item.deckNote : 'N/A'}</p>
                    <p>{item.deckLink.length > 0 ? item.deckLink : 'N/A'}</p>
                </article >
            ))
            }
        </>
    );
}