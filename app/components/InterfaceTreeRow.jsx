

import { MdKeyboardArrowDown } from "react-icons/md"

import styles from '../interface/interface.module.css'

import { useTournamentStore } from "../interface/tournamentStore"

import {
    Sheet,
    Typography,
    Divider,
    Button,
    Grid
} from "@mui/joy"

import {
    GiStabbedNote,
    GiStack,
    GiTrophy,
    GiFamilyTree,
    GiPerson
} from "react-icons/gi";
import { useState } from "react";

export default function InterfaceTreeRow({ index, title, variableName, treeRow, lg, md, sm, xs }) {

    const tournamentStore = useTournamentStore(state => state)

    const [expanded, setExpaned] = useState(true)

    return (
        <>
            <div onClick={() => setExpaned(prev => !prev)} className={styles.treeHeadingContainer}>
                <div className={styles.treeHeading}>
                    <GiFamilyTree />
                    <Typography level='body-xs'>{title}</Typography>
                </div>
                <MdKeyboardArrowDown className={styles.icon} />
            </div>
            <Divider className={styles.treeHeadingDivider} />
            <Grid
                columns={12}
                gap={2}
                justifyContent='center'
                alignItems='center'
                className={expanded ? styles.gridContainerExpanded : styles.gridContainerNotExpanded}
                container>
                {treeRow.map((item, index) => {
                    return (
                        <Grid xs={xs} sm={sm} md={md} lg={lg} key={index} item>
                            <Sheet color="primary" className={styles.gridItemContainer} variant="outlined">
                                <div className={styles.informationRow}><GiPerson color={tournamentStore[variableName][index].name.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index].name.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index].name.length > 0 ? tournamentStore[variableName][index].name : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><GiStack color={tournamentStore[variableName][index].deck.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index].deck.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index].deck.length > 0 ? tournamentStore[variableName][index].deck : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><GiStabbedNote color={tournamentStore[variableName][index].deckNote.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index].deckNote.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index].deckNote.length > 0 ? tournamentStore[variableName][index].deckNote : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><GiPerson color={tournamentStore[variableName][index].deckLink.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index].deckLink.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index].deckLink.length > 0 ? tournamentStore[variableName][index].deckLink : 'N/A'}</Typography>
                                </div>

                            </Sheet>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}