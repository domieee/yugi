import { Typography, Skeleton, CircularProgress, Sheet, Divider } from '@mui/joy'
import Navigation from './components/Navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic';

import styles from './home.module.css'
import Link from 'next/link';
import OuterWindowWrapper from './components/OuterWindowWrapper';
import { MdKeyboardArrowRight } from 'react-icons/md';

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
      <CircularProgress variant="outlined" />
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
  })

  return (
    <>
      <OuterWindowWrapper>
        <section className={styles.landingPage}>
          <Sheet>
            <Typography component='h1' level='h1'><span style={{ background: 'linear-gradient(-30deg, var(--joy-palette-primary-700), var(--joy-palette-primary-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Empowering Duelists</span> with In-Depth Yu-Gi-Oh! Tournament Insights</Typography>
            <Typography component='p' level='body-md'>Elevate your dueling prowess with comprehensive Yu-Gi-Oh! tournament insights with Duelist Meta. Discover winning strategies, top decks, and evolving metas. Step into the competitive arena armed with knowledge. Welcome to your dueling advantage.</Typography>
          </Sheet>
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

        </section>
        <Divider />
        <section className={styles.landingPage}>
          <article>
            <Typography component='h2' level='h3'>Recent Tournaments</Typography>
          </article>
          <div id='lastPlayedContainer' className={styles.lastPlayedTournaments}>
            <LastPlayedTournaments data={lastPlayedTournaments} />

            <Link href='/tournaments'>
              <Sheet className={styles.recentWatchMoreButton} variant='outlined' color='primary'>
                <div className={styles.typo}>
                  <Typography sx={{ color: `var(--joy-palette-neutral-400, #9FA6AD)` }} level='title-md' fontWeight={600}>Watch more Tournaments</Typography>
                  {/* <MdKeyboardArrowRight style={{ height: '25px', width: '25px', color: `var(--joy-palette-neutral-400, #9FA6AD)` }} /> */}
                </div>
              </Sheet>
            </Link>

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
        <Divider />

        <section className={styles.landingPage}>
          <article>
            <Typography component='h2' level='h3'>Now it&apos;s Your Turn: Shape Our Path Forward</Typography>
          </article>
          <Link href='/feedback'>
            <div className={styles.feedbackCtaContainer}>
              <div className={styles.feedbackShader}>
                <Typography variant='h3' level='title-lg'>Provide a Feedback</Typography>
                <Typography>Your role is pivotal in our exploration of Yu-Gi-Oh! tournament statistics. Your experiences will mold our platform. As a user, you grasp your needs best. Your input fuels our mission to deliver impactful data to the Yu-Gi-Oh! community.</Typography>
                <Typography level='title-sm'>Join us - your insights shape our journey.</Typography>
              </div>
            </div>
          </Link>
        </section>
      </OuterWindowWrapper >
    </>
  )
}
