"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { useState       } from "react";
import { useTransition  } from "react";
import { MatchExtended  } from "@/lib/match";
import { MatchReqFields } from "@/lib/match";
import { TeamReqFields  } from "@/lib/team";
import AddTeam            from "@/components/AddTeam";
import TeamsList          from "@/components/TeamsList";


//******************************************************************************
// types and interfaces
//******************************************************************************

type LeaguesProps = {
  leagueId      : string                                                  ,
  teamsData     : Team[]                                                  ,
  matchesData   : MatchExtended[]                                         ,
  deleteTeam    : ( id   : string           ) => Promise<Team>            ,
  createTeam    : ( data : TeamReqFields    ) => Promise<Team>            ,
  createMatches : ( data : MatchReqFields[] ) => Promise<MatchExtended[]> ,
}
 

//******************************************************************************
// Teams
//******************************************************************************
const Teams = ({
  leagueId      ,
  teamsData     ,
  matchesData   ,
  deleteTeam    ,
  createTeam    ,
  createMatches ,
} : LeaguesProps ) => {
  const [ teams    , setTeams        ] = useState<Team[]>(  teamsData   );
  const [ matches  , setMatches      ] = useState<MatchExtended[]>( matchesData );
  const [ isPending, startTransition ] = useTransition();

  const handleGenerateSeason = () => {
    const matches = [];

    for ( let i = 0; i < teams.length - 1; i++ ) {
      for ( let j = i + 1; j < teams.length; j++ ) {
        const homeTeam = teams[ i ];
        const awayTeam = teams[ j ];

        matches.push({ homeTeam           , awayTeam            });
        matches.push({ homeTeam : awayTeam, awayTeam : homeTeam });
      }
    }

    const temp = matches.map( ({
      awayTeam : { id : awayTeamId } ,
      homeTeam : { id : homeTeamId } ,
    }) => ({
      awayTeamId, homeTeamId, leagueId
    }) as MatchReqFields );

    startTransition( async () => {
      const newMatches = await createMatches( temp );
      setMatches( newMatches );
    });
  };

  return <>

    <TeamsList
      deleteTeam={ deleteTeam }
      setTeams={ setTeams }
      teams={ teams }
    />

    <AddTeam
      leagueId={ leagueId }
      createTeam={ createTeam }
      setTeams={ setTeams }
    />

    <input
      disabled={ isPending }
      onClick={ handleGenerateSeason }
      type="button"
      value="Generate Season"
    />

    { matches.map( match =>
      <p>{ match.homeTeam.name } vs. { match.awayTeam.name }</p>
    )
    }
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default Teams;
