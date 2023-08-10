import TableMUI from "@/app/components/TableMUI";
import TournamentStats from "../../components/TournamentStats"
import Chart from '../../components/Chart'
import styles from './id.module.css'
import OuterWindowWrapper from "@/app/components/OuterWindowWrapper";

export default async function SingleTournamentOverview({ params }) {
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

    let isServerReady = false

    const fetchTournamentBreakdown = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tournament-breakdown`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: params.id
                })
            });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json()

            isServerReady = true

            return data
        } catch (error) {
            console.log(error)
        }
    };

    const informations = await fetchInformations()

    const breakdown = await fetchTournamentBreakdown()

    return (
        <>
            <OuterWindowWrapper>
                <h2>Tournament Overview</h2>
                <section>
                    <article>
                        <h3>Informations</h3>
                        <div className={styles.statsWrapper}>
                            <TournamentStats title={'Location'} data={informations?.location} />
                            <TournamentStats title={'Date'} data={informations?.datetimes.UIDate} />
                            <TournamentStats title={'Tournament Winner'} data={informations.players[0][0].name} />
                            <TournamentStats title={'Total Participants'} data={informations?.totalParticipants} />
                        </div>
                    </article>
                </section>

                <section>
                    <article className={styles.chartTableContainer}>
                        <div className={styles.chartContainer}>
                            {isServerReady && breakdown.length === 3 ? <Chart data={breakdown} /> : null}
                        </div>
                        <div className={styles.tableContainer}>
                            <TableMUI data={breakdown} />
                        </div>
                    </article>

                </section>

                <section>
                    <h3>Tournament Tree</h3>
                </section>
            </OuterWindowWrapper>
        </>
    )
}