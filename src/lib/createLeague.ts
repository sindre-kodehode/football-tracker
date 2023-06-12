//******************************************************************************
// imports
//******************************************************************************
import { League } from "@prisma/client";


//******************************************************************************
// types
//******************************************************************************
type Result = {
  success : boolean       ,
  data    : League | null ,
  error   : string | null ,
}


//******************************************************************************
// createLeague
//******************************************************************************
const createLeague = async ( name : string ) : Promise< League | null > => {
  const url = process.env.NODE_ENV === "production"
    ? "https://football-tracker.vercel.app/api/leagues/"
    : "http://localhost:3000/api/leagues/"

  const opts : RequestInit = {
    method : "POST"                   ,
    body   : JSON.stringify({ name }) ,
  };

  const response : Response = await fetch( url, opts );
  const result   : Result   = await response.json();

  return result.data;
}


//******************************************************************************
// exports
//******************************************************************************
export default createLeague;
