import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Empleados = lazy(() => import('../pages/empleados/Empleados'));
const Productos = lazy(() => import('../pages/productos/Productos'));
const Anticipos = lazy(() => import('../pages/anticipos/Anticipos'));
const Cobros = lazy(() => import('../pages/cobros/Cobros'));
const Pagos = lazy(() => import('../pages/pagos/Pagos'));
const PagosPendientes = lazy(() => import('../pages/pagos/screens/PagosPendientes'));
const HistorialEmpleado =  lazy(() => import('../pages/empleados/screens/HistorialEmpleado'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    //Employees
    {
        path: '/empleados',
        element: <Empleados />,
        layout: 'default',
    },
    //Products
    {
        path: '/productos',
        element: <Productos />,
        layout: 'default',
    },
    //Anticipos
    {
        path: '/anticipos',
        element: <Anticipos />,
        layout: 'default',
    },
    //Cobros
    {
        path: '/cobros',
        element: <Cobros/>,
        layout: 'default',
    },
    //Pagos
    {
        path: '/pagos',
        element: <Pagos/>,
        layout: 'default',
    },
    //Pagos Pendientes
    {
        path: '/pagos/:id',
        element: <PagosPendientes/>,
        layout: 'default',
    },
    //Historiales
    {
        path: '/empleados/historial',
        element: <HistorialEmpleado/>,
        layout: 'default',
    }

];

export { routes };
