import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { AccionesContext } from './contexts/AccionesContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AccionesContext>
            <Suspense>
                <Provider store={store}>
                    <MantineProvider>
                        <RouterProvider router={router} />
                    </MantineProvider>
                </Provider>
            </Suspense>
        </AccionesContext>
    </React.StrictMode>
);

