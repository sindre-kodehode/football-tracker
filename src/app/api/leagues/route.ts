//******************************************************************************
// imports
//******************************************************************************
import { PrismaClient } from '@prisma/client';
import { League       } from '@prisma/client';
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
    const leagues = await prisma.league.findMany();

    return NextResponse.json({
        success : true    ,
        data    : leagues ,
    });
}


//******************************************************************************
// POST
//******************************************************************************
export async function POST( request : NextRequest ) {
    const { name } : League = await request.json();

    if ( !name ) return NextResponse.json({
        success : false               ,
        message : "'name' not given." ,
    })

    const newLeague = await prisma.league.create({
        data : { name }
    });

    return NextResponse.json({
        success : true      ,
        data    : newLeague ,
    });
}


//******************************************************************************
// PUT
//******************************************************************************
export async function PUT( request : NextRequest ) {
    const { id, name } : League = await request.json();

    if ( !name || !id ) return NextResponse.json({
        success : false                   ,
        message : "missing required data" ,
    })

    const updatedLeague = await prisma.league.update({
        where : { id   } ,
        data  : { name } ,
    });

    return NextResponse.json({
        success : true          ,
        data    : updatedLeague ,
    });
}


//******************************************************************************
// DELETE
// does not currently work on localhost for next@13.4.5
// ISSUE: https://github.com/vercel/next.js/issues/48096
//******************************************************************************
export async function DELETE( request : NextRequest ) {
    const { id } : League = await request.json();

    if ( !id ) return NextResponse.json({
        success : false                   ,
        message : "missing required data" ,
    })

    const deletedLeague = await prisma.league.delete({
        where : { id } ,
    });

    return NextResponse.json({
        success : true          ,
        data    : deletedLeague ,
    });
}
