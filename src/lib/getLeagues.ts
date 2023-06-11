import { League } from "@prisma/client"

export default async function getLeagues() : Promise< League[] > {
  const url = "http://localhost:3000/api/leagues";

  const response : Response = await fetch( url );
  const leagues  : League[] = await response.json() || [];

  return leagues;
}
