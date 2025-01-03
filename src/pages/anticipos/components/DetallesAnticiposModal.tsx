import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconEye from '../../../components/Icon/IconEye';
import dayjs from 'dayjs';

const documentos = [
    { id: 1, title: "Convenio Aprobado | dd-mm-yyyy/hh:mm", description: "" },
    { id: 2, title: "Convenio Aprobado | dd-mm-yyyy/hh:mm", description: "" },
];

const cuotas = [
    { id: 1, description: "Cuota 1", valor: 123.23 },
    { id: 2, description: "Cuota 2", valor: 100.00 },
    { id: 3, description: "Cuota 3", valor: 100.00 },
];

const datosEjemplo = {
  idSolicitud: "SOL-2024-001",
  nombre: "Juan Pérez González",
  email: "juan.perez@empresa.com",
  cargo: "Gerente de Ventas",
  ingresos: "$5,000.00",
  metodoPago: "Transferencia Bancaria",
  banco: "Banco Nacional",
  referencia: "REF-2024-123456",
  comprobante: "COMP-2024-789",
  item: "Anticipo de Nómina",
  cuotas: "3",
  monto: "$1,500.00",
  tarifaUnica: "$45.00",
  fecha: "2024-03-20",
  motivoRechazo: "Documentación incompleta",
  observaciones: "Pendiente de documentos adicionales"
};

const DetallesAnticiposModal = (
    {
        openModal,
        setOpenModal,
        stateModal,
        setStateModal
    }
        :
        {
            openModal: boolean;
            setOpenModal: (isOpen: boolean) => void;
            stateModal: boolean;
            setStateModal: (isOpen: boolean) => void;
        }
) => {

    useEffect(() => {
        console.log(stateModal);
    }, [openModal])

    let total = 0;
    cuotas.forEach((cuota) => {
        total += cuota.valor;
    });

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
                                borderRadius: 6,
                                // height: window.screen.height * 1.15,
                                boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)'
                            }}
                        >

                            <div
                                style={{
                                    //backgroundColor: 'red',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 20,
                                    marginLeft: 29,
                                    marginTop: 18,
                                    marginRight: 29

                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                >

                                    <img
                                        src="/assets/images/logo_side.png"
                                        alt="logo"
                                        style={{
                                            width: '158px',
                                            height: '43px',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: 7
                                        }}
                                    >
                                        <label
                                            htmlFor="hrDefaultinput"
                                            style={{
                                                fontFamily: 'Nunito',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                lineHeight: '19px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                paddingTop: 7,
                                                width: '84px',
                                                color: '#0E1726'
                                            }}
                                        >
                                            ID Solicitud:
                                        </label>

                                        <input
                                            id="hrDefaultinput"
                                            value={datosEjemplo.idSolicitud}
                                            readOnly
                                            className="form-input"
                                            style={{
                                                width: '250px',
                                                height: '38px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E0E6ED',
                                                background: '#F8F8F8',
                                                cursor: 'default'
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 17,
                                            alignItems: 'center'
                                        }}
                                    >

                                    </div>

                                </div>

                                <form>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: window.screen.height * 0.002,
                                            gap: 5
                                            // padding: 5
                                        }}
                                    >

                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                display: 'flex',
                                                gap: 25,
                                            }}
                                        >
                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    marginTop: window.screen.height * 0.005,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400
                                                }}
                                            >
                                                Estado:
                                            </label>


                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    marginTop: window.screen.height * 0.005,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400
                                                }}
                                            >
                                                Fecha de Ingreso:
                                            </label>

                                        </div>

                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                display: 'flex',
                                                gap: 17
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: window.screen.width * 0.08,
                                                    height: window.screen.height * 0.04,
                                                    backgroundColor: stateModal ? 'green' : 'red',
                                                    color: 'white',
                                                    alignContent: 'center',
                                                    fontWeight: 'bold',
                                                    borderRadius: 5,
                                                    fontSize: 12,
                                                    textAlign: 'left',
                                                    paddingLeft: window.screen.height * 0.02,
                                                    marginLeft: window.screen.width * 0.05,
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                {stateModal ? 'Aprobado' : 'Rechazado'}
                                            </div>

                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    disabled
                                                    defaultValue={dayjs(datosEjemplo.fecha)}
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
                                                                width: window.screen.width * 0.2,
                                                                '& .MuiInputBase-root': {
                                                                    height: window.screen.height * 0.047,
                                                                    marginTop: window.screen.height * 0.0003,
                                                                    fontSize: 12,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    backgroundColor: '#F8F8F8',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '4px',
                                                                    boxShadow: 'none',
                                                                    transition: 'none',
                                                                    fontFamily: 'Maven Pro',
                                                                    '&:hover': {
                                                                        backgroundColor: '#F8F8F8',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&.Mui-focused': {
                                                                        backgroundColor: '#F8F8F8',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    border: 'none',
                                                                },
                                                                '& .MuiInputBase-input': {
                                                                    '::placeholder': {
                                                                        fontSize: 13,
                                                                        fontWeight: 400,
                                                                        color: '#0E1726',
                                                                        opacity: 1,
                                                                        fontFamily: 'Maven Pro'
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />

                                            </LocalizationProvider>

                                        </div>

                                    </div>
                                </form>

                                <div
                                    style={{
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center'
                                    }}
                                >

                                    <div
                                        style={{
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            height: window.screen.height * 0.1,
                                            justifyContent: 'center',
                                            justifySelf: 'center',
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >

                                        <button
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: window.screen.width * 0.20,
                                                height: window.screen.height * 0.05,
                                                backgroundColor: '#bf5cf3',
                                                borderRadius: 5,
                                                gap: window.screen.width * 0.01,
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            <FileDownloadOutlinedIcon sx={{ color: 'white' }} />
                                            <p
                                                style={{
                                                    color: 'white',
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                    fontSize: '14px',
                                                    fontStyle: 'normal',
                                                    lineHeight: 'normal'
                                                }}
                                            >
                                                Descargar
                                            </p>
                                        </button>
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    marginLeft: 24,
                                    marginRight: 24,
                                    gap: 40,
                                    //backgroundColor: 'green'
                                }}
                            >

                                <div
                                    style={{
                                        //width: '100%',
                                        //margin: 10,
                                        padding: 10,
                                        //backgroundColor: 'cyan',
                                    }}
                                >



                                    <div
                                        style={{
                                            //paddingTop: 5,
                                            //paddingRight: 5,
                                            //paddingBottom: 5,
                                            //marginLeft: window.screen.width * 0.008,
                                            fontSize: 16,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Informacion del Solicitante: </p>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >

                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                display: 'flex',
                                                //backgroundColor: 'red',
                                                paddingRight: 100,
                                                marginTop: 15,
                                                gap: 13
                                            }}
                                        >
                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    //marginTop: window.screen.height * 0.005,
                                                    //width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Nombre:
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    //marginTop: window.screen.height * 0.005,
                                                    //width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Email:
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    //marginTop: window.screen.height * 0.005,
                                                    //width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Cargo:
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    //marginTop: window.screen.height * 0.005,
                                                    //width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Ingresos:
                                            </label>

                                        </div>

                                        <form>

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    gap: 5,
                                                    marginTop: 10,
                                                    width: '100%'
                                                }}
                                            >
                                                <input
                                                    disabled
                                                    defaultValue={datosEjemplo.nombre}
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#F8F8F8',
                                                    }}
                                                />

                                                <input
                                                  disabled
                                                  defaultValue={datosEjemplo.email}
                                                    id="hrDefaultinput"
                                                    placeholder=""
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF',
                                                    }}
                                                />

                                                <input
                                                    disabled
                                                    defaultValue={datosEjemplo.cargo}
                                                    id="hrDefaultinput"
                                                    placeholder=""
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF',
                                                    }}
                                                />

                                                <input
                                                     disabled
                                                    defaultValue={datosEjemplo.ingresos}
                                                    id="hrDefaultinput"
                                                    placeholder=""
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF',
                                                    }}
                                                />
                                            </div>

                                        </form>


                                    </div>

                                </div>

                                <div

                                >

                                    <form>

                                        <div
                                            style={{
                                                //paddingTop: 5,
                                                //paddingRight: 5,
                                                //paddingBottom: 5,
                                                //marginLeft: window.screen.width * 0.008,
                                                fontSize: '16px',
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            {stateModal === true ?
                                                <p>Detalles del Desembolso:</p> : <p>Observaciones:</p>
                                            }

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                // marginTop: 15,
                                                // gap: 13,
                                                //margin: window.screen.height * 0.002,
                                                //gap: window.screen.width * 0.1,
                                                //padding: 10,
                                                //backgroundColor: 'red'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    marginTop: 15,
                                                    gap: 13,
                                                    paddingRight: 100,
                                                    //gap: window.screen.width * 0.015,
                                                    //backgroundColor: 'yellow'
                                                }}
                                            >
                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontFamily: 'Maven Pro',
                                                        fontSize: 14,
                                                        fontWeight: 400,
                                                        //marginTop: window.screen.height * 0.005,
                                                        width: stateModal ? window.screen.width * 0.083 : window.screen.width * 0.1
                                                    }}
                                                >

                                                    {stateModal === true ?
                                                        <p>  Metodo de Pago: </p> : <p> Motivo del Rechazo: </p>
                                                    }

                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        //marginTop: window.screen.height * 0.005,
                                                        //width: window.screen.width * 0.083,
                                                        fontFamily: 'Maven Pro',
                                                        fontWeight: 400,
                                                    }}
                                                >

                                                    {stateModal === true ?
                                                        <p> Banco: </p> : <p> Observaciones: </p>
                                                    }

                                                </label>

                                                {stateModal && (
                                                    <>
                                                        <label
                                                            htmlFor="hrDefaultinput"
                                                            style={{
                                                                fontSize: 14,
                                                                //marginTop: window.screen.height * 0.005,
                                                                //width: window.screen.width * 0.083,
                                                                fontFamily: 'Maven Pro',
                                                                fontWeight: 400,
                                                            }}
                                                        >
                                                            <p> Referencia: </p>

                                                        </label>

                                                        <label
                                                            htmlFor="hrDefaultinput"
                                                            style={{
                                                                fontSize: 14,
                                                                //marginTop: window.screen.height * 0.005,
                                                                //width: window.screen.width * 0.083,
                                                                fontFamily: 'Maven Pro',
                                                                fontWeight: 400,
                                                            }}
                                                        >
                                                            Comprobante:
                                                        </label>
                                                    </>
                                                )}


                                            </div>

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    gap: 5,
                                                    marginTop: 10,
                                                    //gap: window.screen.width * 0.01,
                                                    width: '100%'
                                                }}
                                            >


                                                <input
                                                    disabled
                                                    defaultValue={stateModal === true ?datosEjemplo.metodoPago:datosEjemplo.motivoRechazo}
                                                    id="hrDefaultinput"
                                                    placeholder=""
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF',
                                                    }}
                                                />

                                                <input

                                                    id="hrDefaultinput"
                                                    disabled
                                                    defaultValue={stateModal === true ?datosEjemplo.banco:datosEjemplo.observaciones}
                                                    placeholder=""
                                                    className="form-input"
                                                    style={{
                                                        width: '250px',
                                                        height: '35px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF',
                                                    }}
                                                />

                                                {stateModal ?

                                                    <>

                                                        <input
                                                            id="hrDefaultinput" placeholder=""
                                                            className="form-input"
                                                            disabled
                                                            defaultValue={datosEjemplo.referencia}
                                                            style={{
                                                                width: '250px',
                                                                height: '35px',
                                                                flexShrink: 0,
                                                                borderRadius: '6px',
                                                                border: '1px solid #E0E6ED',
                                                                background: '#FFFFFF',

                                                            }}
                                                        />

                                                        <div style={{ position: 'relative', width: '100%' }}>
                                                            <input
                                                                id="hrDefaultinput"
                                                                disabled
                                                                placeholder=""
                                                                className="form-input"
                                                                defaultValue={datosEjemplo.comprobante}
                                                                style={{
                                                                    width: '250px',
                                                                    height: '35px',
                                                                    flexShrink: 0,
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #E0E6ED',
                                                                    background: '#FFFFFF',
                                                                }}
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    right: '5%',
                                                                    transform: 'translateY(-50%)',
                                                                    fontSize: '16px',
                                                                    color: '#999',
                                                                    pointerEvents: 'none',
                                                                    //backgroundColor: 'cyan'
                                                                }}
                                                            >
                                                                <IconEye />
                                                            </span>
                                                        </div>

                                                    </> :
                                                    <>

                                                        <input
                                                            id="hrDefaultinput"
                                                            placeholder=""
                                                            className="form-input"
                                                            style={{
                                                                visibility: 'hidden',
                                                                width: '250px',
                                                                height: '35px',
                                                                flexShrink: 0,
                                                                borderRadius: '6px',
                                                                border: '1px solid #E0E6ED',
                                                                background: '#FFFFFF',
                                                            }} />

                                                        <div style={{ position: 'relative', width: '100%', visibility: 'hidden' }}>
                                                            <input
                                                                id="hrDefaultinput"
                                                                placeholder=""
                                                                className="form-input"
                                                                style={{
                                                                    width: '250px',
                                                                    height: '35px',
                                                                    flexShrink: 0,
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #E0E6ED',
                                                                    background: '#FFFFFF',
                                                                }}
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    right: '5%',
                                                                    transform: 'translateY(-50%)',
                                                                    fontSize: '16px',
                                                                    color: '#999',
                                                                    pointerEvents: 'none',
                                                                    //backgroundColor: 'cyan'
                                                                }}
                                                            >
                                                                <IconEye />
                                                            </span>
                                                        </div>

                                                    </>

                                                }

                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div
                                style={{
                                    marginLeft: 24,
                                    marginRight: 24
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        backgroundColor: '#e9efff',
                                        padding: 5
                                    }}
                                >
                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            width: '60%',
                                            color: '#0E1726',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            alignContent: 'center',
                                            paddingLeft: 1,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        <p> Item </p>
                                    </div>
                                    <div
                                        style={{
                                            //backgroundColor: 'green',
                                            width: '14%',
                                            color: '#0E1726',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            alignContent: 'center',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        <p> Cuotas </p>
                                    </div>
                                    <div
                                        style={{
                                            //backgroundColor: 'cyan',
                                            width: '14%',
                                            color: '#0E1726',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            alignContent: 'center',
                                            paddingLeft: 5,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        <p> Monto </p>
                                    </div>
                                    <div
                                        style={{
                                            //backgroundColor: 'orange',
                                            width: '14%',
                                            color: '#0E1726',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            alignContent: 'center',
                                            paddingLeft: 10,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        <p> Tarifa única </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        height: window.screen.height * 0.05,
                                        marginTop: 15,
                                        //marginBottom: 5,
                                        gap: '5px'
                                    }}
                                >
                                    <div
                                        style={{ width: '60%' }}
                                    >
                                        <input
                                            id="hrDefaultinput"
                                            placeholder=""
                                            className="form-input"
                                            style={{
                                                width: '100%',
                                                height: '35px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E0E6ED',
                                                background: '#FFFFFF'
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input
                                            id="hrDefaultinput"
                                            placeholder=""
                                            className="form-input"
                                            style={{
                                                width: '100%',
                                                height: '35px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E0E6ED',
                                                background: '#FFFFFF'
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input
                                            id="hrDefaultinput"
                                            placeholder=""
                                            className="form-input"
                                            style={{
                                                width: '100%',
                                                height: '35px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E0E6ED',
                                                background: '#FFFFFF'
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input
                                            id="hrDefaultinput"
                                            placeholder=""
                                            className="form-input"
                                            style={{
                                                width: '100%',
                                                height: '35px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E0E6ED',
                                                background: '#FFFFFF'
                                            }}
                                        />
                                    </div>

                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: window.screen.width * 0.1
                                    }}
                                >

                                    <div
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                            flexShrink: 0,
                                            marginTop: 10,
                                            marginBottom: 20,
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            //backgroundColor: 'blue',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}
                                    >

                                        <p
                                            style={{
                                                padding: 20,
                                                color: '#0E1726',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            Documentación
                                        </p>

                                        {documentos.map((doc, index) => (
                                            <div
                                                key={doc.id}
                                                style={{
                                                    marginTop: 5,
                                                    marginLeft: 20,
                                                    marginRight: 20,
                                                    display: "flex",
                                                    //backgroundColor: 'pink',
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderBottom: index !== documentos.length - 1 ? "1px solid #E5E5E5" : "none",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        fontFamily: 'Maven Pro',
                                                        color: doc.title.includes("Line") ? "#007bff" : "#000",
                                                        fontWeight: doc.title.includes("Line") ? "bold" : "normal",
                                                    }}
                                                >
                                                    {doc.title}
                                                </div>
                                                <button
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <IconEye />
                                                </button>
                                            </div>
                                        ))}

                                    </div>

                                    <div
                                        style={{
                                            width: '40%',
                                            marginTop: 20,
                                            marginBottom: 20
                                        }}
                                    >

                                        <div style={{ width: '80%', marginTop: 20, marginBottom: 20 }}>
                                            {cuotas.map((cuota, index) => (
                                                <div key={cuota.id}>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        padding: "5px 0",
                                                        color: '#0E1726',
                                                        fontSize: 14,
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        fontFamily: 'Maven Pro',
                                                    }}>
                                                        <p style={{
                                                            fontFamily: 'Nunito',
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            lineHeight: '37px',
                                                            textAlign: 'left',
                                                            textUnderlinePosition: 'from-font',
                                                            textDecorationSkipInk: 'none',
                                                            color: '#0E1726',
                                                        }}>
                                                            {cuota.description}
                                                        </p>
                                                        <p>
                                                            ${cuota.valor.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    {index === 2 && (
                                                        <p style={{
                                                            fontFamily: 'Nunito',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            lineHeight: '19.1px',
                                                            textAlign: 'left',
                                                            textUnderlinePosition: 'from-font',
                                                            textDecorationSkipInk: 'none',
                                                            color: '#B2B6B8',
                                                            margin: '10px 0',
                                                            borderBottom: '1px solid #000000',
                                                        }}>
                                                            Incluye IVA y solo se cobra 1 vez
                                                        </p>
                                                    )}
                                                </div>
                                            ))}

                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: "20px 0",
                                                color: '#0E1726',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                fontFamily: 'Maven Pro',
                                            }}>
                                                <span style={{
                                                    fontFamily: 'Nunito',
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    lineHeight: '37px',
                                                    color: '#0E1726',
                                                }}>
                                                    Total
                                                </span>
                                                <span style={{
                                                    fontFamily: 'Nunito',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    lineHeight: '37px',
                                                    color: '#0E1726',
                                                }}>
                                                    ${total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )

}

export default DetallesAnticiposModal
