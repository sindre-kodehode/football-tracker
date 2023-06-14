"use client";
//******************************************************************************
// imports
//******************************************************************************
import { League   } from "@prisma/client";
import { useState } from "react";
import AddLeague    from "@/components/AddLeague";
import LeaguesList  from "@/components/LeaguesList";


//******************************************************************************
// types
//******************************************************************************
type LeaguesProps = {
  data         : League[]                                           ,
  deleteLeague : ( id   : string               ) => Promise<League> ,
  createLeague : ( data : Pick<League, "name"> ) => Promise<League> ,
}


//******************************************************************************
// Leagues
//******************************************************************************
const Leagues = ( { data, deleteLeague, createLeague } : LeaguesProps ) => {
  const [ leagues, setLeagues ] = useState< League[] >( data );

  return <>

    <h2> Pick a league </h2>
    <LeaguesList
      deleteLeague={ deleteLeague }
      leagues={ leagues }
      setLeagues={ setLeagues }
    /> 

    <h2> Add a new league </h2>
    <AddLeague
      createLeague={ createLeague }
      setLeagues={ setLeagues }
    />

  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default Leagues;
