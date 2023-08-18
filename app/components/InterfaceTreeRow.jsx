

import { MdKeyboardArrowDown } from "react-icons/md"

import styles from '../interface/interface.module.css'

import { useTournamentStore } from "../interface/tournamentStore"

import {
    Sheet,
    Typography,
    Divider,
    Button,
    Grid,
    Modal,
    Stack,
    ModalDialog,
    ModalClose,
    Box,
    Input
} from "@mui/joy"

import {
    GiStabbedNote,
    GiStack,
    GiTrophy,
    GiFamilyTree,
    GiPerson
} from "react-icons/gi";
import { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";

export default function InterfaceTreeRow({ interfaceIndex, title, variableName, treeRow, lg, md, sm, xs }) {
    console.log("🚀 ~ file: InterfaceTreeRow.jsx:34 ~ InterfaceTreeRow ~ variableName:", variableName)

    const tournamentStore = useTournamentStore(state => state)

    const [expanded, setExpaned] = useState(true)

    const [open, setOpen] = useState({ key: '', index: 0, state: false })

    const [modalName, setModalName] = useState('')
    const [modalDeck, setModalDeck] = useState('')
    const [modalDeckNote, setModalDeckNote] = useState('')
    const [modalDeckLink, setModalDeckLink] = useState('')

    const [variable, setVariable] = useState('')

    const [idx, setIdx] = useState('')


    useEffect(() => {
        setVariable(variableName)
        console.log("🚀 ~ file: InterfaceTreeRow.jsx:51 ~ useEffect ~ variableName:", variableName)
    }, [])

    const handleModalOpen = async (item, index, variableName) => {
        setOpen({ key: variable, index: interfaceIndex, state: true })
        console.log("🚀 ~ file: InterfaceTreeRow.jsx:56 ~ handleModalOpen ~ variable:", variable)


        setIdx(index)


        console.log("🚀 ~ file: InterfaceTreeRow.jsx:62 ~ handleModalOpen ~ tournamentStore[variableName][interfaceIndex]?.name:", tournamentStore[variable][index]?.name)

        setModalName(tournamentStore[variable][index]?.name)
        setModalDeck(tournamentStore[variable][index]?.deck)
        setModalDeckNote(tournamentStore[variable][index]?.deckNote)
        setModalDeckLink(tournamentStore[variable][index]?.deckLink)
        console.log("🚀 ~ file: InterfaceTreeRow.jsx:52 ~ handleModalOpen ~ open:", open)
    }

    const handleModalSave = (variableName) => {
        const names = ['name', 'deck', 'deckNote', 'deckLink'];
        const values = [modalName, modalDeck, modalDeckNote, modalDeckLink];

        names.map((name, index) => {
            console.log("values[index]:", values[index]);
            tournamentStore.updateField(variable, idx, name, values[index]);
        });

        setOpen({ key: null, index: null, state: false });
    };
    const handleChange = (event) => {

        // console.log("🚀 ~ file: InterfaceTreeRow.jsx:43 ~ handleChange ~ event:", event.name)
        // const { name, value } = event.target;
        // tournamentStore.updateField(variableName, interfaceIndex, name, value);
    };

    return (
        <>
            <div onClick={() => setExpaned(prev => !prev)} className={styles.treeHeadingContainer}>
                <div className={styles.treeHeading}>
                    {interfaceIndex === 0 ? <GiTrophy color={`var(--joy-palette-neutral-400, #9FA6AD)`} /> : <GiFamilyTree color={`var(--joy-palette-neutral-400, #9FA6AD)`} />}
                    <Typography level='body-xs'>{title}</Typography>
                </div>
                <MdKeyboardArrowDown className={expanded ? styles.icon : styles.iconExpandedFalse} />
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
                        <Grid boxShadow='shadow.lg' xs={xs} sm={sm} md={md} lg={lg} key={index} item>
                            <Sheet onClick={() => handleModalOpen(item, index)} color="primary" className={styles.gridItemContainer} variant="outlined">
                                <div className={styles.informationRow}><GiPerson color={tournamentStore[variableName][index]?.name?.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index]?.name?.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index]?.name?.length > 0 ? tournamentStore[variableName][index]?.name : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><GiStack color={tournamentStore[variableName][index]?.deck?.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index]?.deck?.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index]?.deck?.length > 0 ? tournamentStore[variableName][index]?.deck : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><GiStabbedNote color={tournamentStore[variableName][index]?.deckNote?.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index]?.deckNote?.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index]?.deckNote?.length > 0 ? tournamentStore[variableName][index]?.deckNote : 'N/A'}</Typography>
                                </div>
                                <div className={styles.informationRow}><HiExternalLink color={tournamentStore[variableName][index]?.deckLink?.length > 0 ? `var(--joy-palette-neutral-300, #CDD7E1)` : `var(--joy-palette-neutral-400, #9FA6AD)`} />
                                    <Typography style={tournamentStore[variableName][index]?.deckLink?.length > 0 ? { color: `var(--joy-palette-neutral-300, #CDD7E1)` } : { color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level="body-sm">{tournamentStore[variableName][index]?.deckLink?.length > 0 ? tournamentStore[variableName][index]?.deckLink : 'N/A'}</Typography>
                                </div>

                            </Sheet>
                        </Grid>
                    )
                })}
            </Grid >

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open.state}
                onClose={() => setOpen({ key: null, index: 0, state: false })}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    color="primary"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 6,
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
                    <Stack spacing={1}>
                        <Box>
                            <Typography level="title-lg" component='p'>Update Tournament Player</Typography>
                            <Divider />
                        </Box>

                        <Box>
                            <Typography level="body-xs">Player Name</Typography>
                            <Input autoFocus
                                name="name"
                                onChange={event => setModalName(event.target.value)}
                                value={modalName}
                                startDecorator={<GiPerson />}
                                size="sm" />
                        </Box>

                        <Box>
                            <Typography level="body-xs">Played Deck</Typography>
                            <Input
                                value={modalDeck}
                                onChange={event => setModalDeck(event.target.value)}
                                startDecorator={<GiPerson />}
                                size="sm" />
                        </Box>

                        <Box>
                            <Typography level="body-xs">Deck Notes</Typography>
                            <Input
                                onChange={event => setModalDeckNote(event.target.value)}
                                value={modalDeckNote}
                                startDecorator={<GiPerson />}
                                size="sm" />
                        </Box>

                        <Box>
                            <Typography level="body-xs">External Link</Typography>
                            <Input
                                onChange={event => setModalDeckLink(event.target.value)}
                                value={modalDeckLink}
                                startDecorator={<GiPerson />}
                                size="sm" />
                        </Box>

                        <Button onClick={() => handleModalSave()} size="sm" maxWidth={75}>Save Changes</Button>
                    </Stack>
                </Sheet>
            </Modal >
        </>
    )
}