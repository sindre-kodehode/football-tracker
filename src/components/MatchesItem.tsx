"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Match          } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { Dispatch, FormEvent       } from "react";
import { SetStateAction } from "react";
import { useState       } from "react";


//******************************************************************************
// types and interfaces
//******************************************************************************
type MatchesItemProps = {
  match       : MatchExtended                                            ,
  setMatches  : Dispatch<SetStateAction<MatchExtended[]>>                ,
  updateMatch : ( id : string, data : Partial<Match> ) => Promise<Match> ,
}


//******************************************************************************
// MatchesItem
//******************************************************************************
const MatchesItem = ( { match, setMatches, updateMatch } : MatchesItemProps ) => {
  const [ homeTeamScore, setHomeTeamScore ] = useState<number>( match.homeTeamScore );
  const [ awayTeamScore, setAwayTeamScore ] = useState<number>( match.awayTeamScore );
 
  const handleSubmit = ( event : FormEvent<HTMLFormElement> ) : void => {
    event.preventDefault();

    ( async () => {
      await updateMatch( match.id, {
        awayTeamScore   ,
        homeTeamScore   ,
        complete : true ,
      });
    })()

    setMatches( prevMatches => {
      prevMatches = prevMatches.filter( ({ id })=>
        id !== match.id
      );

      return [ ...prevMatches, {
        ...match        ,
        awayTeamScore   ,
        homeTeamScore   ,
        complete : true ,
      }];
    });
  };

  return <form onSubmit={ handleSubmit } style={{ display : "flex" }}>

    <p>{ match.homeTeam.name }</p>

    <input
      type="number"
      value={ homeTeamScore }
      disabled={ match.complete }
      onChange={ ({ target : { valueAsNumber : value } }) => {
        setHomeTeamScore( value );
      }}
    />

    <p> vs. </p>

    <input
      type="number"
      value={ awayTeamScore }
      disabled={ match.complete }
      onChange={ ({ target : { valueAsNumber : value } }) => {
        setAwayTeamScore( value )
      }}
    />

    <p>{ match.awayTeam.name }</p>

    { !match.complete && <input
      type="submit"
      value="submit"
    />
    }

  </form>
};


//******************************************************************************
// exports
//******************************************************************************
export default MatchesItem;
