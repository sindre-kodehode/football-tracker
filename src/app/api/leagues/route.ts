//******************************************************************************
// imports
//******************************************************************************
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextRequest  } from 'next/server';


//******************************************************************************
// server
//******************************************************************************
const prisma = new PrismaClient();


//******************************************************************************
// GET
//******************************************************************************
export async function GET() {
  try {
    const leagues = await prisma.league.findMany();

    return NextResponse.json({
      success : true   ,
      data    : leagues,
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
// POST
//******************************************************************************
export async function POST( request : NextRequest ) {
  try {
    const { name } = await request.json();

    if ( !name ) throw new Error( "Missing 'name'" );

    const newLeague = await prisma.league.create({
      data : { name }
    });

    return NextResponse.json({
      success : true      ,
      data    : newLeague ,
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
// PUT
//******************************************************************************
export async function PUT( request : NextRequest ) {
  try {
    const { id, name } = await request.json();

    if ( !name ) throw Error( "Missing 'name'" );
    if ( !id   ) throw Error( "Missing 'id'"   );

    const updatedLeague = await prisma.league.update({
      where : { id   } ,
      data  : { name } ,
    });

    return NextResponse.json({
      success : true          ,
      data    : updatedLeague ,
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
// DELETE
// does not currently work on localhost for next@13.4.5
// ISSUE: https://github.com/vercel/next.js/issues/48096
//******************************************************************************
export async function DELETE( request : NextRequest ) {
  try {
    const { id } = await request.json();
  
    if ( !id ) throw Error( "Missing 'id'" );
  
    const deletedLeague = await prisma.league.delete({
      where : { id } ,
    });
  
    return NextResponse.json({
      success : true          ,
      data    : deletedLeague ,
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
