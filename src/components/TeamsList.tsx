"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { Dispatch, useTransition       } from "react";
import { SetStateAction } from "react";
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

  return <>
    { teams?.map( ({ id, name, shorthand }) => <div key={ id }>

      <button
        disabled={ isPending }
        onClick={ () => handleClick( id ) }
      > delete </button> 

      <Link
        key={ id }
        href={ `/teams/${ id }` }
      >{ name }</Link>

      <span>{ shorthand }</span>

    </div>
    )}
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default TeamsList;
