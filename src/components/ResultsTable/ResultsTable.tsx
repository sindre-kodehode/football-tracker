"use client";
//******************************************************************************
// imports
//******************************************************************************
import { MatchExtended    } from "@/lib/match";
import styles               from "./ResultsTable.module.css";
import generateResultsTable from "@/util/generateResultsTable";


//******************************************************************************
// types and interfaces
//******************************************************************************
type ResultsTableProps = {
  completedMatches : MatchExtended[] ,
}


//******************************************************************************
// ResultsTable
//******************************************************************************
const ResultsTable = ( { completedMatches } : ResultsTableProps ) => {
  const results = generateResultsTable( completedMatches );

  return <>
    <h2 className={ styles.h2 }> Results </h2>
    <table className={ styles.table }>
      <thead>
      <tr>
          <th> Positon </th>
          <th> Name    </th>
          <th> Played  </th>
          <th> Won     </th>
          <th> Draw    </th>
          <th> Diff    </th>
          <th> Goals   </th>
          <th> Points  </th>
      </tr>
      </thead>
      <tbody>
      { results.map( ( {
          id             ,
          name           ,
          played         ,
          won            ,
          draw           ,
          goalDifference ,
          goalsFor       ,
          goalsAgainst   ,
          points         ,
        }, index ) =>
        <tr key={ id }>
          <td>{ index + 1                   }</td>
          <td>{ name                        }</td>
          <td>{ played                      }</td>
          <td>{ won                         }</td>
          <td>{ draw                        }</td>
          <td>{ goalDifference              }</td>
          <td>{ goalsFor } - { goalsAgainst }</td>
          <td>{ points                      }</td>
        </tr>
      )}
      </tbody>
    </table>
  </>
};

//******************************************************************************
// exports
//******************************************************************************
export default ResultsTable;
