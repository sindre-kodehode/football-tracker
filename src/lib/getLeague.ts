//******************************************************************************
// imports
//******************************************************************************
import { League } from "@prisma/client"


//******************************************************************************
// types
//******************************************************************************
type Result = {
  success : boolean       ,
  data    : League | null ,
  error   : string | null ,
}


//******************************************************************************
// getLeague
//******************************************************************************
const getLeague = async ( id : string ) : Promise< League | null > => {
  const url = process.env.NODE_ENV === "production"
    ? `https://football-tracker.vercel.app/api/leagues/${ id }`
    : `http://localhost:3000/api/leagues/${ id }`

  const response : Response = await fetch( url );
  const result   : Result   = await response.json();

  return result.data;
}


//******************************************************************************
// exports
//******************************************************************************
export default getLeague;
