import { create } from 'zustand'
import { persist } from "zustand/middleware"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

export const useInterfaceStore = create((set) => ({
    interfaceState: ['firstPlace', 'secondPlace', 'top4'],
    exampleArray: [
        'firstPlace',
        'secondPlace',
        'top4',
        'top8',
        'top16',
        'top32',
        'top64'
    ],
    titles: [
        'First Place',
        'Second Place',
        'Top 4',
        'Top 8',
        'Top 16',
        'Top 32',
        'Top 64'
    ],
    addTournamentRow: () => {
        set((state) => ({
            interfaceState: [...state.interfaceState, state.exampleArray[state.interfaceState.length]]
        }));
    },
    deleteLastItem: () => {
        set((state) => {
            if (state.interfaceState.length > 0) {
                const newInterfaceState = state.interfaceState.slice(0, -1);
                return {
                    interfaceState: newInterfaceState
                };
            }
            return state; // No items left to remove, return the unchanged state
        });
    }
}));


export const useTournamentStore = create(
    (set, get) => ({
        tournamentType: 'national',
        location: 'Andorra',
        locationLabel: 'AD',
        totalParticipants: 0,
        date: '',
        firstPlace: [
            { name: '', deck: '', deckNote: '', deckLink: '' }
        ],
        secondPlace: [
            { name: '', deck: '', deckNote: '', deckLink: '' }
        ],
        top4: [
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
        ],
        top8: [
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
        ],
        top16: [
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
        ],
        top32: [
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
        ],
        top64: [
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
            { name: '', deck: '', deckNote: '', deckLink: '' },
        ],
        updateField: (arrayName, index, fieldName, value) => {
            set((state) => {
                const newArray = [...state[arrayName]];
                console.log("🚀 ~ file: tournamentStore.jsx:134 ~ set ~ newArray:", newArray)
                newArray[index][fieldName] = value;  // Fix: index should be used directly
                return { [arrayName]: newArray };
            });
        },

        setTournamentType: (tournamentType) => {
            set({ tournamentType });
        },
        setLocation: (location) => {
            set({ location });
        },
        setLocationLabel: (locationLabel) => {
            set({ locationLabel });
        },
        setTotalParticipants: (totalParticipants) => {
            set({ totalParticipants });
        },
        setDate: (date) => {
            set({ date });
        },
        isAnyFieldEmpty: (arrayName) => {
            const array = get()[arrayName];
            console.log("🚀 ~ file: tournamentStore.js:154 ~ array:", array)

            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                console.log("🚀 ~ file: tournamentStore.js:158 ~ item:", item)
                if (
                    item.name !== '' ||
                    item.deck !== '' ||
                    item.deckNote !== '' ||
                    item.deckLink !== ''
                ) {
                    return true; // At least one field is empty
                }
            }

            return false; // No empty fields found
        },
        resetArray: (arrayName) => {
            set((state) => ({
                [arrayName]: state[arrayName].map((item) => ({
                    name: '',
                    deck: '',
                    deckNote: '',
                    deckLink: ''
                }))
            }));
        },
        fetchObjectsFromInterfaceState: async (useTournamentStore) => {
            const userToken = Cookies.get('userToken')
            const interfaceState = useInterfaceStore.getState().interfaceState;
            const objects = [];

            interfaceState.forEach((state) => {
                const objectArray = useTournamentStore[state];

                if (objectArray) {
                    objects.push(objectArray);
                }
            })


            console.log("🚀 ~ file: tournamentStore.jsx:201 ~ fetchObjectsFromInterfaceState: ~ objects:", objects)

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/fetch-new-tournament`,
                {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": '*',
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        "tournamentType": useTournamentStore.tournamentType,
                        "location": useTournamentStore.location,
                        "locationLabel": useTournamentStore.locationLabel,
                        "totalParticipants": useTournamentStore.totalParticipants,
                        "date": useTournamentStore.date,
                        "players": objects,
                        "token": userToken
                    })
                },
            )
            if (res.ok) {

                const json = await res.json();
                useTournamentStore.tournamentType = ''
                return json
            } else {
                return false
            }
            return objects;
        },
        sendUpdate: async (id, userInformations) => {
            console.log(id)
            const tournamentStore = useTournamentStore.getState()

            console.log("🚀 ~ file: tournamentStore.jsx:232 ~ sendUpdate: ~ tournamentStore:", tournamentStore)

            const interfaceState = await useInterfaceStore.getState().interfaceState;
            console.log("🚀 ~ file: tournamentStore.jsx:238 ~ sendUpdate: ~ interfaceState:", interfaceState)
            let objects = [];


            interfaceState.forEach((state) => {
                if (tournamentStore[state]) {
                    objects.push(tournamentStore[state]);
                    console.log("🚀 ~ file: tournamentStore.jsx:247 ~ interfaceState.forEach ~ objects:", objects)
                }
            })


            console.log("🚀 ~ file: tournamentStore.jsx:248 ~ sendUpdate: ~ objects:", objects)

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-tournament`,
                {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": '*',
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        "id": id,
                        "tournamentType": tournamentStore.tournamentType,
                        "editedBy": userInformations,
                        "location": tournamentStore.location,
                        "locationLabel": tournamentStore.locationLabel,
                        "totalParticipants": tournamentStore.totalParticipants,
                        "date": tournamentStore.date,
                        "players": objects,
                    })
                },
            )
            if (res.ok) {

                const json = await res.json();
                useTournamentStore.tournamentType = ''
                return json
            } else {
                return false
            }
        },
    })
)   