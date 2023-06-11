//******************************************************************************
// imports
//******************************************************************************
import { League } from "@prisma/client"


//******************************************************************************
// getLeague
//******************************************************************************
const getLeague = async ( id : string ) : Promise< League > => {
  const url = `https://football-tracker.vercel.app/api/leagues/${ id }`;

  const response : Response = await fetch( url );
  const leagues  : League   = await response.json();

  return leagues;
}


//******************************************************************************
// exports
//******************************************************************************
export default getLeague;
