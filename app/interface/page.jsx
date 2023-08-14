'use client'

import { Grid, Sheet, Typography, Select, Option, Input, Autocomplete, AutocompleteOption, ListItemDecorator, ListItemContent, CircularProgress } from "@mui/joy";
import OuterWindowWrapper from "../components/OuterWindowWrapper";

import styles from './interface.module.css'
import { useRef, useState } from "react";

import { countries } from "./data/countries";
import { citys } from "./data/citys";

import { useTournamentStore } from "./tournamentStore";
import { MdKey } from "react-icons/md";

export default function Interface() {

    const tournamentStore = useTournamentStore(state => state)

    console.log(countries)

    const inputRef = useRef(null)

    const [cityOptions, setCityOptions] = useState(citys)

    const [fetching, setFetching] = useState(false)

    const handleTournamentTypeChange = (newValue) => {
        console.log(newValue)
        tournamentStore.setTournamentType(newValue)
    }

    const handleCitySearch = async (newInputValue) => {
        setFetching(true)
        setCityOptions([])
        const data = await fetch(`https://cityserver.onrender.com/?searchValue=${newInputValue}`)

        console.log(cityOptions)

        const cityData = await data.json()
        console.log("🚀 ~ file: page.jsx:40 ~ handleCitySearch ~ cityData:", cityData)

        if (newInputValue.length === 0) {
            setCityOptions(citys)
        } else {
            setCityOptions(cityData.geonames)
        }
        setFetching(false)
    }


    return (
        <OuterWindowWrapper>
            <Typography level='h2' component='h2'>Interface</Typography>
            <Typography level='h3' component='h3'>Create new Tournament</Typography>

            <Grid container className={styles.container} gap={2}>
                <Grid item lg={2.9} xs={12}>
                    <Sheet className={styles.itemContainer} variant="soft" color="primary">
                        <Typography className={styles.heading} level="body-xs">Tournament Type</Typography>
                        <Select onChange={(event, newValue) => handleTournamentTypeChange(newValue)}
                            size="sm" variant='outlined'
                            color="primary"
                            placeholder='Choose a tournament type'
                            defaultValue='national'>
                            <Option value='national'>National</Option>
                            <Option value='regional'>Regional</Option>
                        </Select>
                    </Sheet>
                </Grid>
                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Location</Typography>
                        {tournamentStore.tournamentType === 'national' ?
                            <Autocomplete
                                size="sm"
                                color="primary"
                                id="country-select-demo"
                                placeholder="Choose a country"
                                slotProps={{
                                    input: {
                                        autoComplete: 'new-password', // disable autocomplete and autofill
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
                                size="sm"
                                color="primary"
                                id="country-select-demo"
                                onChange={(event, newValue) => newValue?.name ? tournamentStore.setLocation(newValue.name) : tournamentStore.setLocation('')}
                                onInputChange={(event, newInputValue) => handleCitySearch(newInputValue)}
                                placeholder="Choose a city"
                                slotProps={{
                                    input: {
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    },
                                }}
                                sx={{ width: '100%' }}
                                options={cityOptions} // Use the state variable to set options
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <AutocompleteOption {...props}>
                                        <ListItemDecorator>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
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
                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Tournament Date</Typography>
                        <Input
                            size="sm"
                            type="date"
                            variant="outlined"
                            color="primary"
                            slotProps={{
                                input: {
                                    min: '2018-06-07T00:00',
                                    max: '2018-06-14T00:00',
                                },
                            }}
                        />
                    </Sheet>
                </Grid>
                <Grid item lg={2.9} xs={12}>
                    <Sheet variant="soft" className={styles.itemContainer} color="primary">
                        <Typography className={styles.heading} level="body-xs">Total Participants</Typography>
                        <Input
                            size="sm"
                            type="number"
                            color="primary"
                            defaultValue={1}
                            slotProps={{
                                input: {
                                    ref: inputRef,
                                    min: 1,
                                    max: 10000,
                                    step: 1,
                                },
                            }}
                        />
                    </Sheet>
                </Grid>
            </Grid>

        </OuterWindowWrapper >
    )
}