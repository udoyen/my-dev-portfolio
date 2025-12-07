import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Import the connection tool we made

export async function GET() {
  try {
    // 1. Wait for the connection to be established
    const client = await clientPromise;
    
    // 2. Select the Database and Collection
    const db = client.db("portfolio_db");
    
    // 3. Run the Query: .find({}) means "Find Everything"
    // .toArray() converts the raw cursor into a friendly JSON list
    const projects = await db.collection("projects").find({}).toArray();

    // 4. Return the result
    return NextResponse.json(projects);
    
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// handle POST request (Create new project)
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio_db");
    
    // 1. Get the data from the request body
    const body = await request.json();
    
    // 2. Insert into MongoDB
    // We manually create the 'link' based on the title to save time
    // e.g. "My Cool App" -> "/projects/my-cool-app"
    const newProject = {
      ...body,
      link: `/projects/${body.title.toLowerCase().replace(/ /g, '-')}` 
    };

    const result = await db.collection("projects").insertOne(newProject);

    return NextResponse.json({ success: true, result });
    
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}