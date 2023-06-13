//******************************************************************************
// import
//******************************************************************************
import { prisma } from "./db";


//******************************************************************************
// create
//******************************************************************************
async function createTeam(
  name      : string ,
  country   : string ,
  shorthand : string ,
) {
  "use server"
  return await prisma.team.create({
    data : { name, country, shorthand } ,
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
async function updateTeam(
  id        : string ,
  name      : string ,
  country   : string ,
  shorthand : string ,
) {
  "use server"
  return await prisma.team.update({
    where : { id                       } ,
    data  : { name, country, shorthand } ,
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
