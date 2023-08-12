import Link from "next/link";
import OuterWindowWrapper from "../components/OuterWindowWrapper";
import TournamentOverviewRow from "../components/TournamentOverviewRow";
import { Typography } from "@mui/joy";


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
            <OuterWindowWrapper>
                <section style={{

                }}>

                    <Typography level="h2" component='h2' >Tournament List</Typography>

                    <article style={{
                        marginTop: '10px'
                    }}>
                        {data?.map((tournament, index) => (
                            <TournamentOverviewRow key={index} data={tournament} />
                        ))}
                    </article>
                </section>
            </OuterWindowWrapper >
        </>
    );
}


