// src/app/api/hello/route.js

export async function GET(request) {
    return new Response(JSON.stringify({ name: "John Doe" }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
  