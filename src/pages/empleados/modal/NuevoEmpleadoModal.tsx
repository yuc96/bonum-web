
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect, useContext } from 'react';
import { create_empleados } from '../../../server/empleados/EmpleadosApi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AccionContext } from '../../../contexts/AccionesContext';

const NuevoEmpleadoModal = (
    {
        openModal,
        setOpenModal,
    }
        :
        {
            openModal: boolean;
            setOpenModal: (isOpen: boolean) => void;
        }
) => {

    const { accionDatos } = useContext( AccionContext );

    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const [fechaNac, setFechaNac] = useState<Dayjs | null>(null);

    const [nivelEducativo, setNivelEducativo] = useState('');

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');
    const [provincia, setProvincia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccionPrincipal, setDireccionPrincipal] = useState('');
    const [numero, setNumero] = useState('');
    const [direccionSecundaria, setDireccionSecundaria] = useState('');

    const [codigoEmpresa, setCodigoEmpresa] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState<Dayjs | null>(null);
    const [cargo, setCargo] = useState('');
    const [sueldoBruto, setSueldoBruto] = useState('');
    const [sueldoNeto, setSueldoNeto] = useState('');
    const [otrosIngresos, setOtrosIngresos] = useState('');
    const [observaciones, setObservaciones] = useState('');



    const handleCreateEmpleado = (data: any) => {

        create_empleados(data)
            .then((res) => {
                accionDatos();
                setOpenModal(false);

            })
            .catch((err) => {
                console.log("Error API: ", err)
            })

    }

    const editDate = (newValue: any) => {
        if (newValue) {
            const formattedDate = newValue.format("YYYY-MM-DD");
            return formattedDate
        }
    };

    return (

        <Transition
            appear
            show={openModal}
            as={Fragment}>
            <Dialog
                as="div"
                open={openModal} onClose={() => setOpenModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="fadein_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center min-h-screen px-4">
                        <Dialog.Panel
                            style={{
                                backgroundColor: 'white',
                                margin: window.screen.height * 0.025,
                                //borderRadius: 10,
                                width: window.screen.width * 0.577,

                            }}
                        >
                            <div
                                style={{
                                    //backgroundColor: 'red',
                                    paddingTop: 10,
                                    paddingLeft: 22,
                                    color: '#0E1726',
                                    //fontFamily: Nunito,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'space-between'
                                }}
                            >
                                <p> Agregar Empleado</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }} onClick={() => { setOpenModal(false) }}>
                                    <path d="M18 6L6 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 6L18 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>

                            <div
                                style={{
                                    //padding: 20,
                                    paddingTop: 10,
                                    paddingLeft: 20,
                                    paddingRight: 10,
                                    paddingBottom: 10
                                    //backgroundColor: 'green'
                                }}
                            >

                                <form>

                                    <div

                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 10,
                                            marginBottom: 15,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Datos Personales</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            //backgroundColor: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Cedula de identidad</label>
                                            <input
                                                onChange={(e) => setCedula(e.target.value)}
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Nombres </label>
                                            <input
                                                onChange={(e) => setNombre(e.target.value)}
                                                placeholder="Ingresar nombres completos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Apellidos </label>
                                            <input
                                                onChange={(e) => setApellido(e.target.value)}
                                                placeholder="Ingresar dos apellidos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'pink',
                                            marginTop: window.screen.height * 0.01,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02
                                        }}
                                    >


                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Fecha de nacimiento </label>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    onChange={(newValue) => setFechaNac(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            placeholder: 'Fecha',
                                                            fullWidth: true,
                                                            InputLabelProps: {
                                                                shrink: true,
                                                            },
                                                            inputProps: {
                                                                readOnly: true,
                                                            },
                                                            sx: {
                                                                width: window.screen.width * 0.17,
                                                                '& .MuiInputBase-root': {
                                                                    height: window.screen.height * 0.05,
                                                                    marginTop: window.screen.height * 0.0005,
                                                                    fontSize: 14,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    fontFamily: 'Maven Pro',
                                                                    backgroundColor: 'white',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '4px',
                                                                    boxShadow: 'none',
                                                                    transition: 'none',
                                                                    '&:hover': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&.Mui-focused': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    border: 'none',
                                                                },
                                                                '& .MuiInputBase-input': {
                                                                    '::placeholder': {
                                                                        //color: '#888EA8',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 600,
                                                                        lineHeight: 'normal',
                                                                        fontFamily: 'Maven Pro',
                                                                        // fontSize: 13,
                                                                        // fontFamily: 'serif',
                                                                        // fontWeight: 600,
                                                                        color: '#0E1726',
                                                                        opacity: 1
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            {/* <label> Nivel educativo </label>
                                            <input
                                                onChange={(e) => setNivelEducativo(e.target.value)}
                                                placeholder="Ingresar nivel educativo"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            /> */}
                                            <label>Nivel educativo</label>
                                            <select
                                            onChange={(e) => setNivelEducativo(e.target.value)}
                                            className="form-input"
                                            style={{
                                                width: window.screen.width * 0.17,
                                                height: '5vh',
                                            }}
                                            >
                                            {/* Opciones del desplegable */}
                                            <option value="" disabled selected>
                                                Seleccionar nivel educativo
                                            </option>
                                            <option value="Ninguno">Ninguno</option>
                                            <option value="Primaria">Primaria</option>
                                            <option value="Secundaria">Secundaria</option>
                                            <option value="Técnico">Técnico</option>
                                            <option value="Tecnológico">Tecnológico</option>
                                            <option value="Universitario">Universitario</option>
                                            <option value="Posgrado">Posgrado</option>
                                            <option value="Doctorado">Doctorado</option>
                                            </select>

                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            //marginBottom: window.screen.height * 0.01,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Datos de Contacto</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            //background: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Correo Electrónico </label>
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Ingresar correo electronico"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Teléfono Móvil </label>
                                            <input
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Ingresar numero de celular"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Teléfono Fijo </label>
                                            <input
                                                onChange={(e) => setNumber(e.target.value)}
                                                placeholder="Ingresar numero de teléfono"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'orange',
                                            fontSize: 14,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >

                                        <label
                                            style={{
                                                marginTop: 5
                                            }}
                                        >
                                            Dirección
                                        </label>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'cyan',
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                onChange={(e) => setProvincia(e.target.value)}
                                                placeholder="Provincia"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                onChange={(e) => setCiudad(e.target.value)}
                                                placeholder="Ciudad"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                    //marginLeft: window.screen.width * 0.015
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'red',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: window.screen.height * 0.015,
                                                gap: window.screen.width * 0.01,
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                onChange={(e) => setDireccionPrincipal(e.target.value)}
                                                placeholder="Ingresar direccion principal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.24,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                onChange={(e) => setNumero(e.target.value)}
                                                placeholder="Número"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.07,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                onChange={(e) => setDireccionSecundaria(e.target.value)}
                                                placeholder="Ingresar dirección transversal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.22,
                                                    height: '5vh'
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 20,
                                                marginBottom: 10,
                                                fontSize: 15,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <p> Datos Laborales </p>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'yellow'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Código de Empresa </label>
                                                <input
                                                    onChange={(e) => setCodigoEmpresa(e.target.value)}
                                                    placeholder="Código de Empresa"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Fecha de Ingreso </label>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DatePicker
                                                        onChange={(newValue) => setFechaIngreso(newValue)}
                                                        slotProps={{
                                                            textField: {
                                                                placeholder: 'Fecha',
                                                                fullWidth: true,
                                                                InputLabelProps: {
                                                                    shrink: true,
                                                                },
                                                                inputProps: {
                                                                    readOnly: true,
                                                                },
                                                                sx: {
                                                                    width: window.screen.width * 0.17,
                                                                    '& .MuiInputBase-root': {
                                                                        height: window.screen.height * 0.05,
                                                                        marginTop: window.screen.height * 0.0005,
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 300,
                                                                        lineHeight: 'normal',
                                                                        backgroundColor: 'white',
                                                                        border: '1px solid #E0E6ED',
                                                                        borderRadius: '4px',
                                                                        boxShadow: 'none',
                                                                        transition: 'none',
                                                                        fontFamily: 'Maven Pro',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                        '&.Mui-focused': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                    },
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        '::placeholder': {
                                                                            //color: '#888EA8',
                                                                            fontSize: 14,
                                                                            fontStyle: 'normal',
                                                                            fontWeight: 600,
                                                                            lineHeight: 'normal',
                                                                            // fontSize: 13,
                                                                            // fontFamily: 'serif',
                                                                            // fontWeight: 600,
                                                                            color: '#0E1726',
                                                                            opacity: 1,
                                                                            fontFamily: 'Maven Pro',
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </LocalizationProvider>
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Cargo </label>
                                                <input
                                                    onChange={(e) => setCargo(e.target.value)}
                                                    placeholder="Ingresar cargo"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'purple',
                                                marginTop: window.screen.height * 0.01,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Sueldo Bruto </label>
                                                <input
                                                    onChange={(e) => setSueldoBruto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Sueldo Neto </label>
                                                <input
                                                    onChange={(e) => setSueldoNeto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Otros ingresos </label>
                                                <input
                                                    onChange={(e) => setOtrosIngresos(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                marginTop: window.screen.height * 0.01,
                                                //backgroundColor: 'cyan'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Observaciones </label>
                                                <textarea
                                                    onChange={(e) => setObservaciones(e.target.value)}
                                                    placeholder="Ingresar observaciones"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.55,
                                                        height: window.screen.height * 0.11,
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </form>

                                <div className="flex justify-center items-center mt-2 mb-10">
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        type="button"
                                        className="btn btn-outline-danger"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {

                                            const data = {
                                                "identification_number": cedula,
                                                "name": nombre,
                                                "lastname": apellido,
                                                "address": direccionPrincipal,
                                                "date_of_birth": editDate(fechaNac),
                                                "level_education": nivelEducativo,
                                                "email": email,
                                                "phoneMovil": phone,
                                                "phoneFijo": number,
                                                "provincia": provincia,
                                                "ciudad": ciudad,
                                                "street_primary": direccionSecundaria,
                                                "address_secondary": direccionSecundaria,
                                                "company_code": codigoEmpresa,
                                                "job_title": cargo,
                                                "gross_salary": sueldoBruto,
                                                "net_salary": sueldoNeto,
                                                "other_income": otrosIngresos,
                                                "observations": observaciones,
                                                "status": 'active'
                                            }

                                            /*
                                            const data = {
                                                "identification_number": "1003836721",
                                                "name": "Juan",
                                                "lastname": "Pérez",
                                                "address": "Calle 123, Edificio A, Quito",
                                                "date_of_birth": "1985-06-15",
                                                "level_education": "Universitario",
                                                "email": "juan.perez77@example.com",
                                                "phoneMovil": "0987654321",
                                                "phoneFijo": "022345678",
                                                "provincia": "Pichincha",
                                                "ciudad": "Quito",
                                                "street_primary": "Calle Principal",
                                                "address_secondary": "Calle Secundaria",
                                                "company_code": "EMP1277",
                                                "job_title": "Ingeniero de Software",
                                                "gross_salary": 3000,
                                                "net_salary": 2400,
                                                "other_income": 200,
                                                "observations": "Empleado destacado en proyectos de desarrollo.",
                                                "status": "active"
                                            }*/

                                            handleCreateEmpleado(data)

                                        }}
                                        type="button"
                                        style={{
                                            width: window.screen.width * 0.067,
                                            height: window.screen.height * 0.05,
                                            marginLeft: window.screen.width * 0.005,
                                            backgroundColor: '#bf5cf3',
                                            padding: 5,
                                            borderRadius: 5,
                                            color: 'white',
                                            fontSize: 14,
                                            fontFamily: 'Maven Pro',
                                            fontWeight: 600,
                                        }}>
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

        </Transition>

    )

}

export default NuevoEmpleadoModal;
