import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  };

  useEffect(() => {
    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth({ email, password });
          // Redirect or update UI after successful login
          // Here the response can be properly handled
          setIsAuthenticated(true);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Error on the response (5xx, 4xx)
            console.log(error.status);
            console.error('Sign-up failed', error.response, error.status);
        } else {
            // Error on the request (Network error)
            console.error('An error occurred:', error);
        }
      }
  };

  const logout = async () => {
    try {
      const response = await api.post('/api/user/token/logout/');
      setIsAuthenticated(false);
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
