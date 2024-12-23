import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect, useContext, useRef } from 'react';
import { create_empleados } from '../../../server/empleados/EmpleadosApi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { AccionContext } from '../../../contexts/AccionesContext';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import  MensajeModal from './MensajeModal';
import ModalEmpleadoCreado from "./ModalNuevoEmpleado";
import path from 'path';


const Tooltip = ({
    show,
    message,
    top,
    left,
  }: {
    show: boolean;
    message: string;
    top: string;
    left: string;
  }) => {
    if (!show) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: top,
          left: left,
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '8px',
          padding: '5px',
          fontSize: '12px',
          marginTop: '5px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      >
        {message}
      </div>
    );
  };

const NuevoEmpleadoModal = (

    {
        openModal,
        setOpenModal,
        // openMessage,
        // setOpenMessage,

    }
        :
        {
            openModal: boolean;
            setOpenModal: (isOpen: boolean) => void;
            // openMessage: boolean;
            // setOpenMessage: (isOpen: boolean) => void;
        }
) => {

    const { accionDatos } = useContext(AccionContext);

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


   // Control Modal de Errores o Confirmacion de Éxito

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [errores, setErrores] = useState<string[] | null>(null);
    const [erroresLabel,setErroresLabel]=useState<{ msg: string; path: string }[]>([]);

    const resetForm = () => {
        setCedula('');
        setNombre('');
        setApellido('');
        setFechaNac(null);
        setNivelEducativo('');
        setEmail('');
        setPhone('');
        setNumber('');
        setProvincia('');
        setCiudad('');
        setDireccionPrincipal('');
        setNumero('');
        setDireccionSecundaria('');
        setCodigoEmpresa('');
        setFechaIngreso(null);
        setCargo('');
        setSueldoBruto('');
        setSueldoNeto('');
        setOtrosIngresos('');
        setObservaciones('');
        setOpenModalCreate(false);
        setMensaje(null);
        setErrores(null);
        setErroresLabel([]);
      };
    const handleCloseModal = () => {
        setOpenModalCreate(false); // Cierra el modal
        setMensaje(null); // Limpiar el mensaje al cerrar el modal
        setErrores(null); // Limpiar errores al cerrar el modal
    };

    const refs = useRef<Record<string, HTMLInputElement | null>>({});

      // Actualiza el color del placeholder dinámicamente para todos los inputs
      useEffect(() => {
        // Actualiza el color del placeholder dinámicamente para todos los inputs
        Object.keys(refs.current).forEach((key) => {
          const inputElement = refs.current[key];
          if (inputElement) {
            const hasError = erroresLabel.some((error) => error.path === key);
            inputElement.style.setProperty(
              '--placeholder-color',
              hasError ? 'rgb(237, 129, 135)' : 'gray' // Cambia entre rojo y gris
            );
          }
        });
      }, [erroresLabel]);

    // Método para registrar referencias dinámicamente
    const setInputRef = (key: string, element: HTMLInputElement | null) => {
        if (element) {
        refs.current[key] = element;
        } else {
        delete refs.current[key];
        }
    };

// Tooltip Perzonalizado

const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({
    cedula: false,
    nombre: false,
    apellido:false,
    fechanacimiento:false,
    telefono:false,
    correo:false,
    provincia:false,
    ciudad:false,
    niveleducativo:false,
    domicilio:false,
    cargo:false,
    sueldoBruto:false,
    sueldoNeto:false,

  });



  const handleCreateEmpleado = (data: any) => {
    create_empleados(data)
      .then((res) => {
        // Verifica si la respuesta del servidor tiene un código de éxito (2xx)
        console.log('Esto es Resss:::::::::');
        console.log(res);
        if (res.success || res.success===undefined) {
          console.log(res);
          accionDatos();
          setMensaje("Empleado creado con éxito");
          setErrores(null); // Limpia los errores si la creación fue exitosa
          setOpenModalCreate(true); // Abre el modal para mostrar éxito

          // Introducir un delay de 900ms antes de cerrar el modal
          setTimeout(() => {
            setOpenModal(false); // Cierra el modal después de 900ms
            setOpenModalCreate(false);
          }, 900); // 900 milisegundos = 0.9 segundos
        } else if (res.success === false) {
            // Manejar el mensaje general de error
            setMensaje(res?.message || "Error desconocido en la creación del empleado");



            // Verificar si `res.details` existe y es un array
            if (Array.isArray(res.details) && res.details.length > 0) {


                    // Guardamos el mensaje (msg) y el path en la variable errores
               const newErrores = res.details.map((error: any) => ({
                   msg: error.msg,
                   path: error.path
               }));
               setErroresLabel(newErrores); // Actualiza el estado con el nuevo array
               console.log('ESTO ES MIII ERRORESLABEL')
               console.log(erroresLabel[0].path)  ;
                // Si `res.details[0].msg` está definido
                if (res.details[0].msg !== undefined) {
                    // setErrores(
                    // res.details.map((errorDetail: any) => errorDetail.msg)
                    // );
                    setErrores([res.details[0].message || 'Existen campos vacíos o inválidos. Por favor, revisa los datos ingresados']);
                } else {

                    setErrores([res.details[0].message || "Error desconocido"]);
                }
            } else {
              console.log('No hay detalles de error disponibles');
              setErrores(["No hay detalles de error disponibles"]);
            }
              setOpenModalCreate(true);
          }

      })
      .catch((err) => {
        // Aquí se manejan los errores que vienen del backend pero esta parte no sirve, ya que los errores se manejan |^|,
        //mantenida para atrapar cualquieri otro error por parte del servidor                                         |^|
        if (err.response) {
          // Si hay una respuesta del backend (errores HTTP)
          console.log('error');
          console.log(err);
          const { error, details } = err.response.data;

          // Verifica si hay detalles de validación y maneja los errores
          if (details) {
            setMensaje(null); // No hay mensaje de éxito
            setErrores(
              Array.isArray(details)
                ? details.map((errorDetail: any) => errorDetail.message)
                : [details]
            );
          } else {
            // Si no hay detalles, muestra un error genérico
            setErrores([error || "Error desconocido"]);
          }
        } else {
          // Si no hay respuesta del backend (posiblemente un error de red)
          setErrores(["Error de conexión con el servidor"]);
        }

        // Abre el modal para mostrar los errores
        setOpenModalCreate(true);
        console.log("Error API: ", err);
      });
  };



    const editDate = (newValue: any) => {
        if (newValue) {
            const formattedDate = newValue.format("YYYY-MM-DD");
            return formattedDate
        }
    };

    const [nivelEducacion, setNivelEducacion] = useState("");
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

    const handleComboEducativo = (event: any) => {
        setNivelEducacion(event.target.value);
    };

    const provincias = [
        "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro",
        "Esmeraldas", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago",
        "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
        "Sucumbíos", "Tungurahua", "Zamora-Chinchipe"
    ];

    const handleProvinciaChange = (event: any) => {
        setProvinciaSeleccionada(event.target.value);
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
                                width: '778px',
                                borderRadius: 6

                            }}
                        >
                            <div
                                style={{
                                    //backgroundColor: 'red',
                                    paddingTop: 14,
                                    paddingBottom: 13,
                                    paddingLeft: 20,
                                    color: '#0E1726',
                                    //fontFamily: Nunito,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'space-between'
                                }}
                            >
                                <p> Agregar Colaborador</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ marginRight: 10, cursor: 'pointer' }}
                                    onClick={() =>
                                        {
                                            setOpenModal(false)
                                            setOpenModalCreate(false)// Cierra el modal
                                            // setErrores(null);
                                            // setMensaje(null); // Limpiar el mensaje al cerrar el modal
                                            // setErroresLabel([]);//Limpio mensajes de error
                                            resetForm();
                                        }
                                    }
                                >
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
                                    paddingBottom: 10,
                                    // backgroundColor: 'green',
                                }}
                                >

                                <form>
                                <div style={{ position: 'relative' }}>
                                    <style>
                                    {`
                                            .input-style::placeholder {
                                                font-weight: 400; /* Elimina la negrita */
                                                font-style: normal;
                                                font-family: 'Maven Pro', sans-serif;
                                                color: #b0b0b0; /* Cambia el color si lo deseas */
                                                padding:5px;
                                            }

                                            .input-style {
                                                width: 222px;
                                                height: 38px;
                                                flex-shrink: 0;
                                                font-size: 14px;
                                                color: #0E1726;
                                                font-style: normal;
                                                font-weight: 400;
                                                line-height: normal;
                                                font-family: 'Maven Pro', sans-serif;
                                                padding:10px;
                                            }
                                        `}
                                    </style>
                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 10,
                                            marginBottom: 15,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
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

                                        <div>

                                                <label
                                                    style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    }}
                                                >
                                                    <p style={{ margin: 0 }}>Cedula de identidad</p>
                                                    <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, cedula: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, cedula: false })} // Ocultar tooltip cuando se quita el mouse
                                                    >
                                                    *
                                                    </span>
                                                </label>

                                                <Tooltip
                                                    show={showTooltip.cedula}
                                                    message="Este campo es obligatorio"
                                                    top="5%" // Posición relativa al campo
                                                    left="150px" // Ajusta según el espacio disponible
                                                />




                                            <input
                                                ref={(el) => setInputRef('identification_number', el)}
                                                onChange={(e) => setCedula(e.target.value)}
                                                placeholder="Ingresar número de cédula"
                                                className="input-style"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color:'ed8187' ,//'#0E1726', erroresLabel.some(error => error.path === "identification_number") ? 'ed8187' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    border: '1px solid #E0E6ED',
                                                    borderRadius:'6px',
                                                    backgroundColor: erroresLabel.some(error => error.path === "identification_number") ? 'rgb(253, 241, 242)' : 'white',

                                                }}

                                            />
                                             <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "identification_number")?.msg || null}
                                            </p>

                                            <style>{`
                                                    input::placeholder {
                                                    color: var(--placeholder-color, gray);
                                                    }
                                            `}</style>
                                        </div>

                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        display:'flex',
                                                        flexDirection:'row',
                                                    }}
                                                >
                                                   <p style={{ margin: 0 }}> Nombre</p>
                                                   <span
                                                        style={{
                                                            color: 'red',               // Asterisco de color rojo
                                                            backgroundColor: 'white',   // Fondo blanco
                                                            borderRadius: '50%',        // Bordes redondeados
                                                            padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                            fontSize: '16px',           // Tamaño del texto
                                                            cursor: 'pointer',         // Hace que el puntero sea una mano
                                                            marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                            fontWeight: 'bold',         // Asterisco en negrita
                                                        }}
                                                        onMouseEnter={() => setShowTooltip({ ...showTooltip, nombre: true })}
                                                        onMouseLeave={() => setShowTooltip({ ...showTooltip, nombre: false })}
                                                        >
                                                        *
                                                    </span>
                                                    <Tooltip
                                                    show={showTooltip.nombre}
                                                    message="Este campo es obligatorio"
                                                    top="2%" // Posición relativa al campo
                                                    left="80px" // Ajusta según el espacio disponible
                                                    />
                                                </label>

                                            </div>
                                            <input
                                                onChange={(e) => setNombre(e.target.value)}
                                                placeholder="Ingresar nombres completos"
                                                className="input-style"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF',
                                                    backgroundColor: erroresLabel.some(error => error.path === "name") ? 'rgb(253, 241, 242)' : 'white',
                                                }}
                                            />
                                            <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "name")?.msg || null}
                                            </p>
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    display:'flex',
                                                    flexDirection:'row',
                                                }}
                                            >

                                                <p style={{ margin: 0 }}>Apellido</p>
                                                <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, apellido: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, apellido: false })}
                                                    >
                                                    *
                                                </span>
                                                <Tooltip
                                                    show={showTooltip.apellido}
                                                    message="Este campo es obligatorio"
                                                    top="6%" // Posición relativa al campo
                                                    left="570px" // Ajusta según el espacio disponible
                                                />
                                            </label>
                                            <input
                                                onChange={(e) => setApellido(e.target.value)}
                                                placeholder="Ingresar dos apellidos"
                                                className="input-style"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF',
                                                    backgroundColor: erroresLabel.some(error => error.path === "lastname") ? 'rgb(253, 241, 242)' : 'white',
                                                }}
                                            />
                                             <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "lastname")?.msg || null}
                                            </p>
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


                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    display:'flex',
                                                    flexDirection:'row',
                                                }}
                                            >


                                                <p style={{ margin: 0 }}>Fecha de nacimiento </p>
                                                <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, fechanacimiento: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, fechanacimiento: false })}
                                                    >
                                                    *
                                                </span>
                                                <Tooltip
                                                    show={showTooltip.fechanacimiento}
                                                    message="Este campo es obligatorio"
                                                    top="16%" // Posición relativa al campo
                                                    left="160px" // Ajusta según el espacio disponible
                                                />
                                            </label>
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
                                                                width: '222px',
                                                                height: '38px',
                                                                flexShrink: 0,
                                                                '& .MuiInputBase-root': {
                                                                    height: '38px',
                                                                    width: '226px',
                                                                    //height: window.screen.height * 0.05,
                                                                    fontSize: 14,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    fontFamily: 'Maven Pro',
                                                                    backgroundColor: 'white',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '6px',
                                                                    boxShadow: 'none',
                                                                    transition: 'none',
                                                                    '&:hover': {
                                                                        backgroundColor: erroresLabel.some(error => error.path === "date_of_birth") ? 'rgb(253, 241, 242)' : 'white',
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
                                                                        fontWeight: 400,
                                                                        lineHeight: 'normal',
                                                                        fontFamily: 'Maven Pro',
                                                                        // fontSize: 13,
                                                                        // fontFamily: 'serif',
                                                                        // fontWeight: 400,
                                                                        color: '#b0b0b0',
                                                                        opacity: 1
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />

                                            </LocalizationProvider>
                                            <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "date_of_birth")?.msg || null}
                                            </p>
                                        </div>


                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    display:'flex',
                                                    flexDirection:'row',
                                                }}
                                            >



                                                <p style={{ margin: 0 }}>Teléfono</p>
                                                <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, telefono: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, telefono: false })}
                                                    >
                                                    *
                                                </span>
                                                <Tooltip
                                                    show={showTooltip.telefono}
                                                    message="Este campo es obligatorio"
                                                    top="16%" // Posición relativa al campo
                                                    left="330px" // Ajusta según el espacio disponible
                                                />
                                            </label>
                                            <input
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Ingresar numero de celular"
                                                className="input-style"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF',
                                                    backgroundColor: erroresLabel.some(error => error.path === "phoneMovil") ? 'rgb(253, 241, 242)' : 'white',
                                                }}
                                            />
                                                <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "phoneMovil")?.msg || null}
                                                </p>
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    display:'flex',
                                                    flexDirection:'row',
                                                }}
                                            >

                                            <p style={{ margin: 0 }}>  Correo Electrónico </p>
                                            <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, correo: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, correo: false })}
                                                    >
                                                    *
                                            </span>
                                            <Tooltip
                                                    show={showTooltip.correo}
                                                    message="Este campo es obligatorio"
                                                    top="10%" // Posición relativa al campo
                                                    left="600px" // Ajusta según el espacio disponible
                                                />
                                            </label>
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Ingresar correo electronico"
                                                className="input-style"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF',
                                                    backgroundColor: erroresLabel.some(error => error.path === "email") ? 'rgb(253, 241, 242)' : 'white',
                                                }}
                                            />
                                               <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "email")?.msg || null}
                                                </p>
                                        </div>

                                    </div>

                                    <div
                                         style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            // backgroundColor: 'cyan',
                                            fontSize: 14,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                            marginTop:'20px',
                                            gap: window.screen.width * 0.02,

                                        }}
                                    >

                                        {/* <p>Holi</p> */}

                                        <div>
                                        <label
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'revert',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                                display:'flex',
                                                flexDirection:'row',

                                            }}
                                        >

                                            <p style={{ margin: 0 }}>  Provincia </p>
                                            <span
                                                    style={{
                                                        color: 'red',               // Asterisco de color rojo
                                                        backgroundColor: 'white',   // Fondo blanco
                                                        borderRadius: '50%',        // Bordes redondeados
                                                        padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                        fontSize: '16px',           // Tamaño del texto
                                                        cursor: 'pointer',         // Hace que el puntero sea una mano
                                                        marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                        fontWeight: 'bold',         // Asterisco en negrita
                                                    }}
                                                    onMouseEnter={() => setShowTooltip({ ...showTooltip, provincia: true })}
                                                    onMouseLeave={() => setShowTooltip({ ...showTooltip, provincia: false })}
                                                    >
                                                    *
                                            </span>
                                            <Tooltip
                                                    show={showTooltip.provincia}
                                                    message="Este campo es obligatorio"
                                                    top="26%" // Posición relativa al campo
                                                    left="95px" // Ajusta según el espacio disponible
                                                />
                                        </label>
                                        <FormControl
                                                sx={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    '& .MuiOutlinedInput-root': {
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    height: '38px',
                                                    backgroundColor: erroresLabel.some(error => error.path === "provincia") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    '& fieldset': {
                                                        borderColor: '#E0E6ED',

                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#E0E6ED',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E0E6ED',
                                                        borderWidth: '1px',
                                                    },
                                                    },
                                                    '& .MuiSelect-select': {
                                                    padding: '8px',
                                                    color: provinciaSeleccionada === '' ? '#B0B0B0' : '#0E1726', // Cambiar color del placeholder
                                                    },
                                                }}
                                                >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={provinciaSeleccionada}
                                                    onChange={handleProvinciaChange}
                                                    displayEmpty
                                                    MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                        '& .MuiMenuItem-root': {
                                                            fontFamily: 'Maven Pro',
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            color: '#0E1726',
                                                        },
                                                        },
                                                    },
                                                    }}
                                                >
                                                    <MenuItem value="" sx={{
                                                    fontFamily: 'Maven Pro',
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    color: '#B0B0B0', // Cambiar el color del texto del placeholder
                                                    paddingLeft: '12px',
                                                    }}>
                                                    &nbsp;Provincia
                                                    </MenuItem>
                                                    {provincias.map((provincia, index) => (
                                                    <MenuItem key={index} value={provincia}>
                                                        &nbsp;{provincia}
                                                    </MenuItem>
                                                    ))}
                                                </Select>
                                                </FormControl>
                                                <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                        {erroresLabel.find(error => error.path === "provincia")?.msg || null}
                                                </p>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        // color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        display:'flex',
                                                        flexDirection:'row',

                                                    }}
                                                >
                                                    <p style={{ margin: 0 }}>Ciudad</p>
                                                    <span
                                                        style={{
                                                            color: 'red',               // Asterisco de color rojo
                                                            backgroundColor: 'white',   // Fondo blanco
                                                            borderRadius: '50%',        // Bordes redondeados
                                                            padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                            fontSize: '16px',           // Tamaño del texto
                                                            cursor: 'pointer',         // Hace que el puntero sea una mano
                                                            marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                            fontWeight: 'bold',

                                                        }}
                                                        onMouseEnter={() => setShowTooltip({ ...showTooltip, ciudad: true })}
                                                        onMouseLeave={() => setShowTooltip({ ...showTooltip, ciudad: false })}
                                                    >
                                                        *
                                                    </span>
                                                    </label>
                                                    <Tooltip
                                                        show={showTooltip.ciudad}
                                                        message="Este campo es obligatorio"
                                                        top="24%" // Posición relativa al campo
                                                        left="600px" // Ajusta según el espacio disponible
                                                    />
                                                    <FormControl
                                                            sx={{
                                                                width: '222px',
                                                                height: '38px',
                                                                '& .MuiOutlinedInput-root': {
                                                                fontSize: 14,
                                                                color: '#0E1726',
                                                                fontStyle: 'normal',
                                                                fontWeight: 400,
                                                                lineHeight: 'normal',
                                                                fontFamily: 'Maven Pro',
                                                                borderRadius: '6px',
                                                                backgroundColor: erroresLabel.some(error => error.path === "ciudad") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                                height: '38px',
                                                                '& fieldset': {
                                                                    borderColor: '#E0E6ED',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: '#E0E6ED',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#E0E6ED',
                                                                    borderWidth: '1px',
                                                                },
                                                                },
                                                                '& .MuiSelect-select': {
                                                                padding: '8px',
                                                                color: ciudad === '' ? '#B0B0B0' : '#0E1726',
                                                                },
                                                            }}
                                                            >
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={ciudad}
                                                                onChange={(e) => setCiudad(e.target.value)}
                                                                displayEmpty
                                                                MenuProps={{
                                                                PaperProps: {
                                                                    sx: {
                                                                    '& .MuiMenuItem-root': {
                                                                        fontFamily: 'Maven Pro',
                                                                        fontSize: '14px',
                                                                        fontWeight: 400,
                                                                        color: '#0E1726',
                                                                    },
                                                                    },
                                                                },
                                                                }}
                                                            >
                                                                <MenuItem
                                                                value=""
                                                                sx={{
                                                                    fontFamily: 'Maven Pro',
                                                                    fontSize: '14px',
                                                                    fontWeight: 400,
                                                                    color: '#B0B0B0',
                                                                    paddingLeft: '12px',
                                                                }}
                                                                >
                                                                Seleccione una ciudad
                                                                </MenuItem>
                                                                <MenuItem value="Quito">Quito</MenuItem>
                                                                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                                                                <MenuItem value="Cuenca">Cuenca</MenuItem>
                                                                <MenuItem value="Santo Domingo">Santo Domingo</MenuItem>
                                                                <MenuItem value="Machala">Machala</MenuItem>
                                                                <MenuItem value="Durán">Durán</MenuItem>
                                                                <MenuItem value="Ambato">Ambato</MenuItem>
                                                                <MenuItem value="Manta">Manta</MenuItem>
                                                                <MenuItem value="Portoviejo">Portoviejo</MenuItem>
                                                                <MenuItem value="Loja">Loja</MenuItem>
                                                            </Select>
                                                            </FormControl>
                                                            <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                                {erroresLabel.find(error => error.path === "ciudad")?.msg || null}
                                                            </p>
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
                                                        <label
                                                            style={{
                                                                fontSize: 14,
                                                                color: '#0E1726',
                                                                fontStyle: 'normal',
                                                                fontWeight: 400,
                                                                lineHeight: 'normal',
                                                                fontFamily: 'Maven Pro',
                                                                display:'flex',
                                                                flexDirection:'row',
                                                            }}
                                                        >

                                                            <p style={{ margin: 0 }}>   Nivel educativo </p>
                                                                <span
                                                                        style={{
                                                                            color: 'red',               // Asterisco de color rojo
                                                                            backgroundColor: 'white',   // Fondo blanco
                                                                            borderRadius: '50%',        // Bordes redondeados
                                                                            padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                                            fontSize: '16px',           // Tamaño del texto
                                                                            cursor: 'pointer',         // Hace que el puntero sea una mano
                                                                            marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                                            fontWeight: 'bold',         // Asterisco en negrita
                                                                        }}
                                                                        onMouseEnter={() => setShowTooltip({ ...showTooltip, niveleducativo: true })}
                                                                        onMouseLeave={() => setShowTooltip({ ...showTooltip, niveleducativo: false })}
                                                                        >
                                                                        *
                                                                </span>
                                                                <Tooltip
                                                                    show={showTooltip.niveleducativo}
                                                                    message="Este campo es obligatorio"
                                                                    top="24%" // Posición relativa al campo
                                                                    left="600px" // Ajusta según el espacio disponible
                                                                />
                                                        </label>
                                                        <FormControl
                                                                sx={{
                                                                    width: '222px',
                                                                    height: '38px',
                                                                    '& .MuiOutlinedInput-root': {
                                                                    fontSize: 14,
                                                                    color: '#0E1726',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 400,
                                                                    lineHeight: 'normal',
                                                                    fontFamily: 'Maven Pro',
                                                                    borderRadius: '6px',
                                                                    backgroundColor: erroresLabel.some(error => error.path === "level_education") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                                    height: '38px',
                                                                    '& fieldset': {
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: '#E0E6ED',
                                                                        borderWidth: '1px',
                                                                    },
                                                                    },
                                                                    '& .MuiSelect-select': {
                                                                    padding: '8px',
                                                                    color: nivelEducacion === '' ? '#B0B0B0' : '#0E1726', // Cambiar color del placeholder
                                                                    },
                                                                }}
                                                                >
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={nivelEducacion}
                                                                    onChange={handleComboEducativo}
                                                                    displayEmpty
                                                                    MenuProps={{
                                                                    PaperProps: {
                                                                        sx: {
                                                                        '& .MuiMenuItem-root': {
                                                                            fontFamily: 'Maven Pro',
                                                                            fontSize: '14px',
                                                                            fontWeight: 400,
                                                                            color: '#0E1726',
                                                                        },
                                                                        },
                                                                    },
                                                                    }}
                                                                >
                                                                    <MenuItem value="" sx={{
                                                                    fontFamily: 'Maven Pro',
                                                                    fontSize: '14px',
                                                                    fontWeight: 400,
                                                                    color: '#B0B0B0', // Cambiar el color del texto del placeholder
                                                                    paddingLeft: '12px',
                                                                    }}>
                                                                    Niv. Educativo
                                                                    </MenuItem>
                                                                    <MenuItem value="Ninguno">Ninguno</MenuItem>
                                                                    <MenuItem value="Primaria">Primaria</MenuItem>
                                                                    <MenuItem value="Secundaria">Secundaria</MenuItem>
                                                                    <MenuItem value="Técnico">Técnico</MenuItem>
                                                                    <MenuItem value="Tecnológico">Tecnológico</MenuItem>
                                                                    <MenuItem value="Universitario">Universitario</MenuItem>
                                                                    <MenuItem value="Posgrado">Posgrado</MenuItem>
                                                                    <MenuItem value="Doctorado">Doctorado</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                                {erroresLabel.find(error => error.path === "level_education")?.msg || null}
                                                            </p>


                                            </div>


                                    </div>



                                    <div>

                                        <div
                                              style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 15,
                                                marginBottom: 15,
                                                fontSize: 15,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',

                                            }}
                                            >
                                            <div
                                                 style={{
                                                    display:'flex',
                                                    flexDirection:'row',
                                                 }}

                                            >
                                            <p style={{ margin: 0 }}>Domicilio </p>
                                                        <span
                                                                style={{
                                                                    color: 'red',               // Asterisco de color rojo
                                                                    backgroundColor: 'white',   // Fondo blanco
                                                                    borderRadius: '50%',        // Bordes redondeados
                                                                    padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                                    fontSize: '16px',           // Tamaño del texto
                                                                    cursor: 'pointer',         // Hace que el puntero sea una mano
                                                                    marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                                    fontWeight: 'bold',         // Asterisco en negrita
                                                                }}
                                                                onMouseEnter={() => setShowTooltip({ ...showTooltip, domicilio: true })}
                                                                onMouseLeave={() => setShowTooltip({ ...showTooltip, domicilio: false })}
                                                                >
                                                                *
                                                        </span>
                                                        <Tooltip
                                                            show={showTooltip.domicilio}
                                                            message="Este campo es obligatorio"
                                                            top="40" // Posición relativa al campo
                                                            left="100px" // Ajusta según el espacio disponible
                                                        />
                                            </div>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    marginTop: window.screen.height * 0.015,
                                                    gap: 27,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                                >
                                                <input
                                                    onChange={(e) => setDireccionPrincipal(e.target.value)}
                                                    placeholder="Ingresar direccion de Domicilio"
                                                    className="input-style"
                                                    style={{
                                                        width: '94.3%',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor: erroresLabel.some(error => error.path === "address") ? 'rgb(253, 241, 242)' : '#FFFFFF',

                                                    }}
                                                />

                                            </div>
                                            <p style={{ color: 'red', fontSize: '12px' , width:'auto',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "address")?.msg || null}
                                            </p>

                                        </div>


                                        <div
                                            style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 50,
                                                marginBottom: 10,
                                                fontSize: 15,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
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

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Fecha de Ingreso </label>
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
                                                                    width: '222px',
                                                                    height: '38px',
                                                                    flexShrink: 0,

                                                                    '& .MuiInputBase-root': {
                                                                        width: '222px',
                                                                        height: '38px',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 300,
                                                                        lineHeight: 'normal',
                                                                        backgroundColor:erroresLabel.some(error => error.path === "registration_date") ? 'rgb(253, 241, 242)' : '#FFFFFF',
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
                                                                            fontWeight: 400,
                                                                            lineHeight: 'normal',
                                                                            // fontSize: 13,
                                                                            // fontFamily: 'serif',
                                                                            // fontWeight: 400,
                                                                            color: '#b0b0b0',
                                                                            opacity: 1,
                                                                            fontFamily: 'Maven Pro',
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </LocalizationProvider>
                                                <p style={{ color: 'red', fontSize: '12px' , width:'auto',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "registration_date")?.msg || null}
                                                </p>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15,
                                                        display:'flex',
                                                    flexDirection:'row',
                                                    }}
                                                >



                                                <p style={{ margin: 0 }}> Cargo  </p>
                                                        <span
                                                                style={{
                                                                    color: 'red',               // Asterisco de color rojo
                                                                    backgroundColor: 'white',   // Fondo blanco
                                                                    borderRadius: '50%',        // Bordes redondeados
                                                                    padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                                    fontSize: '16px',           // Tamaño del texto
                                                                    cursor: 'pointer',         // Hace que el puntero sea una mano
                                                                    marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                                    fontWeight: 'bold',         // Asterisco en negrita
                                                                }}
                                                                onMouseEnter={() => setShowTooltip({ ...showTooltip, cargo: true })}
                                                                onMouseLeave={() => setShowTooltip({ ...showTooltip, cargo: false })}
                                                                >
                                                                *
                                                        </span>
                                                        <Tooltip
                                                            show={showTooltip.cargo}
                                                            message="Este campo es obligatorio"
                                                            top="58%" // Posición relativa al campo
                                                            left="305px" // Ajusta según el espacio disponible
                                                        />

                                                </label>
                                                <input
                                                    onChange={(e) => setCargo(e.target.value)}
                                                    placeholder="Ingresar cargo"
                                                    className="input-style"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor:erroresLabel.some(error => error.path === "job_title") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    }}
                                                />
                                                 <p style={{ color: 'red', fontSize: '12px' , width:'auto',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "job_title")?.msg || null}
                                                </p>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15,
                                                        display:'flex',
                                                        flexDirection:'row',
                                                    }}
                                                >



                                                  <p style={{ margin: 0 }}> Sueldo Bruto  </p>
                                                        <span
                                                                style={{
                                                                    color: 'red',               // Asterisco de color rojo
                                                                    backgroundColor: 'white',   // Fondo blanco
                                                                    borderRadius: '50%',        // Bordes redondeados
                                                                    padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                                    fontSize: '16px',           // Tamaño del texto
                                                                    cursor: 'pointer',         // Hace que el puntero sea una mano
                                                                    marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                                    fontWeight: 'bold',         // Asterisco en negrita
                                                                }}
                                                                onMouseEnter={() => setShowTooltip({ ...showTooltip, sueldoBruto: true })}
                                                                onMouseLeave={() => setShowTooltip({ ...showTooltip, sueldoBruto: false })}
                                                                >
                                                                *
                                                        </span>
                                                        <Tooltip

                                                            show={showTooltip.sueldoBruto}
                                                            message="Este campo es obligatorio"
                                                            top="58%" // Posición relativa al campo
                                                            left="580px" // Ajusta según el espacio disponible
                                                        />

                                                </label>
                                                <input
                                                    onChange={(e) => setSueldoBruto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="input-style"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor:erroresLabel.some(error => error.path === "gross_salary") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    }}
                                                />
                                                 <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "gross_salary")?.msg || null}
                                                </p>
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


                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15,
                                                        display:'flex',
                                                        flexDirection:'row',
                                                    }}
                                                >

                                                Sueldo Neto

                                                <p style={{ margin: 0 }}> Sueldo Bruto  </p>
                                                        <span
                                                                style={{
                                                                    color: 'red',               // Asterisco de color rojo
                                                                    backgroundColor: 'white',   // Fondo blanco
                                                                    borderRadius: '50%',        // Bordes redondeados
                                                                    padding: '0 5px',           // Espaciado horizontal para hacerlo más grande
                                                                    fontSize: '16px',           // Tamaño del texto
                                                                    cursor: 'pointer',         // Hace que el puntero sea una mano
                                                                    marginLeft: '5px',          // Espacio entre el texto y el asterisco
                                                                    fontWeight: 'bold',         // Asterisco en negrita
                                                                }}
                                                                onMouseEnter={() => setShowTooltip({ ...showTooltip, sueldoNeto: true })}
                                                                onMouseLeave={() => setShowTooltip({ ...showTooltip, sueldoNeto: false })}
                                                                >
                                                                *
                                                        </span>
                                                        <Tooltip

                                                            show={showTooltip.sueldoNeto}
                                                            message="Este campo es obligatorio"
                                                            top="70%" // Posición relativa al campo
                                                            left="180px" // Ajusta según el espacio disponible
                                                        />

                                                </label>
                                                <input
                                                    onChange={(e) => setSueldoNeto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="input-style"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor:erroresLabel.some(error => error.path === "net_salary") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    }}
                                                />
                                                 <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "net_salary")?.msg || null}
                                                </p>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Otros ingresos </label>
                                                <input
                                                    onChange={(e) => setOtrosIngresos(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="input-style"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor:erroresLabel.some(error => error.path === "other_income") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    }}
                                                />
                                            </div>
                                                <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "other_income")?.msg || null}
                                                </p>
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

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Observaciones </label>
                                                <textarea
                                                    onChange={(e) => setObservaciones(e.target.value)}
                                                    placeholder="Ingresar observaciones"
                                                    className="input-style"
                                                    style={{
                                                        width: '725px',
                                                        height: '78px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor:erroresLabel.some(error => error.path === "observations") ? 'rgb(253, 241, 242)' : '#FFFFFF',
                                                    }}
                                                />
                                                    <p style={{ color: 'red', fontSize: '12px' , width:'222px',paddingLeft:'5px'}}>
                                                            {erroresLabel.find(error => error.path === "observations")?.msg || null}
                                                    </p>
                                            </div>

                                        </div>

                                    </div>
                                </div >
                                </form>

                                <div className="flex justify-center items-center mt-2 mb-10">
                                    <button
                                        onClick={() =>
                                            {
                                                setOpenModal(false);
                                                setOpenModalCreate(false);// Cierra el modal
                                                resetForm(); //Limpia o resetea todos los campos
                                            }
                                        }
                                        type="button"
                                        style={{
                                            width: '85px',
                                            height: '38px',
                                            flexShrink: 0,
                                            borderRadius: '6px',
                                            border: '1px solid #E7515A',
                                            background: '#FFFFFF',
                                            color: '#E7515A',
                                            fontFamily: 'Maven Pro',
                                            fontSize: 14,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal'
                                        }}
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
                                                "level_education": nivelEducacion,
                                                "email": email,
                                                "phoneMovil": phone,
                                                // "phoneFijo": number,
                                                "provincia": provinciaSeleccionada,
                                                "ciudad": ciudad,
                                                // "street_primary": direccionSecundaria,
                                                // "address_secondary": direccionSecundaria,
                                                // "company_code": codigoEmpresa,
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

                                            // console.log("Data para crear: ", data)


                                            // const data = {
                                            //     "identification_number": "1003836721",
                                            //     "name": "Juan",
                                            //     "lastname": "Pérez",
                                            //     "address": "Calle 123, Edificio A, Quito",
                                            //     "date_of_birth": "1985-06-15",
                                            //     "level_education": "Universitario",
                                            //     "email": "juan.perez99999@example.com",
                                            //     "phoneMovil": "0987654321",
                                            //     "phoneFijo": "022345678",
                                            //     "provincia": "Pichincha",
                                            //     "ciudad": "Quito",
                                            //     "street_primary": "Calle Principal",
                                            //     "address_secondary": "Calle Secundaria",
                                            //     "company_code": "EMP1211111222",
                                            //     "job_title": "Ingeniero de Software",
                                            //     "gross_salary": 3000,
                                            //     "net_salary": 2400,
                                            //     "other_income": 200,
                                            //     "observations": "Empleado destacado en proyectos de desarrollo.",
                                            //     "status": "active"
                                            // }
                                            setOpenModalCreate(false);
                                            handleCreateEmpleado(data)



                                        }}
                                        type="button"
                                        style={{
                                            width: '103px',
                                            height: '38px',
                                            flexShrink: 0,
                                            marginLeft: window.screen.width * 0.005,
                                            backgroundColor: '#bf5cf3',
                                            padding: 5,
                                            borderRadius: 10,
                                            color: 'white',
                                            fontSize: 14,
                                            fontFamily: 'Maven Pro',
                                            fontWeight: 400,
                                        }}>
                                        Añadir
                                    </button>

                                </div>

                            </div>
                        </Dialog.Panel>
                    </div>



                </div>
            </Dialog >

                      {/* Modal de creación de empleado */}
                      <ModalEmpleadoCreado
                                open={openModalCreate}
                                mensaje={mensaje}
                                errores={errores}
                                onClose={handleCloseModal}

                        />

                        {/* Estilo embebido para manejar placeholders */}
                        <style>{`
                            input::placeholder {
                            color: var(--placeholder-color, gray); /* Cambia con la variable CSS */
                            }
                        `}</style>

        </Transition>
)}

export default NuevoEmpleadoModal;
