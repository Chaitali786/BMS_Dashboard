import { NextResponse } from "next/server";

export async function GET() {
  const URL = process.env.API_URL?.trim();
  
  if (!URL) {
    return NextResponse.json(
      { error: "Internal Server Error: API URL is missing" },
      { status: 500 }
    );
  }
  const res = await fetch(URL);
  const formData = await res.json();
  return NextResponse.json(formData);
}

export async function POST(request: Request) {
  const URL = process.env.API_URL;

  if (!URL) {
    return NextResponse.json(
      { error: "Internal Server Error: API URL is missing" },
      { status: 500 }
    );
  }
  const body = await request.json();

  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await res.json();
  return NextResponse.json(result);
}
