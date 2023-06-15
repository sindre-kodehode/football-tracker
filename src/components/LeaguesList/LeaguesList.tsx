"use client";
//******************************************************************************
// imports
//******************************************************************************
import { League         } from "@prisma/client";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import styles             from "./LeaguesList.module.css";
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

  return <ul className={ styles.list }>
    { leagues?.map( ({ id, name }) =>
      <li key={ id }>

        <Link
          key={ id }
          href={ `/leagues/${ id }` }
        >{ name }</Link>

        <button
          onClick={ () => handleClick( id ) }
        > delete </button> 

    </li>
    )}
  </ul>
};

//******************************************************************************
// exports
//******************************************************************************
export default LeaguesList;
