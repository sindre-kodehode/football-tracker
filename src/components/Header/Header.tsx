//******************************************************************************
// imports
//******************************************************************************
import getLeagues from "@/lib/getLeagues";
import styles     from "./Header.module.css";


//******************************************************************************
// Header
//******************************************************************************
const Header = async () => {
  const leagues = await getLeagues();

  return <header className={ styles.header }>
    <h1> Football Tracker </h1>

    <nav className={ styles.nav }>
      { leagues.map( ({ id, name }) =>
        <a key={ id } href={ `./leagues/${ id }` }>{ name }</a>
      )}
    </nav>

  </header>
}


//******************************************************************************
// exports
//******************************************************************************
export default Header;
