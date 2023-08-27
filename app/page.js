import { Typography, Skeleton } from '@mui/joy'
import Navigation from './components/Navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic';


import styles from './home.module.css'
import Link from 'next/link';

export default async function Home() {

  const fetchLastPlayedTournaments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/last-played-tournaments`, { next: { revalidate: 30 } });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log('Fetched data:', data);
      return data; document
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const fetchUpcomingTournaments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upcoming-tournaments`, { next: { revalidate: 30 } });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log('Fetched data:', data);
      return data; document
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const lastPlayedTournaments = await fetchLastPlayedTournaments()
  const upcomingTournaments = await fetchUpcomingTournaments()

  const LastPlayedTournaments = dynamic(() => import('./components/LastPlayedTournaments'), {
    loading: () => (
      <Skeleton
        variant="rectangular"
        sx={{
          opacity: '0.3',
        }}
        maxWidth={270.5}
        height={100}
        borderRadius={5}
      />
    ),
    ssr: true,
  });

  const UpcomingTournaments = dynamic(() => import('./components/UpcomingTournaments'), {
    loading: () => (
      <Skeleton
        animation='wave'
        variant="rectangular"
        opacity={0.1}

        height={100}
        borderRadius={5}
      />
    ),
    ssr: true,
  });


  return (
    <>
      <section className={styles.landingPage}>

        <div className={styles.linkRow}>
          <Link href='/tournaments'>
            <div className={`${styles.lpaLink} ${styles.tournamentLink}`}>
              <div className={styles.lpaLinkShader}>
                <Typography level='title-lg'>Tournaments</Typography>
              </div>
            </div>
          </Link>
          <Link href='/statistics'>
            <div className={`${styles.lpaLink} ${styles.statisticLink}`}>
              <div className={styles.lpaLinkShader}>
                <Typography level='title-lg'>Statistics</Typography>
              </div>
            </div>
          </Link>
        </div>
        <article>
          <Typography component='h1' level='h1'>Empowering Duelists with In-Depth Yu-Gi-Oh! Tournament Insights</Typography>
          <Typography component='p' level='body-md'>Elevate your dueling prowess with comprehensive Yu-Gi-Oh! tournament insights. Discover winning strategies, top decks, and evolving metas. Step into the competitive arena armed with knowledge. Welcome to your dueling advantage.</Typography>
        </article>
      </section>


      <section className={styles.landingPage}>
        <article>
          <Typography component='h2' level='h3'>Recent Tournaments</Typography>
        </article>
        <div className={styles.lastPlayedTournaments}>
          <LastPlayedTournaments tournament={lastPlayedTournaments[0]} />
          <LastPlayedTournaments tournament={lastPlayedTournaments[1]} />
          <LastPlayedTournaments tournament={lastPlayedTournaments[2]} />
          <LastPlayedTournaments tournament={lastPlayedTournaments[3]} />
          <LastPlayedTournaments tournament={lastPlayedTournaments[4]} />
        </div>
      </section>

      <section className={styles.landingPage}>
        <article>
          <Typography component='h2' level='h3'>Upcoming Tournaments</Typography>
        </article>
        <div className={styles.upcomingTournaments}>
          <UpcomingTournaments data={upcomingTournaments} />
        </div>
      </section>

    </>
  )
}
