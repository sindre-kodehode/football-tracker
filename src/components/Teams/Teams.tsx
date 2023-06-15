"use client";
//******************************************************************************
// imports
//******************************************************************************
import { Team           } from "@prisma/client";
import { MatchExtended  } from "@/lib/match";
import { MatchReqFields } from "@/lib/match";
import { TeamReqFields  } from "@/lib/team";
import { Dispatch       } from "react";
import { SetStateAction } from "react";
import { useTransition  } from "react";
import styles             from "./Teams.module.css";
import AddTeam            from "@/components/AddTeam";
import TeamsList          from "@/components/TeamsList";
import generateMatches    from "@/util/generateMatches";


//******************************************************************************
// types and interfaces
//******************************************************************************
type LeaguesProps = {
  leagueId      : string                                                  ,
  teams         : Team[]                                                  ,
  deleteTeam    : ( id   : string           ) => Promise<Team>            ,
  createTeam    : ( data : TeamReqFields    ) => Promise<Team>            ,
  createMatches : ( data : MatchReqFields[] ) => Promise<MatchExtended[]> ,
  setIsSeason   : Dispatch<SetStateAction<boolean>>                       ,
  setMatches    : Dispatch<SetStateAction<MatchExtended[]>>               ,
  setTeams      : Dispatch<SetStateAction<Team[]>>                        ,
}
 

//******************************************************************************
// League
//******************************************************************************
const League = ({
  leagueId      ,
  teams         ,
  deleteTeam    ,
  createTeam    ,
  createMatches ,
  setIsSeason   ,
  setMatches    ,
  setTeams      ,
} : LeaguesProps ) => {
  const [ isPending, startTransition ] = useTransition();

  const handleGenerate = () => {
    startTransition( async () => {
      const newMatches = await createMatches(
        generateMatches( leagueId, teams )
      );
      setMatches( newMatches );
      setIsSeason( newMatches.length > 0 );
    });
  };

  return <>
    { teams.length
      ? <h2> Teams </h2>
      : ""
    }

      <TeamsList
        deleteTeam={ deleteTeam }
        setTeams={ setTeams }
        teams={ teams }
      />

      <h2> Add a new team </h2>

      <AddTeam
        leagueId={ leagueId }
        createTeam={ createTeam }
        setTeams={ setTeams }
      />

      <input
        className={ styles.button }
        disabled={ isPending }
        onClick={ handleGenerate }
        type="button"
        value="Generate Season"
      />
  </>
};


//******************************************************************************
// exports
//******************************************************************************
export default League;
