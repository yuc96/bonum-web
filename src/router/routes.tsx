import { Login } from '@mui/icons-material';
import { patch } from '@mui/material';
import { lazy } from 'react';
import React from 'react';  // Agregar esta línea al principio del archivo

import ProtectedRoute from './ProtectedRoute';  // Importar el componente de protección

// Rutas Lazy Loaded
const Logins = lazy(() => import('../pages/login/login'));
const Index = lazy(() => import('../pages/Index'));
const Empleados = lazy(() => import('../pages/empleados/Empleados'));
const Productos = lazy(() => import('../pages/productos/Productos'));
const Anticipos = lazy(() => import('../pages/anticipos/Anticipos'));
const Cobros = lazy(() => import('../pages/cobros/Cobros'));
const Pagos = lazy(() => import('../pages/pagos/Pagos'));
const PagosPendientes = lazy(() => import('../pages/pagos/screens/PagosPendientes'));
const HistorialEmpleado = lazy(() => import('../pages/empleados/screens/HistorialEmpleado'));

const routes = [
    // Ruta de login, accesible sin autenticación
    {
        path: '/login',
        element: <Logins />,
        layout: React.Fragment,  // Usamos React.Fragment para no aplicar un layout
      },

    // Ruta principal, protegida
    {
        path: '/',
        element: (
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    // Rutas protegidas
    {
        path: '/empleados',
        element: (
          <ProtectedRoute>
            <Empleados />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/productos',
        element: (
          <ProtectedRoute>
            <Productos />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/anticipos',
        element: (
          <ProtectedRoute>
            <Anticipos />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/cobros',
        element: (
          <ProtectedRoute>
            <Cobros />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/pagos',
        element: (
          <ProtectedRoute>
            <Pagos />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/pagos/:id',
        element: (
          <ProtectedRoute>
            <PagosPendientes />
          </ProtectedRoute>
        ),
        layout: 'default',
    },

    {
        path: '/empleados/historial',
        element: (
          <ProtectedRoute>
            <HistorialEmpleado />
          </ProtectedRoute>
        ),
        layout: 'default',
    },
];

export { routes };
