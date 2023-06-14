"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { TeamReqFields  } from "@/lib/team";
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
  leagueId   : string | undefined                        ,
  setTeams   : Dispatch<SetStateAction<Team[]>>          ,
  createTeam : ( data : TeamReqFields ) => Promise<Team> ,
};


//******************************************************************************
// AddTeam
//******************************************************************************
const AddTeam = ( { leagueId, createTeam, setTeams } : AddLeagueProps ) => {
  const [ name     , setName         ] = useState<string>( "" );
  const [ isPending, startTransition ] = useTransition();
  const inputNameRef                   = useRef<HTMLInputElement>( null );

  const handleSubmit = ( event : FormEvent ) => {
    event.preventDefault();

    startTransition( async () => {
      if ( !leagueId ) return;

      const newTeam = await createTeam({ leagueId, name });
      setTeams( prevTeams => [ ...prevTeams, newTeam ] );
    });

    setName( "" );
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
      type="submit"
      value="add"
    />

  </form>
};

//******************************************************************************
// exports
//******************************************************************************
export default AddTeam;
