import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState, useEffect } from 'react';
import { Spin, Alert } from 'antd';

function LoginGoogle() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginG } = useAuthStore();

  useEffect(() => {
    const handleLogin = async () => {
      setLoading(true);
      setError(null);
      try {
        if (token) {
          await loginG(token);
          navigate("/product");
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        setError('Erro ao fazer login com Google. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      handleLogin();
    }
  }, [token, loginG, navigate]);

  return (
    <div>
      {error && <Alert message={error} type="error" showIcon />}
      {loading && <Spin />}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          setToken(String(credentialResponse.credential));
        }}
        onError={() => {
          console.log('Login Failed');
          setError('Login com Google falhou. Por favor, tente novamente.');
        }}
      />
    </div>
  );
}

export default LoginGoogle;
