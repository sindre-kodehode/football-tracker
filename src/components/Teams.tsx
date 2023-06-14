"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team     } from "@prisma/client";
import { useState } from "react";
import AddTeam      from "@/components/AddTeam";
import TeamsList    from "@/components/TeamsList";


//******************************************************************************
// types
//******************************************************************************
type LeaguesProps = {
  teamsData  : Team[]                                                       ,
  deleteTeam : ( id   : string ) => Promise<Team>                           ,
  createTeam : ( data : Pick<Team, "name" | "shorthand"> ) => Promise<Team> ,
}


//******************************************************************************
// Teams
//******************************************************************************
const Teams = ( { teamsData, deleteTeam, createTeam } : LeaguesProps ) => {
  const [ teams, setTeams ] = useState<Team[]>( teamsData );

  return <>

    <TeamsList
      deleteTeam={ deleteTeam }
      setTeams={ setTeams }
      teams={ teams }
    />

    <AddTeam
      createTeam={ createTeam }
      setTeams={ setTeams }
    />

  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default Teams;
