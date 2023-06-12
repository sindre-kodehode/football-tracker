//******************************************************************************
// imports
//******************************************************************************
import { prisma       } from '@/lib/db';
import { NextResponse } from 'next/server';
import { NextRequest  } from 'next/server';


//******************************************************************************
// types
//******************************************************************************
type Params = {
  params : {
    id : string ,
  }
}

//******************************************************************************
// GET
//******************************************************************************
const GET = async ( _ : NextRequest, { params : { id } } : Params ) => {
  try {
    const league = await prisma.league.findFirst({ where : { id } });
    return NextResponse.json({
      success : true   ,
      data    : league ,
    });
  }
  catch ( error ) {
    return NextResponse.json({
      success : false ,
      error   : error instanceof Error
        ? error.message
        : "Error while handling request"
    });
  }
}


//******************************************************************************
// exports
//******************************************************************************
export { GET };
