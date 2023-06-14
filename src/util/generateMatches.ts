//******************************************************************************
// imports
//******************************************************************************
import { MatchReqFields } from "@/lib/match";
import { Team           } from "@prisma/client";


//******************************************************************************
// generateSeason
//******************************************************************************
const generateMatches = (
  leagueId : string ,
  teams    : Team[] ,
) : MatchReqFields[] => {
  const matches = [];

  for ( let i = 0; i < teams.length - 1; i++ ) {
    for ( let j = i + 1; j < teams.length; j++ ) {
      const homeTeam = teams[ i ];
      const awayTeam = teams[ j ];

      matches.push({ homeTeam           , awayTeam            });
      matches.push({ homeTeam : awayTeam, awayTeam : homeTeam });
    }
  }

  return matches.map( ({
    awayTeam : { id : awayTeamId } ,
    homeTeam : { id : homeTeamId } ,
  }) => ({
    awayTeamId, homeTeamId, leagueId
  }));
};


//******************************************************************************
// exports
//******************************************************************************
export default generateMatches;
