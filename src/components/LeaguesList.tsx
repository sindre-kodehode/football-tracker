"use client";
//******************************************************************************
// imports
//******************************************************************************
import { League         } from "@prisma/client";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import Link               from "next/link";


//******************************************************************************
// types
//******************************************************************************
type LeaguesListProps = {
  leagues      : League[]                             ,
  deleteLeague : ( id   : string ) => Promise<League> ,
  setLeagues   : Dispatch<SetStateAction<League[]>>   ,
}


//******************************************************************************
// LeaguesList
//******************************************************************************
const LeaguesList = ({
  leagues      ,
  setLeagues   ,
  deleteLeague ,
} : LeaguesListProps ) => {
  const handleClick = async ( id : string ) => {
    await deleteLeague( id );
    setLeagues( leagues.filter( league => league.id !== id ) );
  }

  return <>
    { leagues?.map( ({ id, name }) => <div key={ id }>

      <button
        onClick={ () => handleClick( id ) }
      > delete </button> 

      <Link
        key={ id }
        href={ `/leagues/${ id }` }
      >{ name }</Link>

    </div>
    )}
  </>
};

//******************************************************************************
// exports
//******************************************************************************
export default LeaguesList;
