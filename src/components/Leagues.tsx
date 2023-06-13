"use client"
import Link               from "next/link";
import { League         } from "@prisma/client";
import { Dispatch       } from "react";
import { SetStateAction } from "react";


type LeaguesProps = {
  leagues      : League[]                             ,
  deleteLeague : ( id   : string ) => Promise<League> ,
  setLeagues   : Dispatch<SetStateAction<League[]>>   ,
}


const Leagues = ( { leagues, setLeagues, deleteLeague } : LeaguesProps ) => {
  const handleClick = async ( id : string ) => {
    await deleteLeague( id );
    setLeagues( leagues.filter( league => league.id !== id ) );
  }

  return <>
    { leagues?.map( ({ id, name }) => <div key={ id }>
      <button onClick={ () => handleClick( id ) }> delete </button> 
      <Link key={ id } href={ `/leagues/${ id }` }>{ name }</Link>
    </div>
    )}
  </>
};

export default Leagues;
