import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importa Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa estilos de Toastify
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../styles/login.css';
import initConfig from "../../configs/initConfig";
import logo_bonum from '../../components/images/LogoBonum.png';
import logo_country from '../../components/images/banderaEcuador.png';
import UserIcon from '../../components/images/User.svg';
import PasswordIcon from '../../components/images/Lock Password.svg'
import arrow_down from '../../components/images/arrow-down.svg'

const Login: React.FC = () => {

  const LOGIN_URL = initConfig.host + "/api/admin/login";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Realizar la solicitud POST al backend
      const response = await axios.post(LOGIN_URL, {
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
    <div className='Logo-Country'>
    <img src={logo_country} alt='logo_country'/>
    <p>EC</p>
    <img src={arrow_down} alt='arrow_down'/>
    </div>
    <div className='logo-bonum'>
      <img src={logo_bonum} alt="Logo-Bonum" />
    </div>
    <div className="login-box">
      <form onSubmit={handleSubmit}>
      <label htmlFor="email" className='nameInput'>Correo Electrónico</label>
        <div className="input-group">
            <div className="input-with-icon">
                <img src={UserIcon} alt="Icono de Correo" className="icon" />
            </div>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresar correo electrónico"
                required
                />

        </div>
        <label htmlFor="password" className='nameInput'>Contraseña</label>
        <div className="input-group">
            <div className="input-with-icon">
                <img src={PasswordIcon} alt="Icono de Contraseña" className="icon" />
            </div>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar contraseña"
                required
                />

        </div>
        <div className='lost-password'>
            <p>¿Olvidaste tu contraseña?</p>
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
