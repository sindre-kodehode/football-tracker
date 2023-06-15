"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Match          } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { Dispatch       } from "react";
import { FormEvent      } from "react";
import { SetStateAction } from "react";
import { useState       } from "react";
import styles             from "./MatchesItem.module.css";


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

  return <>
    <form className={ styles.form } onSubmit={ handleSubmit }>

      <label className={ styles.label } htmlFor="home-team-score">
        { match.homeTeam.name }
      </label>

      <input
        className={ styles.input }
        disabled={ match.complete }
        name="home-team-score"
        type="number"
        value={ homeTeamScore }
        onChange={ ({ target : { valueAsNumber : value } }) => {
          setHomeTeamScore( value );
        }}
      />

      <input
        className={ styles.input }
        disabled={ match.complete }
        name="away-team-score"
        type="number"
        value={ awayTeamScore }
        onChange={ ({ target : { valueAsNumber : value } }) => {
          setAwayTeamScore( value )
        }}
      />

      <label className={ styles.label } htmlFor="away-team-score">
        { match.awayTeam.name }
      </label>

      { !match.complete && <input
          className={ styles.submit }
          type="submit"
          value="submit"
        />
      }

    </form>
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default MatchesItem;
