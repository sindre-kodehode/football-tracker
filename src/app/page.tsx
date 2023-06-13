//******************************************************************************
// imports
//******************************************************************************
import styles            from "./page.module.css";
import Main              from "@/components/Main";
import { createLeague  } from "@/lib/league"; 
import { deleteLeague  } from "@/lib/league"; 
import { getAllLeagues }from "@/lib/league"; 

//******************************************************************************
// HomePage
//******************************************************************************
const HomePage = async () => {
  const leagues = await getAllLeagues();

  return <main className={ styles.main }>
    <Main createLeague={ createLeague } deleteLeague={ deleteLeague } data={ leagues } />
  </main>
};


//******************************************************************************
// exports
//******************************************************************************
export default HomePage;
