import { Grid, Typography } from "@mui/joy";
import OuterWindowWrapper from "../components/OuterWindowWrapper";
import TableMUI from "../components/TableMUI";
import Chart from "../components/Chart";

export default async function Statistics() {
    const fetchOverallBreakdown = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/overall-breakdown`);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json()
            console.log("🚀 ~ file: page.jsx:82 ~ fetchTournamentTree ~ data:", data)

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWinnerBreakdown = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/winner-breakdown`);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json()
            console.log("🚀 ~ file: page.jsx:82 ~ fetchTournamentTree ~ data:", data)

            return data
        } catch (error) {
            console.log(error)
        }
    }

    const overallBreakdown = await fetchOverallBreakdown()
    const winnerBreakdown = await fetchWinnerBreakdown()

    console.log(overallBreakdown)
    return (
        <OuterWindowWrapper>
            <Typography level='h2' component='h2'>Statistics</Typography>
            <Grid container >

                <Grid xs={6} item>
                    <Chart data={overallBreakdown} />
                </Grid>

                <Grid xs={6} item>
                    <TableMUI data={overallBreakdown} />
                </Grid>

            </Grid>
            <Grid container >

                <Grid xs={6} item>
                    <TableMUI data={overallBreakdown} />
                </Grid>

                <Grid xs={6} item>
                    <Chart data={overallBreakdown} />
                </Grid>

            </Grid>
        </OuterWindowWrapper>

    )
}