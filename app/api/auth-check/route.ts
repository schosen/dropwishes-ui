// pages/api/auth/check.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import cookie from 'cookie';

export async function GET(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const authToken = cookies['auth_token'];

  if (!authToken) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    await axios.get('http://localhost:8000/api/user/validate-token/', {
    headers: {
        Authorization: `Token ${authToken}`,
    },
  }); // Adjust the URL as necessary
    return NextResponse.json({ message: 'Authenticated' });
  } catch (error) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }
};

