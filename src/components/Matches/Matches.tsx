"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Match          } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import MatchesItem        from "@/components/MatchesItem";
import styles             from "./Matches.module.css";


//******************************************************************************
// types and interfaces
//******************************************************************************
type MatchesProps = {
  matches     : MatchExtended[]                                          ,
  setMatches  : Dispatch<SetStateAction<MatchExtended[]>>                ,
  updateMatch : ( id : string, data : Partial<Match> ) => Promise<Match> ,
}


//******************************************************************************
// Matches
//******************************************************************************
const Matches = ( { matches, setMatches, updateMatch } : MatchesProps ) => {
  return <section className={ styles.matches }>
    <h3> Pending Matches </h3>
    { matches.filter( match => !match.complete ).map( match =>
      <MatchesItem
        key={ match.id }
        match={ match }
        setMatches={ setMatches }
        updateMatch={ updateMatch }
      />
    )}

    <h3> Completed Matches </h3>
    { matches.filter( match => match.complete ).map( match =>
      <MatchesItem
        key={ match.id }
        match={ match }
        setMatches={ setMatches }
        updateMatch={ updateMatch }
      />
    )}

  </section>
};


//******************************************************************************
// exports
//******************************************************************************
export default Matches;
