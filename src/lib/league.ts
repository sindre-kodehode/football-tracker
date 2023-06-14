//******************************************************************************
// import
//******************************************************************************
import { League } from "@prisma/client";
import { prisma } from "./db";


//******************************************************************************
// create
//******************************************************************************
async function createLeague( data : Pick<League, "name"> ) {
  "use server"
  return await prisma.league.create({
    data : { ...data } ,
  });
};


//******************************************************************************
// get
//******************************************************************************
async function getLeague( id : string ) {
  "use server"
  return await prisma.league.findFirst({
    where : { id } ,
  });
};


//******************************************************************************
// getAllLeagues
//******************************************************************************
async function getAllLeagues() {
  "use server"
  return await prisma.league.findMany();
};


//******************************************************************************
// update
//******************************************************************************
async function updateLeague( id : string, data : Partial<League> ) {
  "use server"
  return await prisma.league.update({
    where : { id      } ,
    data  : { ...data } ,
  });
};


//******************************************************************************
// delete
//******************************************************************************
async function deleteLeague( id : string ) {
  "use server"
  await prisma.match.deleteMany({
    where : { leagueId : id }
  })

  await prisma.team.deleteMany({
    where : { leagueId : id }
  })

  return await prisma.league.delete({
    where : { id } ,
  });
};


//******************************************************************************
// export
//******************************************************************************
export { createLeague, getLeague, getAllLeagues, updateLeague, deleteLeague };
