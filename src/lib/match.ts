//******************************************************************************
// import
//******************************************************************************
import { Match  } from "@prisma/client";
import { prisma } from "./db";


//******************************************************************************
// create
//******************************************************************************
async function createMatch( data : 
  Pick<Match, "awayTeamId" | "homeTeamId" | "leagueId">
) {
  "use server"
  return await prisma.match.create({
    data : { ...data } ,
  });
};


//******************************************************************************
// get
//******************************************************************************
async function getMatch( id : string ) {
  "use server"
  return await prisma.match.findFirst({
    where : { id } ,
  });
};


//******************************************************************************
// getAllLeagues
//******************************************************************************
async function getAllMatchs() {
  "use server"
  return await prisma.match.findMany();
};


//******************************************************************************
// update
//******************************************************************************
async function updateMatch( id : string, data : Partial<Match> ) {
  "use server"
  return await prisma.match.update({
    where : { id      } ,
    data  : { ...data } ,
  });
};


//******************************************************************************
// delete
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
export { createMatch, getMatch, getAllMatchs, updateMatch, deleteMatch };
