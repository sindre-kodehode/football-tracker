"use client";
//******************************************************************************
// imports
//******************************************************************************
import { League         } from "@prisma/client";
import { Dispatch       } from "react";
import { FormEvent      } from "react";
import { SetStateAction } from "react";
import { useState       } from "react";
import { useTransition  } from "react";


//******************************************************************************
// types
//******************************************************************************
type AddLeagueProps = {
  createLeague : ( data : Pick<League, "name"> ) => Promise<League> ,
  setLeagues   : Dispatch<SetStateAction<League[]>>                 ,
};


//******************************************************************************
// AddLeague
//******************************************************************************
const AddLeague = ( { createLeague, setLeagues } : AddLeagueProps ) => {
  const [ name     , setName         ] = useState<string>( "" );
  const [ isPending, startTransition ] = useTransition();

  const handleSubmit = ( event : FormEvent ) => {
    event.preventDefault();

    startTransition( async () => {
      const newLeague = await createLeague({ name });

      setLeagues( prevLeagues => [ ...prevLeagues, newLeague ] )
      setName( "" );
    });
  };

  return <form onSubmit={ handleSubmit }>

    <input
      disabled={ isPending }
      name="name"
      onChange={ e => setName( e.target.value ) }
      placeholder="Enter name"
      type="text"
      value={ name }
    />

    <input
      disabled={ isPending }
      type="submit"
      value="add"
    />

  </form>
};

//******************************************************************************
// exports
//******************************************************************************
export default AddLeague;
