import { NextResponse } from 'next/server';
import { URL_BASE } from '../../../../URL_BASE';

export async function GET(request: Request): Promise<NextResponse> {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  try {
    const response: Response = await fetch(`${URL_BASE}/auth/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching products' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Error fetching products', details: error }, { status: 500 });
  }
}
