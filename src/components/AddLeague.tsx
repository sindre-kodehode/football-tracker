"use client";

import { League        } from "@prisma/client";
import {Dispatch       } from "react";
import {SetStateAction } from "react";
import {useState       } from "react";
import {useTransition  } from "react";

type AddLeagueProps = {
  createLeague : ( name: string ) => Promise<League> ,
  setLeagues   : Dispatch<SetStateAction<League[]>>  ,
};

const AddLeague = ( { createLeague, setLeagues } : AddLeagueProps ) => {
  const [ name     , setName         ] = useState<string>( "" );
  const [ isPending, startTransition ] = useTransition();

  const handleSubmit = () => {
    startTransition( async () => {
      const newLeague = await createLeague( name );
      console.log( "new league", newLeague );
      setLeagues( prevLeagues => [ ...prevLeagues, newLeague ] )
    });
  };

  return <form onSubmit={ formEvent => formEvent.preventDefault() }>

    <input
      disabled={ isPending }
      name="name"
      onChange={ event => setName( event.target.value ) }
      placeholder="Enter name"
      type="text"
      value={ name }
    />

    <input
      type="submit"
      disabled={ isPending }
      onClick={ handleSubmit }
      value="add"
    />

  </form>
};

export default AddLeague;
