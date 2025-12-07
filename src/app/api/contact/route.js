import { NextResponse } from 'next/server';

export async function POST(request) {
  // 1. Read the data sent from the frontend
  const data = await request.json();

  // 2. Log it to the SERVER console (your terminal, not the browser)
  console.log("SERVER RECEIVED MESSAGE:", data);

  // 3. Simulate a delay (like sending an email)
  // This is a pretend database wait time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 4. Return success
  return NextResponse.json({ success: true, message: "Email sent!" });
}