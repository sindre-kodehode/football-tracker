//******************************************************************************
// imports
//******************************************************************************
import styles             from "./page.module.css";
import { getLeague      } from "@/lib/league";
import { createTeam     } from "@/lib/team";
import { deleteTeam     } from "@/lib/team";
import { getLeagueTeams } from "@/lib/team";
import Teams              from "@/components/Teams";


//******************************************************************************
// types
//******************************************************************************
type LeaguePageProps = { params : { id : string } };


//******************************************************************************
// LeaguePage
//******************************************************************************
const LeaguePage = async ( { params : { id } } : LeaguePageProps ) => {
  const league = await getLeague( id );
  const teams  = await getLeagueTeams( id );

  return <main className={ styles.main }>
    <h2>{ league?.name || "" }</h2>

    <Teams
      leagueId={ league?.id }
      createTeam={ createTeam }
      deleteTeam={ deleteTeam }
      teamsData={ teams }
    />

  </main>
};


//******************************************************************************
// exports
//******************************************************************************
export default LeaguePage;
