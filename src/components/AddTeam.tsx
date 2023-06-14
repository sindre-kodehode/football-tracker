"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { Dispatch       } from "react";
import { FormEvent      } from "react";
import { SetStateAction } from "react";
import { useEffect      } from "react";
import { useRef         } from "react";
import { useState       } from "react";
import { useTransition  } from "react";


//******************************************************************************
// types
//******************************************************************************
type AddLeagueProps = {
  setTeams   : Dispatch<SetStateAction<Team[]>>                             ,
  createTeam : ( data : Pick<Team, "name" | "shorthand"> ) => Promise<Team> ,
};


//******************************************************************************
// AddTeam
//******************************************************************************
const AddTeam = ( { createTeam, setTeams } : AddLeagueProps ) => {
  const [ name     , setName         ] = useState<string>( "" );
  const [ shorthand, setShorthand    ] = useState<string>( "" );
  const [ isPending, startTransition ] = useTransition();
  const inputNameRef                   = useRef<HTMLInputElement>( null );

  const handleSubmit = ( event : FormEvent ) => {
    event.preventDefault();

    startTransition( async () => {
      const newTeam = await createTeam({ name, shorthand });
      setTeams( prevTeams => [ ...prevTeams, newTeam ] );
    });

    setName( "" );
    setShorthand( "" );
  };

  useEffect( () => {
    !isPending && inputNameRef.current?.focus();
  }, [ isPending ] );

  return <form onSubmit={ handleSubmit }>

    <input
      disabled={ isPending }
      name="name"
      onChange={ e => setName( e.target.value ) }
      placeholder="Enter name"
      ref={ inputNameRef }
      type="text"
      value={ name }
    />

    <input
      disabled={ isPending }
      name="shorthand"
      onChange={ e => setShorthand( e.target.value ) }
      placeholder="Enter shorthand"
      type="text"
      value={ shorthand }
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
export default AddTeam;
