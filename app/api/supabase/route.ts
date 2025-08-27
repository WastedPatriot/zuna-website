// Supabase Database API Integration
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');
  
  return new Response(JSON.stringify({ 
    service: 'Supabase',
    table: table || 'users',
    status: 'connected',
    note: 'Configure SUPABASE_URL and SUPABASE_ANON_KEY'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return new Response(JSON.stringify({ 
    service: 'Supabase',
    operation: body.operation || 'insert',
    table: body.table || 'users',
    status: 'success'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
