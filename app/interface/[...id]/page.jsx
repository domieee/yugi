import React from 'react'

export default async function TournamentEdit({ params }) {
    console.log("🚀 ~ file: page.jsx:4 ~ TournamentEdit ~ params:", params)

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
                    id: params.id
                })
            })

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();

            return data
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    const data = await fetchInformations()
    console.log("🚀 ~ file: page.jsx:33 ~ TournamentEdit ~ data:", data)

    return (
        <div>{data._id}</div>
    )
}
