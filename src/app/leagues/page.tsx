//******************************************************************************
// imports
//******************************************************************************
import styles       from "./page.module.css";
import AddNewLeague from "@/components/AddNewLeague";
import LeagueList   from "@/components/LeaguesList";


//******************************************************************************
// LeaguesPage
//******************************************************************************
const LeaguesPage = () =>
  <main className={ styles.main }>
    <LeagueList />
    <AddNewLeague />
  </main>


//******************************************************************************
// exports
//******************************************************************************
export default LeaguesPage;
