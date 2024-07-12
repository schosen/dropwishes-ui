import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

// Create an instance of axios with default settings
const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'http://localhost:8000',
  withCredentials: true,  // Ensure cookies are sent with requests
});

// Function to handle auth
export const auth = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/api/user/token/', credentials, {
    headers: {
        'Content-Type': 'application/json',
    },
  });
  const { csrfToken } = response.data;

  api.defaults.headers.common['X-CSRFToken'] = csrfToken;  // Set CSRF token for subsequent requests
  return response;
};

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  otpAuth: (email: string) => Promise<void>;
  authError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  // const [loading, setLoading] = useState(true);
  const router = useRouter()

  const validateToken = async () => {
    try {
      const response = await api.get('/api/user/validate-token/');
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

  const signup = async (name: string, email: string, password: string) => {
    setAuthError('');
    try {
      const response = await api.post('/api/user/create/', {name, email, password})

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Sign-up failed', error.response, error.status);
        setAuthError('Sign Up failed, please try again');
      } else {
          // Error on the request (Network error)
          console.error('An error occurred:', error);
          setAuthError('An error occurred. Please try again.');
        }

    }

  }

    const otpAuth = async (email: string) => {
    setAuthError('');
    try {
      const response = await api.post('/api/user/otp-auth/email/', {email})
      router.push('/auth/passcode')
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

  }

  const login = async (email: string, password: string) => {
    setAuthError('');
    try {
      const response = await auth({ email, password });
          // Redirect or update UI after successful login
          // Here the response can be properly handled
          setIsAuthenticated(true);
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
      const response = await api.post('/api/user/token/logout/');
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

  // if (loading) {
  //   return <div>Loading...</div>; // Optionally, you can show a loading spinner or message
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, otpAuth, authError}}>
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
