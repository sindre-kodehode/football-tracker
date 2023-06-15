"use client";
//******************************************************************************
// imports
//******************************************************************************
import { League         } from "@prisma/client";
import { Dispatch       } from "react";
import { FormEvent      } from "react";
import { SetStateAction } from "react";
import { useEffect      } from "react";
import { useRef         } from "react";
import { useState       } from "react";
import { useTransition  } from "react";
import styles             from "./AddLeague.module.css";


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
  const inputNameRef                   = useRef<HTMLInputElement>( null );

  const handleSubmit = ( event : FormEvent ) => {
    event.preventDefault();

    startTransition( async () => {
      const newLeague = await createLeague({ name });
      setLeagues( prevLeagues => [ ...prevLeagues, newLeague ] )
    });

    setName( "" );
  };

  useEffect( () => {
    inputNameRef.current?.focus();
  }, [ isPending ]);

  return <>
      <form className={ styles.form } onSubmit={ handleSubmit }>

      <input
        autoFocus
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
  </>
};

//******************************************************************************
// exports
//******************************************************************************
export default AddLeague;
