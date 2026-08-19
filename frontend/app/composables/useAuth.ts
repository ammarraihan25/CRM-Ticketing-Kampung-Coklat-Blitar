export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null);

  const login = async (credentials: any) => {
    // Implement API call to /api/v1/auth/login
    console.log('Login attempt', credentials);
  };

  const logout = () => {
    token.value = null;
  };

  return {
    token,
    login,
    logout
  };
};
