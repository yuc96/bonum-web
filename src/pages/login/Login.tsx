import React, { useState } from 'react';
import axios from 'axios'; // Importamos Axios
import '../../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para mostrar cargando

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Realizar la solicitud POST al backend con los datos del formulario
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        email,
        password,
      });

      // Si el login es exitoso, se obtiene el token
      const token = response.data.token;
      console.log('JWT Token:', token);

      // Aquí puedes almacenar el token en el localStorage o context de React, dependiendo de tu preferencia
      localStorage.setItem('token', token);  // Ejemplo de almacenamiento del token

      // Aquí podrías redirigir al usuario a una página protegida
      // Por ejemplo, usando react-router
      // navigate('/dashboard'); // Ejemplo de navegación si estás usando react-router

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el servidor');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Termina el estado de cargando
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>} {/* Mensaje de error */}
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
