//******************************************************************************
// imports
//******************************************************************************
import { prisma        } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect      } from "next/navigation";


//******************************************************************************
// deleteLeague
//******************************************************************************
async function deleteLeague( data : FormData ) {
  "use server"

  const id = data.get( "id" )?.valueOf() as string;
  await prisma.league.delete({ where : { id } })

  revalidateTag( "leagues" );
  redirect( "/leagues" );
}


//******************************************************************************
// exports
//******************************************************************************
export default deleteLeague;
