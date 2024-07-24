"use client";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/email-verify`, {
          params: { uidb64, token }
        });
        setMessage('Email verified successfully');
      } catch (error) {
        setMessage('Invalid or expired token');
      }
    };

    if (uidb64 && token) {
      verifyEmail();
    }
  }, [uidb64, token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
