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
    const role = useStore((state) => state.role)
    const inputRef = useRef(null)
    const [fetching, setFetching] = useState(false)

    const [cityOptions, setCityOptions] = useState(citys)

    const TournamentDelete = dynamic(() => import('../../components/TournamentDelete'), {
        loading: () => null, // Display a loading message while the component is being loaded
        ssr: true, // This will prevent the component from being SSR'd
    });

    const handleTournamentTypeChange = (newValue) => {
        if (tournamentStore.tournamentType === 'national' || tournamentStore.tournamentTyp === 'other' && newValue === 'regional') {
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
                console.log("🚀 ~ file: page.jsx:47 ~ fetchInformations ~ data:", data)

                await tournamentStore.setTournamentType(data.tournamentType)
                await tournamentStore.setLocation(data.location)
                await tournamentStore.setDate(data.datetimes.UIDate)
                await tournamentStore.setTotalParticipants(data.totalParticipants)
                console.log("🚀 ~ file: page.jsx:51 ~ fetchInformations ~ data.location:", data.location)
                console.log("🚀 ~ file: page.jsx:47 ~ fetchInformations ~ tournamentStore:", tournamentStore.tournamentType)

            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        }

        fetchInformations()
    }, [])

    const handleDataFetch = async (newInputValue) => {
        setCityOptions([])
        setFetching(true)

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
            setFetching(false)
            return
        }
        await setCityOptions(cityData.geonames)
        console.log("🚀 ~ file: page.jsx:93 ~ handleCitySearch ~ cityData.geonames:", cityData.geonames)
        setFetching(false)
    }

    const checkForEmptyFields = () => {
        if (tournamentStore.isAnyFieldEmpty(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])) {
            handleOpen()
            return
        } else {
            interfaceStore.deleteLastItem()
        }
    }
    const handleTournamentFetch = async () => {

        setFetching(true)
        const tournament = await tournamentStore.fetchObjectsFromInterfaceState(tournamentStore)
        console.log("🚀 ~ file: page.jsx:124 ~ handleTournamentFetch ~ tournament:", tournament)

        if (await tournament) {
            console.log(tournament)
            router.push(`/tournaments/${tournament.tournamentId}`)
        }
    }

    const handleRowDelete = () => {
        tournamentStore.resetArray(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])
        interfaceStore.deleteLastItem()
        handleClose()
    }

    return (
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
                            value={tournamentStore.date}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                tournamentStore.setDate(event.target.value);
                                console.log(tournamentStore.date);
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
                            onClick={handleTournamentFetch}
                            startDecorator={<BiSend />}>
                            Update Tournament
                        </Button>}
                </div>
            </div>

        </OuterWindowWrapper >
    )
}
