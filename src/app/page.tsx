import getLeagues from '@/lib/getLeagues';
import styles from './page.module.css'

export default async function Home() {
  const leagues = await getLeagues();

  return (
    <main className={ styles.main }>
      <h1> Hello Football Tracker!! </h1>
      <ul>
      { leagues.map( ({ name }) =>
          <li>{ name }</li>
      )}
      </ul>
    </main>
  )
}
