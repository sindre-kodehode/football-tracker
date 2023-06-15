"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import { useTransition  } from "react";
import styles             from "./TeamsList.module.css";
import Link               from "next/link";


//******************************************************************************
// types
//******************************************************************************
type LeaguesProps = {
  teams      : Team[]                           ,
  setTeams   : Dispatch<SetStateAction<Team[]>> ,
  deleteTeam : ( id : string ) => Promise<Team> ,
}


//******************************************************************************
// TeamsList
//******************************************************************************
const TeamsList = ( { teams, setTeams, deleteTeam } : LeaguesProps ) => {
  const [ isPending, startTransition ] = useTransition();

  const handleClick = async ( id : string ) => {
    startTransition( async () => {
      await deleteTeam( id );
    });
    setTeams( teams.filter( league => league.id !== id ) );
  }

  return <ul className={ styles.list }>
    { teams?.map( ({ id, name }) =>
      <li key={ id }>

        <p>{ name }</p>

        <button
          disabled={ isPending }
          onClick={ () => handleClick( id ) }
        > delete </button> 

    </li>
    )}
  </ul>
};


//******************************************************************************
// exports
//******************************************************************************
export default TeamsList;
