'use client'

import OuterWindowWrapper from '@/app/components/OuterWindowWrapper';
import React, { useEffect, useState } from 'react'

import { Grid, Sheet, Typography, Select, Option, Input, Autocomplete, AutocompleteOption, ListItemDecorator, ListItemContent, CircularProgress, Divider, Button, Alert, Modal, ModalDialog, ModalClose } from "@mui/joy";

import { useTournamentStore } from '../tournamentStore';
import { useInterfaceStore } from '../tournamentStore';

import styles from '../interface.module.css'

import { countries } from "../data/countries";
import { citys } from "../data/citys";

export default function TournamentEdit({ params }) {

    const tournamentStore = useTournamentStore(state => state)
    const interfaceStore = useInterfaceStore(state => state)


    const [fetching, setFetching] = useState(false)

    const [cityOptions, setCityOptions] = useState(citys)

    const handleTournamentTypeChange = (newValue) => {
        tournamentStore.setTournamentType(newValue)
    }


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


    return (
        <OuterWindowWrapper>
            <Typography level='h2' component='h2'>Interface</Typography>

            <Typography level='h3' component='h3'>Edit A Tournament</Typography>

            <Grid container className={styles.container} gap={2}>

                <Grid item lg={2.9} xs={12}>
                    <Sheet className={styles.itemContainer} variant="soft" color="primary">
                        <Typography className={styles.heading} level="body-xs">Tournament Type</Typography>
                        <Select onChange={(event, newValue) => handleTournamentTypeChange(newValue)}
                            variant='outlined'
                            color="primary"
                            placeholder='Choose a tournament type'
                            defaultValue={tournamentStore.tournamentType}>
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

                        {tournamentStore.tournamentType === 'national' || tournamentStore.tournamentType === 'other' ?
                            <Autocomplete

                                color="primary"
                                id="country-select-demo"
                                placeholder="Choose a country"

                                onChange={(event, newValue) => {
                                    tournamentStore.setLocation(newValue.label)
                                    tournamentStore.setLocationLabel(newValue.code)
                                    console.log(tournamentStore.locationLabel)
                                }}
                                slotProps={{
                                    input: {
                                        autoComplete: 'new-password',
                                    },
                                }}
                                co
                                sx={{ width: '100%' }}
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                value={tournamentStore.location}
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
            </Grid>
        </OuterWindowWrapper>
    )
}
