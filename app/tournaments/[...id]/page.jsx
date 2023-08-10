import TableMUI from "@/app/components/TableMUI";
import TournamentStats from "../../components/TournamentStats"
import Chart from '../../components/Chart'
import styles from './id.module.css'
import OuterWindowWrapper from "@/app/components/OuterWindowWrapper";
import TournamentTreeRow from "@/app/components/TournamentTreeRow";

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
    }

    const fetchTournamentTree = async () => {



        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/fetch-tournament-tree`, {
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
            console.log("🚀 ~ file: page.jsx:82 ~ fetchTournamentTree ~ data:", data)

            return data
        } catch (error) {
            console.log(error)
        }
    };



    const informations = await fetchInformations()

    const breakdown = await fetchTournamentBreakdown()

    const tournamentTree = await fetchTournamentTree()

    return (
        <>
            <OuterWindowWrapper>
                <h2>Tournament Overview</h2>
                <section>
                    <article>
                        <h3>Informations</h3>
                        <div className={styles.statsWrapper}>
                            <TournamentStats title={'Tournament Winner'} data={informations.players[0][0].name} />
                            <TournamentStats title={'Winning Deck'} data={informations.players[0][0].deck} />
                            <TournamentStats title={'Location'} data={informations?.location} />
                            <TournamentStats title={'Date'} data={informations?.datetimes.UIDate} />
                            <TournamentStats title={'Total Participants'} data={informations?.totalParticipants} />
                        </div>
                    </article>
                </section>

                <section>
                    <article className={styles.chartTableContainer}>
                        <div className={styles.chartWrapper}>
                            <div className={styles.chartContainer}>
                                {isServerReady && breakdown.length === 3 ? <Chart data={breakdown} /> : null}
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <TableMUI data={breakdown} />
                        </div>
                    </article>

                </section>

                <section>
                    <h3>Tournament Tree</h3>
                    {tournamentTree[0]?.length > 0 ? <TournamentTreeRow data={tournamentTree[0]} title={'First Place'} expandedStatus={true} /> : null}
                    {tournamentTree[1]?.length > 0 ? <TournamentTreeRow data={tournamentTree[1]} title={'Second Place'} expandedStatus={true} /> : null}
                    {tournamentTree[2]?.length > 0 ? <TournamentTreeRow data={tournamentTree[2]} title={'Top 4'} expandedStatus={true} /> : null}
                    {tournamentTree[3]?.length > 0 ? <TournamentTreeRow data={tournamentTree[3]} title={'Top 8'} expandedStatus={false} /> : null}
                    {tournamentTree[4]?.length > 0 ? <TournamentTreeRow data={tournamentTree[4]} title={'Top 16'} expandedStatus={false} /> : null}
                    {tournamentTree[5]?.length > 0 ? <TournamentTreeRow data={tournamentTree[5]} title={'Top 32'} expandedStatus={false} /> : null}
                    {tournamentTree[6]?.length > 0 ? <TournamentTreeRow data={tournamentTree[6]} title={'Top 64'} expandedStatus={false} /> : null}
                </section>
            </OuterWindowWrapper>
        </>
    )
}