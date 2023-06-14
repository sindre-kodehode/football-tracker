"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Match          } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import MatchesItem        from "@/components/MatchesItem";


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
  return <>
    <h2> Pending Matches </h2>
    { matches.filter( match => !match.complete ).map( match =>
      <MatchesItem
        key={ match.id }
        match={ match }
        setMatches={ setMatches }
        updateMatch={ updateMatch }
      />
    )}
    <h2> Completed Matches </h2>
    { matches.filter( match => match.complete ).map( match =>
      <MatchesItem
        key={ match.id }
        match={ match }
        setMatches={ setMatches }
        updateMatch={ updateMatch }
      />
    )}
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default Matches;
