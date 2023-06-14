"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { MatchReqFields } from "@/lib/match";
import { TeamReqFields  } from "@/lib/team";
import { useState       } from "react";
import Teams              from "@/components/Teams";


//******************************************************************************
// types and interfaces
//******************************************************************************
type LeagueProps = {
  leagueId      : string                                                  ,
  teamsData     : Team[]                                                  ,
  matchesData   : MatchExtended[]                                         ,
  deleteTeam    : ( id   : string           ) => Promise<Team>            ,
  createTeam    : ( data : TeamReqFields    ) => Promise<Team>            ,
  createMatches : ( data : MatchReqFields[] ) => Promise<MatchExtended[]> ,
}
 

//******************************************************************************
// League
//******************************************************************************
const League = ({
  leagueId      ,
  teamsData     ,
  matchesData   ,
  deleteTeam    ,
  createTeam    ,
  createMatches ,
} : LeagueProps ) => {
  const [ teams   , setTeams    ] = useState<Team[]>( teamsData );
  const [ matches , setMatches  ] = useState<MatchExtended[]>( matchesData );
  const [ isSeason, setIsSeason ] = useState<boolean>( matchesData.length > 0 );

  return <>
    { !isSeason
      ? <Teams
          createMatches={ createMatches }
          createTeam={ createTeam }
          deleteTeam={ deleteTeam }
          leagueId={ leagueId }
          setIsSeason={ setIsSeason }
          setMatches={ setMatches }
          setTeams={ setTeams }
          teams={ teams }
      />
      : matches.map( match =>
          <p>{ match.homeTeam.name } vs. { match.awayTeam.name }</p>
        )
    }
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default League;
