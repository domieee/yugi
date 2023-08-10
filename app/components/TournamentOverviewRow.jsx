import { Typography } from "@mui/joy"
import Link from "next/link"

export default function TournamentOverviewRow({ data }) {
    return (
        <Link key={data._id} href={`/tournaments/${data._id}`}>
            <Typography level='body-sm' component='p'>{data.players[0][0].name.length > 0 ? data.players[0][0].name.length : 'N/A'}</Typography>
            <Typography level='body-sm' component='p'>{data.location.length > 0 ? data.location : 'N/A'}</Typography>
            <Typography level='body-sm' component='p'>{data.totalParticipants > 0 ? data.totalParticipants : 'N/A'}</Typography>

        </Link>
    )
}