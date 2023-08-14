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
        location: '',
        totalParticipants: 0,
        date: '2023-07-07',
        firstPlace: [
            { name: 'sdasds', deck: 'sdasds', deckNote: 'sdasds', deckLink: 'sdasds' }
        ],
        secondPlace: [
            { name: 'sdasds', deck: 'sdasds', deckNote: 'sdasds', deckLink: 'sdasds' }
        ],
        top4: [
            { name: 'sdasds', deck: 'sdasds', deckNote: 'sdasds', deckLink: 'sdasds' },
            { name: 'sdasds', deck: 'sdasds', deckNote: 'sdasds', deckLink: 'sdasds' },
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
                newArray[index][fieldName] = value;
                return { [arrayName]: newArray };
            });
        },

        setTournamentType: (tournamentType) => {
            set({ tournamentType });
        },
        setLocation: (location) => {
            set({ location });
        },
        setTotalParticipants: (totalParticipants) => {
            set({ totalParticipants });
        },
        setDate: (date) => {
            date = dayjs(date)
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
            updateProgress(10)
            const token = Cookies.get('token')
            const interfaceState = useInterfaceStore.getState().interfaceState;
            const objects = [];

            interfaceState.forEach((state) => {
                const objectArray = useTournamentStore[state];

                if (objectArray) {
                    objects.push(objectArray);
                }
            });
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}fetch-new-tournament`,
                {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": '*',
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        "tournamentType": useTournamentStore.tournamentType,
                        "location": useTournamentStore.location,
                        "totalParticipants": useTournamentStore.totalParticipants,
                        "date": useTournamentStore.date,
                        "players": objects,
                        "token": token
                    })
                },
            )
            if (res.ok) {

                const json = await res.json();
                console.log("🚀 ~ file: tournamentStore.js:185 ~ fetchObjectsFromInterfaceState: ~ res:", res)
                console.log(json)
                return json
            } else {
                return false
            }
            return objects;
        },
    })
)   