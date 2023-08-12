import { Grid, Sheet, Typography } from "@mui/joy";
import OuterWindowWrapper from "../components/OuterWindowWrapper";
import TableMUI from "../components/TableMUI";
import Chart from "../components/Chart";

import styles from './statistics.module.css'

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
            <Typography level='h3' component='h3'>Overall Breakdown</Typography>

            <Grid container gap={2}>
                <Grid xs={12} lg={4} item>
                    <Sheet sx={{ height: '100%', borderRadius: '5px' }} variant="outlined" color="primary">
                        <div className={styles.chartContainer} >
                            <div className={styles.chartWrapper}>
                                <Chart data={overallBreakdown} />
                            </div>
                        </div>
                    </Sheet>
                </Grid>

                <Grid sx={{ width: '100%' }} xs={12} lg={7.8} item>
                    <TableMUI data={overallBreakdown} />
                </Grid>
            </Grid>
            <Typography level='h3' component='h3'>Winner Breakdown</Typography>
            <Grid container gap={2}>
                <Grid sx={{ width: '100%' }} xs={12} lg={7.8} item>
                    <TableMUI data={winnerBreakdown} />
                </Grid>

                <Grid xs={6} lg={4} item>
                    <Sheet sx={{ height: '100%', borderRadius: '5px' }} variant="outlined" color="primary" >
                        <div className={styles.chartContainer}>
                            <div className={styles.chartWrapper}>
                                <Chart data={winnerBreakdown} />
                            </div>
                        </div>
                    </Sheet>
                </Grid>
            </Grid>

        </OuterWindowWrapper>
    )
}