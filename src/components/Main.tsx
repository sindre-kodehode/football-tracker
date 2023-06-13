"use client"
import AddLeague    from "@/components/AddLeague";
import Leagues      from "@/components/Leagues";
import { League   } from "@prisma/client";
import { useState } from "react";

type MainProps = {
  data         : League[]                    ,
  deleteLeague : ( id   : string ) => Promise<League> ,
  createLeague : ( name : string ) => Promise<League> ,
}

const Main = ( { data, deleteLeague, createLeague } : MainProps ) => {
  const [ leagues, setLeagues ] = useState< League[] >( data );

  return <>
    <h2> Pick a league </h2>
    <Leagues deleteLeague={ deleteLeague } leagues={ leagues } setLeagues={ setLeagues } /> 

    <h2> Add a new league </h2>
    <AddLeague createLeague={ createLeague } setLeagues={ setLeagues } />
  </>
};

export default Main;
