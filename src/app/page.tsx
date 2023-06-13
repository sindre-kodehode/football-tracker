//******************************************************************************
// imports
//******************************************************************************
import styles     from "./page.module.css"
import Main       from "@/components/Main";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function deleteLeague( id : string ) {
  "use server"
  console.log( "hello from server" );

  const result = await prisma.league.delete({ where : { id } })
  return result;
};

async function createLeague( name : string ) {
  "use server"
  console.log( "hello from server" );

  const result = await prisma.league.create({ data : { name } })
  revalidatePath("/");
  return result;
};

//******************************************************************************
// HomePage
//******************************************************************************
const HomePage = async () => {
  const leagues = await prisma.league.findMany();

  return <main className={ styles.main }>
    <Main createLeague={ createLeague } deleteLeague={ deleteLeague } data={ leagues } />
  </main>
};


//******************************************************************************
// exports
//******************************************************************************
export default HomePage;
