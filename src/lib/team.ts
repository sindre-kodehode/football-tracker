//******************************************************************************
// imports
//******************************************************************************
import { Team   } from "@prisma/client";
import { prisma } from "./db";

//******************************************************************************
// types
//******************************************************************************
type TeamReqFields = Pick<Team, "name" | "leagueId">

//******************************************************************************
// create
//******************************************************************************
async function createTeam( data : TeamReqFields ) {
  "use server"
  return await prisma.team.create({
    data : { ...data } ,
  });
};


//******************************************************************************
// get
//******************************************************************************
async function getTeam( id : string ) {
  "use server"
  return await prisma.team.findFirst({
    where : { id } ,
  });
};


//******************************************************************************
// getAllLeagues
//******************************************************************************
async function getAllTeams() {
  "use server"
  return await prisma.team.findMany();
};


//******************************************************************************
// getLeagueTeams
//******************************************************************************
async function getLeagueTeams( leagueId : string ) {
  "use server"
  return await prisma.team.findMany({
    where : { leagueId }
  });
};


//******************************************************************************
// update
//******************************************************************************
async function updateTeam( id : string, data : Partial<Team> ) {
  "use server"
  return await prisma.team.update({
    where : { id      } ,
    data  : { ...data } ,
  });
};


//******************************************************************************
// delete
//******************************************************************************
async function deleteTeam( id : string ) {
  "use server"
  return await prisma.team.delete({
    where : { id } ,
  });
};


//******************************************************************************
// exports
//******************************************************************************
export {
  createTeam     ,
  getTeam        ,
  getAllTeams    ,
  getLeagueTeams ,
  updateTeam     ,
  deleteTeam     ,
};

export type { TeamReqFields };
