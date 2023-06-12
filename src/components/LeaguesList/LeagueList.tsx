//******************************************************************************
// imports
//******************************************************************************
import getLeagues from "@/lib/getLeagues";
import Link       from "next/link";


//******************************************************************************
// Header
//******************************************************************************
const LeagueList = async () => {
  const leagues = await getLeagues();

  return <>
    { leagues?.map( ({ id, name }) =>
      <Link key={ id } href={ `/leagues/${ id }` }>{ name }</Link>
    )}
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default LeagueList;
