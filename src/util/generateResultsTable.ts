//******************************************************************************
// imports
//******************************************************************************
import { MatchExtended } from "@/lib/match";


//******************************************************************************
// types
//******************************************************************************
type TeamResults = {
  id             : string ,
  name           : string ,
  played         : number ,
  won            : number ,
  draw           : number ,
  lost           : number ,
  goalsFor       : number ,
  goalsAgainst   : number ,
  goalDifference : number ,
  points         : number ,
}

type TeamResultsMap = {
  [ id : string ] : TeamResults
}


//******************************************************************************
// generateResultsTable
//******************************************************************************
const generateResultsTable = (
  matches : MatchExtended[]
) : TeamResults[] => Object.values( 
  matches.flatMap( ({
    homeTeam      ,
    homeTeamScore ,
    awayTeam      ,
    awayTeamScore ,
  })=> [{
    id             : homeTeam.id                          ,
    name           : homeTeam.name                        ,
    played         : 1                                    ,
    won            : +( homeTeamScore  >  awayTeamScore ) ,
    draw           : +( homeTeamScore === awayTeamScore ) ,
    lost           : +( homeTeamScore  <  awayTeamScore ) ,
    goalsFor       : homeTeamScore                        ,
    goalsAgainst   : awayTeamScore                        ,
    goalDifference : homeTeamScore - awayTeamScore        ,
    points         : 0                                    ,
  }, {
    id             : awayTeam.id                          ,
    name           : awayTeam.name                        ,
    played         : 1                                    ,
    won            : +( awayTeamScore  >  homeTeamScore ) ,
    draw           : +( awayTeamScore === homeTeamScore ) ,
    lost           : +( awayTeamScore  <  homeTeamScore ) ,
    goalsFor       : awayTeamScore                        ,
    goalsAgainst   : homeTeamScore                        ,
    goalDifference : awayTeamScore - homeTeamScore        ,
    points         : 0                                    ,
  }])
  .reduce( ( acc : TeamResultsMap, {
    id             ,
    name           ,
    played         ,
    won            ,
    draw           ,
    lost           ,
    goalsFor       ,
    goalsAgainst   ,
    goalDifference ,
  } : TeamResults ) => {
    !acc[ id ] && ( acc[ id ] = {
      id                    ,
      name                  ,
      played         : 0    ,
      won            : 0    ,
      draw           : 0    ,
      lost           : 0    ,
      goalsFor       : 0    ,
      goalsAgainst   : 0    ,
      goalDifference : 0    ,
      points         : 0    ,
    })

    acc[ id ].played         += played;
    acc[ id ].won            += won;
    acc[ id ].draw           += draw;
    acc[ id ].lost           += lost;
    acc[ id ].goalsFor       += goalsFor;
    acc[ id ].goalsAgainst   += goalsAgainst;
    acc[ id ].goalDifference += goalDifference;
    acc[ id ].points         += won ? 3 : draw ? 1 : 0;

    return acc;
  }, {} ))
  .sort( ( a, b ) => a.points === b.points
    ? b.goalDifference - a.goalDifference
    : b.points - a.points
  );


//******************************************************************************
// exports
//******************************************************************************
export default generateResultsTable;
export type { TeamResults };
