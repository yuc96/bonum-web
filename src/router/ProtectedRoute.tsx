// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
 // Importación de la librería alternativa

interface ProtectedRouteProps {
  children: React.ReactNode;
}


interface DecodedToken {
  exp: number; // El campo de expiración en el JWT (Unix timestamp)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Establecemos el token en el estado
    }
    setLoading(false); // Cambiar el estado a falso cuando se haya cargado el token
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se verifica el token
  }

  if (!token) {
    // Si no hay token, redirigimos a login
    return <Navigate to="/login" replace />;
  }

  // Verificación de expiración del token
  try {
    const decoded = jwtDecode(token) // Decodificamos el token
    if (decoded.exp * 1000 < Date.now()) {  // Multiplica por 1000 si el exp está en milisegundos
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // Si el token no es válido o no se puede decodificar, redirigimos a login
    console.error('Error al decodificar el token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // Si el token es válido y no ha expirado, renderizamos el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
