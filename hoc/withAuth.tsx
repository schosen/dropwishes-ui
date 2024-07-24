// hoc/withAuth.js
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('/api/auth-check'); // This should be an endpoint to verify token validity
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          router.push('/auth/login'); // Redirect to login if not authenticated
        }
      };

      checkAuth();
    }, []);

    if (!isAuthenticated) {
      return null; // Render nothing or a loading spinner while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;

