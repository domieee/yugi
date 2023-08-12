import { Typography } from "@mui/joy"
import Link from "next/link"
import { GiTrophy, GiTabletopPlayers, GiPlanetConquest, GiCalendar, GiFamilyTree, GiStack } from "react-icons/gi";
import styles from './TournamentOverviewRow.module.css'


export default function TournamentOverviewRow({ data }) {
    return (
        <Link className="overviewRowContainer" key={data._id} href={`/tournaments/${data._id}`}>
            <div className={styles.row}>
                <div className={styles.container}>
                    <div className={styles.overviewRow}>
                        <div className={styles.overviewInformation}>
                            <GiTrophy className={styles.logo} /> <Typography level='body-md' fontWeight='300' color="text.secondary" component='p'>{data.players[0][0].name.length > 0 ? data.players[0][0].name : 'N/A'}</Typography>
                        </div>
                    </div>
                    <div className={styles.overviewRow}>
                        <div className={styles.overviewInformation}>
                            <GiStack className={styles.logo} /> <Typography level='body-md' fontWeight='300' color="text.secondary" component='p'> {data.players[0][0].deck.length > 0 ? data.players[0][0].deck : 'N/A'}</Typography>
                        </div>
                    </div>
                    <div className={styles.overviewRow}>
                        <div className={styles.overviewInformation}>
                            <GiPlanetConquest className={styles.logo} /> <Typography level='body-md' fontWeight='300' color="text.secondary" component='p'>{data.location.length > 0 ? data.location : 'N/A'}</Typography>
                        </div>
                    </div>
                    <div className={styles.overviewRow}>
                        <div className={styles.overviewInformation}>
                            <GiCalendar className={styles.logo} /> <Typography level='body-md' fontWeight='300' color="text.secondary" component='p'> {data.datetimes.UIDate}</Typography>
                        </div>
                    </div>
                    <div className={styles.overviewRow}>
                        <div className={styles.overviewInformation}>
                            <GiTabletopPlayers className={styles.logo} /> <Typography level='body-md' fontWeight='300' color="text.secondary" component='p'>{data.totalParticipants > 0 ? data.totalParticipants : 'N/A'}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}