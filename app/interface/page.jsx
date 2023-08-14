'use client'

import { Grid, Sheet, Typography, Select, Option, Input, Autocomplete, AutocompleteOption, ListItemDecorator, ListItemContent, CircularProgress, Divider, Button, Alert, Modal, ModalDialog, ModalClose } from "@mui/joy";
import OuterWindowWrapper from "../components/OuterWindowWrapper";

import styles from './interface.module.css'
import { useRef, useState } from "react";

import { countries } from "./data/countries";
import { citys } from "./data/citys";

import { useTournamentStore, useInterfaceStore } from "./tournamentStore";

import { BiPlus, BiTrash, BiSend } from "react-icons/bi";
import InterfaceTreeRow from "../components/InterfaceTreeRow";


export default function Interface() {

    const tournamentStore = useTournamentStore(state => state)
    const interfaceStore = useInterfaceStore(state => state)

    const [value, setValue] = useState(tournamentStore.tournamentType === 'national' ? countries[0] : citys[0]);

    const inputRef = useRef(null)

    const [cityOptions, setCityOptions] = useState(citys)

    const [fetching, setFetching] = useState(false)

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTournamentTypeChange = (newValue) => {
        tournamentStore.setTournamentType(newValue)
    }

    const handleDataFetch = async (newInputValue) => {
        setCityOptions([])
        setFetching(true)

        const data = await fetch(`https://cityserver.onrender.com/?searchValue=${newInputValue}`)

        console.log(cityOptions)

        const cityData = await data.json()

        return cityData
    }

    const handleCitySearch = async (newInputValue) => {
        setCityOptions([])

        const cityData = await handleDataFetch(newInputValue)

        if (newInputValue.length === 0) {
            setCityOptions(citys)
            setFetching(false)
            return
        }

        setCityOptions(cityData.geonames)
        setFetching(false)
    }

    const handleRowDelete = () => {
        tournamentStore.resetArray(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])
        interfaceStore.deleteLastItem()
        handleClose()
    }

    const checkForEmptyFields = () => {
        if (tournamentStore.isAnyFieldEmpty(interfaceStore.interfaceState[interfaceStore.interfaceState.length - 1])) {
            handleOpen()
            return
        } else {
            interfaceStore.deleteLastItem()
        }
    }


    return (
        <>
            <OuterWindowWrapper>
                <Typography level='h2' component='h2'>Interface</Typography>
                <Divider />
                <Typography level='h3' component='h3'>Create new Tournament</Typography>
                <Divider />
                <Grid container className={styles.container} gap={2}>

                    {/* # Tournament Type Selection */}

                    <Grid item lg={2.9} xs={12}>
                        <Sheet className={styles.itemContainer} variant="soft" color="primary">
                            <Typography className={styles.heading} level="body-xs">Tournament Type</Typography>
                            <Select onChange={(event, newValue) => handleTournamentTypeChange(newValue)}
                                variant='outlined'
                                color="primary"
                                placeholder='Choose a tournament type'
                                defaultValue='national'>
                                <Option value='national'>National</Option>
                                <Option value='regional'>Regional</Option>
                            </Select>
                        </Sheet>
                    </Grid>

                    {/* # Location Selection */}

                    <Grid item lg={2.9} xs={12}>
                        <Sheet variant="soft" className={styles.itemContainer} color="primary">
                            <Typography className={styles.heading} level="body-xs">Location</Typography>

                            {/* Depending on which value is selected in the thze tournament type select, we render either:
                            - Autocomplete with country data
                            - Autocomplete with city data
                        */}

                            {tournamentStore.tournamentType === 'national' ?
                                <Autocomplete

                                    color="primary"
                                    id="country-select-demo"
                                    placeholder="Choose a country"
                                    defaultValue={countries[0]}
                                    onChange={(event, newValue) => {
                                        tournamentStore.setLocation(newValue)
                                        console.log(tournamentStore.location)
                                    }}
                                    slotProps={{
                                        input: {
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                    sx={{ width: '100%' }}
                                    options={countries}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}

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
                                            <ListItemContent
                                                sx={{ fontSize: 'sm' }}>
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

                                    color="primary"
                                    id="country-select-demo"
                                    onChange={(event, newValue) => newValue?.name ? tournamentStore.setLocation(newValue.name) : tournamentStore.setLocation('')}
                                    onInputChange={(event, newInputValue) => handleCitySearch(newInputValue)}
                                    placeholder="Choose a city"
                                    slotProps={{
                                        input: {
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                    sx={{ width: '100%' }}
                                    options={cityOptions}
                                    autoHighlight
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    renderOption={(props, option) => (

                                        // TODO: Some of the menu options stay on top on the menu, even if the searching value is not equal to them

                                        <AutocompleteOption {...props}>
                                            <ListItemDecorator>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={option.countryCode ? `https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png` : null}
                                                    srcSet={option.countryCode ? `https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x` : null}
                                                    alt=""
                                                />
                                            </ListItemDecorator>
                                            <ListItemContent sx={{ fontSize: 'sm' }}>
                                                {option.name}
                                            </ListItemContent>
                                        </AutocompleteOption>
                                    )}
                                />}
                        </Sheet>
                    </Grid>

                    {/* # Date Selection */}

                    <Grid item lg={2.9} xs={12}>
                        <Sheet variant="soft" className={styles.itemContainer} color="primary">
                            <Typography className={styles.heading} level="body-xs">Tournament Date</Typography>
                            <Input

                                type="date"
                                variant="outlined"
                                color="primary"
                                value={tournamentStore.date}
                                onChange={(event) => {
                                    tournamentStore.setDate(event.target.value)
                                    console.log(tournamentStore.date)
                                }}
                                slotProps={{
                                    input: {
                                        min: '2018-06-07T00:00',
                                        max: '2018-06-14T00:00',
                                    },
                                }}
                            />
                        </Sheet>
                    </Grid>

                    {/* # Total Participants Selection */}

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

                {/* Tournament Tree */}

                <Typography component='h3' level="h3">Create tournament tree</Typography>
                <Divider />

                {/* 
            props: 
                - headingText 
            */}

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
                                    index={index}
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
                        <Button
                            disabled={interfaceStore.interfaceState.length === 7 ? true : false}
                            onClick={interfaceStore.addTournamentRow}
                            startDecorator={<BiPlus />}
                            size="sm"
                            variant="outlined">Add Row</Button>
                        <Button
                            disabled={interfaceStore.interfaceState.length === 0 ? true : false}
                            onClick={checkForEmptyFields}
                            startDecorator={<BiTrash />}
                            size="sm"
                            variant="outlined">Delete Row</Button>
                    </div>
                    <Button startDecorator={<BiSend />}>Post new tournament</Button>
                </div>

            </OuterWindowWrapper >

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
        </>
    )
}