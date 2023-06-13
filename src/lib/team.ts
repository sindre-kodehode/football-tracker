//******************************************************************************
// import
//******************************************************************************
import { Team } from "@prisma/client";
import { prisma } from "./db";


//******************************************************************************
// create
//******************************************************************************
async function createTeam( data :
  Pick<Team, "name" | "country" | "shorthand">
) {
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
// export
//******************************************************************************
export { createTeam, getTeam, getAllTeams, updateTeam, deleteTeam };
