

import { Table, Sheet } from '@mui/joy';

export default function TableMUI({ data }) {

    const decks = data[0]
    const total = data[1]
    const percentages = data[2]


    console.log(data)
    return (
        <Sheet sx={{ border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '5px', height: '100%' }}>
            <Table stickyHeader>
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Deck</th>
                        <th>Total Played</th>
                        <th>Total Played (%)</th>
                    </tr>
                </thead>
                <tbody>

                    {decks.map((deck, index) => (
                        <tr key={index}>
                            <td>{deck.length === 0 ? <i style={{ color: ' rgba(255, 255, 255, 0.6) ' }}>N/A</i> : deck}</td>
                            <td>{total[index].length === 0 ? <i style={{ color: ' rgba(255, 255, 255, 0.6)' }}>N/A</i> : total[index]}</td>
                            <td>{percentages[index].length === 0 ? <i style={{ color: 'rgba(255, 255, 255, 0.6)' }}>N/A</i> : percentages[index]}</td>
                        </tr>
                    ))}

                </tbody>
            </Table >
        </Sheet >
    )
}