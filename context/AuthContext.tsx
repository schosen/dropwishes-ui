import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation'
import { getWishList, clearWishList } from '../utils/localStorage';
import { clearSessionId } from '../utils/session';
import axiosInstance from '../utils/axios';  // Use the configured axios instance

// Function to handle auth
export const auth = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/api/user/token/`, credentials, {
    headers: {
        'Content-Type': 'application/json',
    },
  });
  const { csrfToken } = response.data;

  axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;  // Set CSRF token for subsequent requests
  return response;
};

interface AuthContextType {
  isAuthenticated: boolean;
  authError: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (first_name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  otpEmail: (email: string) => Promise<void>;
  otpAuth: (email: string, token: string) => Promise<void>;
  otpVerify: (email: string, token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, conformPassword: string, uidb64: string, token: string ) => Promise<void>;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false); // should be set to true when I eveantually use this feature
  const router = useRouter()
  const pathname = usePathname()

  const validateToken = async () => {
    // setLoading(true);  // Set loading state to true
    try {
      const response = await axiosInstance.get(`/api/user/validate-token/`);
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);

      }
    } catch (error) {
      console.error('Token validation failed', error);
      setIsAuthenticated(false);

    }

    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const signup = async (first_name: string, email: string, password: string, confirm_password: string) => {
    setAuthError('');
    try {
      const response = await axiosInstance.post(`/api/user/create/`, {first_name, email, password, confirm_password})

      setIsAuthenticated(true);

      // save locally stored wishllist to backend
      const localWishList = getWishList();
        if (localWishList.length > 0) {

          try {

            const mergeResponse = await axiosInstance.post(`/api/wishlist/merge-wishlist/`,
            { wishList: localWishList }
            );

            if (mergeResponse.status !== 200) {
              // Handle case where wishlist merge failed
              setAuthError('Failed to merge wishlist with server.');
            }

          } catch (mergeErr) {
            // Catch any Axios error (e.g., network issues)
            setAuthError('Error merging wishlist with server.');
          }
        }

        // Clear local wishlist and session regardless of merge result
        clearWishList();  // Clear localStorage after merging
        clearSessionId(); // Clear session ID cookie


      // Navigate to wishlist whether or not the merge was successful
      router.push('/wishlists')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsAuthenticated(false);

        console.error('Sign-up failed', error.response, error.status);
        setAuthError('Sign Up failed, please try again');
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
          setAuthError('An error occurred. Please try again.');
        }

    }

  };

  const otpEmail = async (email: string) => {
    const emailQueryParam = new URLSearchParams({ email }).toString();
    setAuthError('');
    try {
      const response = await axiosInstance.post(`/api/user/otp-auth/email/`, {email})
      // if pathname includes sign up then 'auth/otp-verify' else 'auth/otp'
      if (pathname.includes('signup')) {
        router.push(`/auth/otp-verify?${emailQueryParam}`);
      } else {
        router.push(`/auth/otp?${emailQueryParam}`);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('action failed', error.response, error.status);
        setAuthError('action failed, please try again');
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
          setAuthError('An error occurred. Please try again.');
        }

    }

  };

  const otpVerify = async (email: string, token: string) => {
    setAuthError('');
    try {
      const response = await axiosInstance.post(`/api/user/otp-auth/verify/`, {email, token})
      setIsAuthenticated(true);

      router.push('/wishlists')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsAuthenticated(false);

        console.error('action failed', error.response, error.status);
        setAuthError('action failed, please try again');
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
          setAuthError('An error occurred. Please try again.');
        }

    }
  };


  const otpAuth = async (email: string, token: string) => {
    setAuthError('');
    try {
      const response = await axiosInstance.post(`/api/user/otp-auth/token/`, {email, token})
      setIsAuthenticated(true);

      router.push('/wishlists')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('action failed', error.response, error.status);
        setAuthError('action failed, please try again');
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
          setAuthError('An error occurred. Please try again.');
        }

    }

  };

  const login = async (email: string, password: string) => {
    setAuthError('');
    try {
      const response = await auth({ email, password });
          // Redirect or update UI after successful login
          // Here the response can be properly handled
          setIsAuthenticated(true);

          // save locally stored wishllist to backend
          const localWishList = getWishList();
          if (localWishList.length > 0) {

            try {
              const mergeResponse = await axiosInstance.post(`/api/wishlist/merge-wishlist/`,
              { wishList: localWishList });

              if (mergeResponse.status !== 200) {
                // Handle case where wishlist merge failed
                setAuthError('Failed to merge wishlist with server.');
              }

            } catch (mergeErr) {
            // Catch any Axios error (e.g., network issues)
            setAuthError('Error merging wishlist with server.');
            }


          }

          clearWishList();  // Clear localStorage after merging
          clearSessionId(); // Clear session ID cookie

          router.push('/wishlists')

        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Error on the response (5xx, 4xx)
            // TODO: Change this to 401 error if condition?
            console.error('Sign-up failed', error.response, error.status);
            setAuthError('Email or Password is incorrect');
        } else {
            // Error on the request (Network error)
            console.error('An error occurred:', error);
            setAuthError('An error occurred. Please try again.');
        }
      }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post(`/api/user/token/logout/`);
      setIsAuthenticated(false);

      router.push('/')
    } catch (error) {
          if (axios.isAxiosError(error)) {
            // Error on the response (5xx, 4xx)
            console.log(error.status);
            console.error('Sign-out failed', error.response, error.status);
        } else {
            // Error on the request (Network error)
            console.error('An error occurred:', error);
        }
      }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axiosInstance.post(`/api/user/reset-password/`, {email});
      setIsAuthenticated(false);
      //TODO: add message saying reset link sent to email.

    } catch (error) {
      if (axios.isAxiosError(error)) {
          // Error on the response (5xx, 4xx)
          console.log(error.status);
          console.error('Sign-out failed', error.response, error.status);
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
      }
    }

  }

  const resetPassword = async (password: string, confirm_password: string,  uidb64: string, token: string ) => {
    const queryParams = new URLSearchParams({ uidb64, token }).toString();
    try {
      const response = await axiosInstance.post(`/api/user/reset-password/confirm?${queryParams}`, {password, confirm_password});
      setIsAuthenticated(false);
      setAuthError('Password Reset successfully');

      // router.push('auth/reset-password')
    } catch (error) {
      if (axios.isAxiosError(error)) {
          // Error on the response (5xx, 4xx)
          console.log(error.status);
          console.error('Sign-out failed', error.response, error.status);
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
      }
    }

  }

  // if (loading) {
  //   return <div>Loading...</div>; // Optionally, you can show a loading spinner or message
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, otpEmail, otpVerify, otpAuth, forgotPassword, resetPassword, authError, loading}}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
