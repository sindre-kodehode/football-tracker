//******************************************************************************
// imports
//******************************************************************************
import { League, PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

//******************************************************************************
// server
//******************************************************************************
const prisma = new PrismaClient();

export async function GET() {
    const leagues = await prisma.league.findMany();

    return NextResponse.json({
        success: true,
        data: leagues,
    });
}

export async function POST(request: NextRequest) {
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

export async function PUT(request: NextRequest) {
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

export async function DELETE(request: NextRequest) {
    const data: League = await request.json();

    const { id } = data;
    console.log(data, id);

    if (!id) return NextResponse.json({
        success: false,
        message: "missing required data",
    })

    const deletedLeague = await prisma.league.delete({
        where: { id },
    });

    return NextResponse.json({
        success: true,
        data: deletedLeague,
    });
}
