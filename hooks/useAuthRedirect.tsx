"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const useAuthRedirect = (redirectPath: string, authenticated: boolean) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && authenticated) {
        router.push(redirectPath);
      }

      if (!isAuthenticated && !authenticated) {
        router.push(redirectPath);
      }
    }
  }, [isAuthenticated, authenticated, loading, router, redirectPath]);

  // Optionally, return a loading state or spinner while authentication status is being determined
  if (loading) {
    return <div><p>Loading...</p></div>;
  }
};

export default useAuthRedirect; // Added the export statement
