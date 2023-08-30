'use client'

import OuterWindowWrapper from '@/app/components/OuterWindowWrapper';
import { useEffect, useState, useRef } from 'react'

import { Grid, Sheet, Typography, Select, Option, Input, Autocomplete, AutocompleteOption, ListItemDecorator, ListItemContent, CircularProgress, Divider, Button, Alert, Modal, ModalDialog, ModalClose } from "@mui/joy";

import { useTournamentStore } from '../tournamentStore';
import { useInterfaceStore } from '../tournamentStore';
import { useStore } from '@/app/stores/userStore';
import { BiPlus, BiTrash, BiSend } from "react-icons/bi";
import InterfaceTreeRow from '@/app/components/InterfaceTreeRow';
import dynamic from 'next/dynamic';

import styles from '../interface.module.css'

import { countries } from "../data/countries";
import { citys } from "../data/citys";

export default function TournamentEdit({ params }) {

    const tournamentStore = useTournamentStore(state => state)
    console.log("🚀 ~ file: page.jsx:19 ~ TournamentEdit ~ tournamentStore:", tournamentStore.location)
    const interfaceStore = useInterfaceStore(state => state)

    const username = useStore((state) => state.username)
    const role = useStore((state) => state.role)
    const id = useStore((state) => state.id)

    const inputRef = useRef(null)
    const [fetching, setFetching] = useState(true)
    const [cityFetching, setCityFetching] = useState(false)

    const [cityOptions, setCityOptions] = useState(citys)

    const TournamentDelete = dynamic(() => import('../../components/TournamentDelete'), {
        loading: () => null, // Display a loading message while the component is being loaded
        ssr: false, // This will prevent the component from being SSR'd
    });

    const handleTournamentTypeChange = (newValue) => {
        if (tournamentStore.tournamentType === 'national' || tournamentStore.tournamentType === 'other' && newValue === 'regional') {
            tournamentStore.setLocation('')
        }
        tournamentStore.setTournamentType(newValue)
    }
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const dateRef = useRef('2023-02-02');


    useEffect(() => {
        const fetchInformations = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tournament-overview`, {
                    next: { revalidate: 30 },
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: params.id[0]
                    })
                })

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                await tournamentStore.setTournamentType(data.tournamentType)
                await tournamentStore.setLocation(data.location)
                await tournamentStore.setLocationLabel(data.locationLabel)
                await tournamentStore.setDate(`${data.datetimes.year}-${data.datetimes.month}-${data.datetimes.day}`)


                if (data.players[0]) {
                    tournamentStore.firstPlace.map((item, index) => {
                        tournamentStore.updateField('firstPlace', index, 'name', data.players[0][index].name)
                        tournamentStore.updateField('firstPlace', index, 'deck', data.players[0][index].deck)
                        tournamentStore.updateField('firstPlace', index, 'deckNote', data.players[0][index].deckNote)
                        tournamentStore.updateField('firstPlace', index, 'deckLink', data.players[0][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('firstPlace')
                }

                if (data.players[1]) {
                    tournamentStore.secondPlace.map((item, index) => {
                        tournamentStore.updateField('secondPlace', index, 'name', data.players[1][index].name)
                        tournamentStore.updateField('secondPlace', index, 'deck', data.players[1][index].deck)
                        tournamentStore.updateField('secondPlace', index, 'deckNote', data.players[1][index].deckNote)
                        tournamentStore.updateField('secondPlace', index, 'deckLink', data.players[1][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('secondPlace')
                }
                if (data.players[2]) {


                    tournamentStore.top4.map((item, index) => {
                        tournamentStore.updateField('top4', index, 'name', data.players[2][index].name)
                        tournamentStore.updateField('top4', index, 'deck', data.players[2][index].deck)
                        tournamentStore.updateField('top4', index, 'deckNote', data.players[2][index].deckNote)
                        tournamentStore.updateField('top4', index, 'deckLink', data.players[2][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('top4')
                }

                if (data.players[3]) {
                    tournamentStore.top8.map((item, index) => {
                        tournamentStore.updateField('top8', index, 'name', data.players[3][index].name)
                        tournamentStore.updateField('top8', index, 'deck', data.players[3][index].deck)
                        tournamentStore.updateField('top8', index, 'deckNote', data.players[3][index].deckNote)
                        tournamentStore.updateField('top8', index, 'deckLink', data.players[3][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('top8')
                }

                if (data.players[4]) {
                    tournamentStore.top16.map((item, index) => {
                        tournamentStore.updateField('top16', index, 'name', data.players[4][index].name)
                        tournamentStore.updateField('top16', index, 'deck', data.players[4][index].deck)
                        tournamentStore.updateField('top16', index, 'deckNote', data.players[4][index].deckNote)
                        tournamentStore.updateField('top16', index, 'deckLink', data.players[4][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('top16')
                }
                if (data.players[5]) {
                    tournamentStore.top32.map((item, index) => {
                        tournamentStore.updateField('top32', index, 'name', data.players[5][index].name)
                        tournamentStore.updateField('top32', index, 'deck', data.players[5][index].deck)
                        tournamentStore.updateField('top32', index, 'deckNote', data.players[5][index].deckNote)
                        tournamentStore.updateField('top32', index, 'deckLink', data.players[5][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('top32')
                }
                if (data.players[6]) {
                    tournamentStore.top64.map((item, index) => {
                        tournamentStore.updateField('top64', index, 'name', data.players[6][index].name)
                        tournamentStore.updateField('top64', index, 'deck', data.players[6][index].deck)
                        tournamentStore.updateField('top64', index, 'deckNote', data.players[6][index].deckNote)
                        tournamentStore.updateField('top64', index, 'deckLink', data.players[6][index].deckLink)
                    })
                    interfaceStore.interfaceState.push('top64')
                }

                await tournamentStore.setTournamentType(data.tournamentType)
                await tournamentStore.setLocation(data.location)
                await tournamentStore.setDate(`${data.datetimes.year}-${data.datetimes.month}-${data.datetimes.day}`)
                await tournamentStore.setTotalParticipants(data.totalParticipants)

                setFetching(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        }
        interfaceStore.interfaceState = []

        fetchInformations()

    }, [])

    const handleDataFetch = async (newInputValue) => {
        setCityOptions([])
        setCityFetching(true)

        const data = await fetch(`https://cityserver.onrender.com/?searchValue=${newInputValue}`)

        console.log(cityOptions)

        const cityData = await data.json()

        return cityData
    }

    const handleCitySearch = async (newInputValue) => {
        console.log("🚀 ~ file: page.jsx:82 ~ handleCitySearch ~ newInputValue:", newInputValue)
        setCityOptions([])

        const cityData = await handleDataFetch(newInputValue)

        if (newInputValue.length === 0) {
            setCityOptions(citys)
            console.log("🚀 ~ file: page.jsx:89 ~ handleCitySearch ~ citys:", citys)
            setCityFetching(false)
            return
        }
        await setCityOptions(cityData.geonames)
        console.log("🚀 ~ file: page.jsx:93 ~ handleCitySearch ~ cityData.geonames:", cityData.geonames)
        setCityFetching(false)
    }

    const checkForEmptyFields = () => {
        console.log(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1], 'asddddddddddddddddddd')
        if (tournamentStore.isAnyFieldEmpty(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])) {
            handleOpen()
            return
        } else {
            interfaceStore.deleteLastItem()
        }
    }


    const handleRowDelete = () => {
        tournamentStore.resetArray(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])
        interfaceStore.deleteLastItem()
        handleClose()
    }

    const userInformations = {
        "username": username,
        "id": id,
        "role": role
    }

    const handleUpdate = async (id) => {
        console.log(userInformations)
        console.log("🚀 ~ file: page.jsx:210 ~ handleUpdate ~ params.id[0]:", params.id[0])
        await tournamentStore.sendUpdate(params.id[0], userInformations)

    }

    if (fetching) return (
        <OuterWindowWrapper >
            <CircularProgress variant='outlined' sx={{ alignSelf: 'center', marginBlock: 'auto' }} />
        </OuterWindowWrapper>
    )
    else return (
        <OuterWindowWrapper>
            <Typography level='h3' component='h3'>Edit A Tournament</Typography>

            <Grid container className={styles.container} gap={2}>
                <Grid item lg={2.9} xs={12}>
                    <Sheet className={styles.itemContainer} variant="soft" color="primary">
                        <Typography className={styles.heading} level="body-xs">Tournament Type</Typography>
                        <Select onChange={(event, newValue) => handleTournamentTypeChange(newValue)}
                            variant='outlined'
                            color="primary"
                            placeholder='Choose a tournament type'
                            value={tournamentStore.tournamentType}>
                            <Option value='other'>Other</Option>
                            <Option value='national'>National</Option>
                            <Option value='regional'>Regional</Option>
                        </Select>
                    </Sheet>
                </Grid>

                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Location</Typography>

                        {/* 
                        Depending on which value is selected in the the tournament type select, we render either:
                            - Autocomplete with country data
                            - Autocomplete with city data
                        */}

                        {tournamentStore?.tournamentType === 'national' || tournamentStore?.tournamentType === 'other' ?
                            <Autocomplete
                                color="primary"
                                id="country-select-demo"
                                placeholder="Choose a country"
                                value={tournamentStore.location} // Set value prop
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        tournamentStore.setLocation(newValue.label);
                                        tournamentStore.setLocationLabel(newValue.code);
                                    } else {
                                        // Handle the case when newValue is null (clearing the selection)
                                        tournamentStore.setLocation('');
                                        tournamentStore.setLocationLabel('');
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        autoComplete: 'new-password',
                                    },
                                }}
                                sx={{ width: '100%' }}
                                options={countries}
                                renderOption={(props, option) => (
                                    <AutocompleteOption {...props}>
                                        <ListItemDecorator>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                alt=""
                                            />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ fontSize: 'sm' }}>
                                            {option.label}
                                        </ListItemContent>
                                    </AutocompleteOption>
                                )}
                            /> :
                            <Autocomplete
                                endDecorator={fetching ? <CircularProgress
                                    color="primary"
                                    determinate={false}
                                    size="sm"
                                    value={10}
                                    variant="outlined"
                                /> :
                                    null}
                                value={tournamentStore.location}
                                color="primary"
                                id="country-select-demo"
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        tournamentStore.setLocation(newValue.name);
                                        tournamentStore.setLocationLabel(newValue.countryCode);
                                    } else {
                                        // Handle the case when newValue is null (clearing the selection)
                                        tournamentStore.setLocation('');
                                        tournamentStore.setLocationLabel('');
                                    }
                                }}
                                onInputChange={(event, newInputValue) => {
                                    console.log("Event:", event);
                                    console.log("New Value:", newInputValue);
                                    handleCitySearch(newInputValue);
                                }}
                                placeholder="Choose a city"
                                slotProps={{
                                    input: {
                                        autoComplete: 'new-password',
                                    },
                                }}
                                sx={{ width: '100%' }}
                                options={cityOptions}




                                renderOption={(props, option) => (

                                    // TODO: Some of the menu options stay on top on the menu, even if the searching value is not equal to them

                                    <AutocompleteOption {...props}>
                                        <ListItemDecorator>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={option?.countryCode ? `https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png` : null}
                                                srcSet={option?.countryCode ? `https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x` : null}
                                                alt=""
                                            />
                                        </ListItemDecorator>
                                        <ListItemContent sx={{ fontSize: 'sm' }}>
                                            {option.name || option}
                                        </ListItemContent>
                                    </AutocompleteOption>
                                )}
                            />}
                    </Sheet>
                </Grid>

                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Tournament Date</Typography>
                        <Input
                            type="date"
                            variant="outlined"
                            color="primary"
                            defaultValue={tournamentStore.date}
                            onChange={(event, newValue) => {
                                const e = event.target.value
                                console.log("🚀 ~ file: page.jsx:375 ~ TournamentEdit ~ newValue:", e)
                                tournamentStore.setDate(e);
                                console.log(tournamentStore.date);
                                console.log("🚀 ~ file: page.jsx:378 ~ TournamentEdit ~ tournamentStore.date:", tournamentStore.date)
                            }}
                            slotProps={{
                                input: {
                                    min: '2021-01-01',  // Adjust the minimum year as needed
                                    max: '2023-12-31',  // Adjust the maximum year as needed
                                },
                            }}
                        />
                    </Sheet>
                </Grid>


                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Total Participants</Typography>
                        <Input

                            type="number"
                            color="primary"
                            value={tournamentStore.totalParticipants}
                            onChange={(event) => {
                                tournamentStore.setTotalParticipants(event.target.value)
                            }}
                            slotProps={{
                                input: {
                                    ref: inputRef,
                                    min: 0,
                                    max: 10000,
                                    step: 1,
                                },
                            }}
                        />
                    </Sheet>
                </Grid>
            </Grid>
            <Typography component='h3' level="h3">Edit tournament tree</Typography>
            <Divider />
            <Sheet className={styles.treeContainer} variant="outlined" color="primary">

                {interfaceStore.interfaceState.length > 0 ?
                    interfaceStore.interfaceState.map((item, index) => {

                        let variableName = ''
                        let title = ''
                        let treeRow = []
                        let xs = 0
                        let md = 0
                        let sm = 0
                        let lg = 0

                        console.log(tournamentStore.firstPlace)

                        switch (index) {

                            case 0:
                                variableName = 'firstPlace';
                                title = 'Tournament Winner'
                                treeRow = tournamentStore.firstPlace
                                lg = 6
                                md = 6
                                sm = 6
                                xs = 8
                                break;
                            case 1:
                                variableName = 'secondPlace';
                                title = 'Second Place'
                                treeRow = tournamentStore.secondPlace
                                lg = 6
                                md = 10
                                sm = 6
                                xs = 8
                                break;
                            case 2:
                                variableName = 'top4';
                                title = 'Top 4'
                                treeRow = tournamentStore.top4
                                lg = 5.93
                                md = 5
                                sm = 5
                                xs = 4
                                break;
                            case 3:
                                title = 'Top 8'
                                variableName = 'top8';
                                treeRow = tournamentStore.top8
                                lg = 2.88
                                md = 2.5
                                sm = 5
                                xs = 4
                                break;
                            case 4:
                                title = 'Top 16'
                                variableName = 'top16';
                                treeRow = tournamentStore.top16
                                lg = 1.375
                                md = 1.25
                                sm = 5
                                xs = 4
                                break;
                            case 5:
                                title = 'Top 32'
                                variableName = 'top32';
                                treeRow = tournamentStore.top32
                                lg = 1.375
                                md = 1.25
                                sm = 5
                                xs = 4
                                break;
                            case 6:
                                title = 'Top 64'
                                variableName = 'top64';
                                treeRow = tournamentStore.top64
                                lg = 1.375
                                md = 1.25
                                sm = 5
                                xs = 4
                                break;
                        }

                        return (
                            <InterfaceTreeRow
                                key={index}
                                interfaceIndex={index}
                                variableName={variableName}
                                title={title}
                                treeRow={treeRow}
                                lg={lg}
                                md={md}
                                sm={sm}
                                xs={xs} />
                        )
                    })
                    :
                    <Alert color="primary" variant="soft">Currently are now tournament rows provided.</Alert>}

            </Sheet>
            <div className={styles.buttonRow}>
                <div className={styles.buttonControls}>

                    {/* Button to delete delete the last row in the interfaceStore */}

                    <Button
                        sx={{
                            marginRight: '5px'
                        }}

                        disabled={interfaceStore.interfaceState.length === 0 ? true : false || fetching}
                        onClick={checkForEmptyFields}
                        startDecorator={<BiTrash />}
                        size="sm"
                        variant="outlined">
                        Delete Row
                    </Button>

                    {/* Button to add a new row in the interfaceStore */}

                    <Button
                        disabled={interfaceStore.interfaceState.length === 7 ? true : false || fetching}
                        onClick={interfaceStore.addTournamentRow}
                        startDecorator={<BiPlus />}
                        size="sm"
                        variant="outlined">
                        Add Row
                    </Button>
                </div>
                <div>

                    <TournamentDelete role={role} />

                    {fetching ?
                        <Button
                            sx={{
                                minWidth: '100px'
                            }}
                            loading
                            loadingPosition="start"
                            startDecorator={<CircularProgress size="sm" />}
                            variant="solid"
                        >
                            Updating Tournament...
                        </Button> :
                        <Button
                            sx={{
                                minWidth: '100px'
                            }}
                            onClick={() => handleUpdate(params.id[0])}
                            startDecorator={<BiSend />}>
                            Update Tournament
                        </Button>}
                </div>
            </div>


            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
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
                        Delete Changes?
                    </Typography>
                    <Divider />
                    <Typography id="modal-desc" textColor="text.tertiary">
                        You are about to delete some changes you have made. Do you want to proceed?
                    </Typography>
                    <div className={styles.modalButtonControl}>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outlined">Decline</Button>
                        <Button onClick={() => handleRowDelete()}>Delete Changes</Button>
                    </div>
                </Sheet>
            </Modal>
        </OuterWindowWrapper >



    )
}
