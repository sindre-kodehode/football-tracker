//******************************************************************************
// imports
//******************************************************************************
import { League } from "@prisma/client"


//******************************************************************************
// types
//******************************************************************************
type Result = {
  success : boolean         ,
  data    : League[] | null ,
  error   : string   | null ,
}


//******************************************************************************
// getLeague
//******************************************************************************
const getLeagues = async () : Promise< League[] | null > => {
  const url = process.env.NODE_ENV === "production"
    ? "https://football-tracker.vercel.app/api/leagues"
    : "http://localhost:3000/api/leagues"

  const response : Response = await fetch( url );
  const result   : Result   = await response.json();

  return result.data;
}


//******************************************************************************
// exports
//******************************************************************************
export default getLeagues;
