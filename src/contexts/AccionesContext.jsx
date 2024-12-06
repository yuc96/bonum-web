import React, { createContext, useState } from 'react'

export const AccionContext = createContext()

export const AccionesContext = ({ children }) => {

    const [recargarDatos, setRecargarDatos] = useState(false);

    const accionDatos = () => {
        setRecargarDatos(!recargarDatos);
    };

    return (
        <AccionContext.Provider
            value={{
                recargarDatos,
                accionDatos
            }}
        >
            {children}
        </AccionContext.Provider>
    )

}