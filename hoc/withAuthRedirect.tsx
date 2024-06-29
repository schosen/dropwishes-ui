// Higher Order Compnent
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuthRedirect = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('/api/auth-check', { withCredentials: true }); // endpoint to verify token validity on next.js server side
          router.push('/wishlists'); // Redirect to wishlist if authenticated
        } catch (error) {
          // Not authenticated, do nothing
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
};

export default withAuthRedirect;
