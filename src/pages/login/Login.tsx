import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importa Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa estilos de Toastify
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Realizar la solicitud POST al backend
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        email,
        password,
      });

      // Si el login es exitoso, muestra un mensaje de éxito
      const token = response.data.token;
      console.log('JWT Token:', token);
      localStorage.setItem('token', token);
      toast.success('Login successful! 🎉'); // Mensaje de éxito

      // Redirigir a la ruta protegida principal ("/") después de un login exitoso
      navigate('/'); // Redirección programática a la ruta principal

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Server error';
      toast.error(`Login failed: ${errorMessage}`); // Mensaje de error flotante
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={10000} /> {/* Contenedor de Toast */}
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
