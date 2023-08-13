import { Typography } from '@mui/joy'
import Navigation from './components/Navigation'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div style={{ width: '460px', height: '460px', opacity: '0.2', position: 'fixed' }}>
        <Image
          src="/blobanimation(1).svg"
          width={1000}
          height={1000}
          alt="Picture of the author"
        />
      </div>
      <section>

        <article>
          <Typography component='h1' level='h1'>Empowering Duelists with In-Depth Yu-Gi-Oh! Tournament Insights</Typography>
          <Typography component='p' level='body-md'>Elevate your dueling prowess with comprehensive Yu-Gi-Oh! tournament insights. Discover winning strategies, top decks, and evolving metas. Step into the competitive arena armed with knowledge. Welcome to your dueling advantage.</Typography>

        </article>
      </section>

      <section>
        <article>
          <Typography component='h2' level='h2'>Already curious what comes next? Watch Upcoming Tournaments</Typography>
          <Typography component='p' level='body-md'>Stay ahead of the game by keeping an eye on the exciting tournaments on the horizon. Prepare your decks and strategies for these upcoming challenges.</Typography>
        </article>
      </section>

      <section>
        <article>
          <Typography component='h2' level='h2'>Have you heard the latest? Watch Recent Tournaments</Typography>
          <Typography component='p' level='body-md'>Relive the epic duels and remarkable moments from past tournaments. Explore the strategies that led to victory and the decks that dominated the competition. Learn from the history of dueling excellence and use it to shape your future triumphs.</Typography>
        </article>
      </section>
    </>
  )
}
