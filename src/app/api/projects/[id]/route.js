import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // <--- Required to talk to MongoDB IDs

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("portfolio_db");

    // MongoDB requires the ID to be wrapped in "ObjectId()"
    const result = await db.collection("projects").deleteOne({ 
      _id: new ObjectId(id) 
    });

    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// Handle PUT (Update)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json(); // Get the new title/role/desc
    const client = await clientPromise;
    const db = client.db("portfolio_db");

    // remove _id from body to avoid trying to update the immutable _id field
    const { _id, ...updateData } = body;

    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) }, // 1. Find the item
      { $set: updateData }       // 2. Update specific fields
    );

    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}