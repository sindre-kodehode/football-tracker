//******************************************************************************
// import
//******************************************************************************
import { Match, Team  } from "@prisma/client";
import { prisma } from "./db";

//******************************************************************************
// types
//******************************************************************************
type MatchExtended = Match & {
  homeTeam : Team ,
  awayTeam : Team ,
}

type MatchReqFields = Pick<Match
  , "awayTeamId"
  | "homeTeamId"
  | "leagueId"
>

//******************************************************************************
// createMatch
//******************************************************************************
async function createMatch( data : MatchReqFields ) {
  "use server"
  return await prisma.match.create({
    data : { ...data } ,
  });
};


//******************************************************************************
// createMatches
//******************************************************************************
async function createMatches(
  data : MatchReqFields[]
) : Promise<MatchExtended[]> {
  "use server"
  await prisma.match.createMany({ data });
  return await prisma.match.findMany({
    include : {
      awayTeam : true ,
      homeTeam : true ,
    } ,
  });
};


//******************************************************************************
// getMatch
//******************************************************************************
async function getMatch( id : string ) : Promise<MatchExtended | null> {
  "use server"
  return await prisma.match.findFirst({
    where : { id } ,
    include : {
      awayTeam : true ,
      homeTeam : true ,
    } ,
  });
};


//******************************************************************************
// getLeagueMatches
//******************************************************************************
async function getLeagueMatches(
  leagueId : string
) : Promise<MatchExtended[]> {
  "use server"
  return await prisma.match.findMany({
    where : { leagueId } ,
    include : {
      awayTeam : true ,
      homeTeam : true ,
    } ,
  });
};


//******************************************************************************
// getAllMatches
//******************************************************************************
async function getAllMatches() : Promise<MatchExtended[]> {
  "use server"
  return await prisma.match.findMany({
    include : {
      awayTeam : true ,
      homeTeam : true ,
    } ,
  });
};


//******************************************************************************
// updateMatch
//******************************************************************************
async function updateMatch( id : string, data : Partial<Match> ) {
  "use server"
  return await prisma.match.update({
    where : { id      } ,
    data  : { ...data } ,
  });
};


//******************************************************************************
// deleteMatch
//******************************************************************************
async function deleteMatch( id : string ) {
  "use server"
  return await prisma.match.delete({
    where : { id } ,
  });
};


//******************************************************************************
// export
//******************************************************************************
export {
  createMatch      ,
  createMatches    ,
  getMatch         ,
  getAllMatches    ,
  getLeagueMatches ,
  updateMatch      ,
  deleteMatch      ,
};

export type {
  MatchExtended  ,
  MatchReqFields ,
};
