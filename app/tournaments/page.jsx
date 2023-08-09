import Link from "next/link";


export default async function Tournaments() {
    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`, { next: { revalidate: 30 } });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const data = await fetchData()

    return (

        <>
            <section>
                {data?.map((tournament) => (
                    <Link key={tournament._id} href={`/tournaments/${tournament._id}`}>
                        <p>{tournament.location.length === 0 ? 'No location provided' : tournament.location}</p>
                        <p>{tournament.totalParticipants}</p>
                    </Link>
                ))}
            </section>
        </>
    );
}


