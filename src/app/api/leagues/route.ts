//******************************************************************************
// imports
//******************************************************************************
import { League, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

//******************************************************************************
// server
//******************************************************************************
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const leagues = await prisma.league.findMany();

    return NextResponse.json({
        success: true,
        data: leagues,
    });
}

export async function POST(request: Request) {
    const { name }: League = await request.json();

    if (!name) return NextResponse.json({
        success: false,
        message: "'name' not given.",
    })

    const newLeague = await prisma.league.create({
        data: { name }
    });

    return NextResponse.json({
        success: true,
        data: newLeague,
    });
}

export async function PUT(request: Request) {
    const { id, name }: League = await request.json();

    if (!name || !id) return NextResponse.json({
        success: false,
        message: "missing required data",
    })

    const updatedLeague = await prisma.league.update({
        where: { id },
        data: { name }
    });

    return NextResponse.json({
        success: true,
        data: updatedLeague,
    });
}
