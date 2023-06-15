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
      <section>
        <div>
          <label htmlFor="home-team-score">
            { match.homeTeam.name }
          </label>

          <input
            disabled={ match.complete }
            min="0"
            name="home-team-score"
            type="number"
            value={ homeTeamScore }
            onChange={ ({ target : { valueAsNumber : value } }) => {
              setHomeTeamScore( value );
            }}
          />
        </div>

        <div>
          <input
            disabled={ match.complete }
            min="0"
            name="away-team-score"
            type="number"
            value={ awayTeamScore }
            onChange={ ({ target : { valueAsNumber : value } }) => {
              setAwayTeamScore( value )
            }}
          />

          <label htmlFor="away-team-score">
            { match.awayTeam.name }
          </label>
        </div>
      </section>

      { !match.complete && <input
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
