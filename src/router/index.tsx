import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
  // Si la ruta es de login, no aplicar ningún layout (React.Fragment)
  if (route.path === '/login') {
    return {
      ...route,
      element: route.element,  // No aplicar un layout
    };
  }

  // Para otras rutas, aplicar el layout correspondiente
  return {
    ...route,
    element: route.layout === 'blank'
      ? <BlankLayout>{route.element}</BlankLayout>
      : <DefaultLayout>{route.element}</DefaultLayout>,
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
