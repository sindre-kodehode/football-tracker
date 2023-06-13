//******************************************************************************
// imports
//******************************************************************************
import Link         from "next/link";
import getLeagues   from "@/lib/getLeagues";
import deleteLeague from "@/lib/deleteLeague";


//******************************************************************************
// LeagueList
//******************************************************************************
const LeagueList = async () => {
  const leagues = await getLeagues();

  return <>
    { leagues?.map( ({ id, name }) =>
      <form action={ deleteLeague }>
        <input type="hidden" name="id" value={ id } />
        <input type="submit" value="delete" />
        <Link key={ id } href={ `/leagues/${ id }` }>{ name }</Link>
      </form>
    )}
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default LeagueList;
