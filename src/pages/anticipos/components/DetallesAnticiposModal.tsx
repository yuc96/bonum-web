import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconEye from '../../../components/Icon/IconEye';

const documentos = [
    { id: 1, title: "Documento 1", description: "" },
    { id: 2, title: "Documento 2", description: "" },
    { id: 3, title: "Documento 3", description: "" },
    { id: 4, title: "Documento 4", description: "" },
];

const cuotas = [
    { id: 1, description: "Cuota 1", valor: 123.23 },
    { id: 2, description: "Cuota 2", valor: 100.00 },
    { id: 3, description: "Cuota 3", valor: 100.00 },
];

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
                                borderRadius: 10,
                                height: window.screen.height * 1.15
                            }}
                        >

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: window.screen.width * 0.04,
                                    margin: 10,
                                    padding: 5

                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: window.screen.width * 0.004,
                                        margin: window.screen.height * 0.002,
                                        gap: window.screen.height * 0.007
                                    }}
                                >

                                    <img
                                        src="/assets/images/logo_side.png"
                                        alt="logo"
                                        style={{
                                            width: '201px',
                                            height: '56px',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    <p
                                        style={{
                                            color: '#888EA8',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        13 Tetrick Road, Cypress Gardens, Florida, 33884, US
                                    </p>

                                    <p
                                        style={{
                                            color: '#888EA8',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        info@bonum.com
                                    </p>

                                    <p
                                        style={{
                                            color: '#888EA8',
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    >
                                        +1 (070) 123-4567
                                    </p>

                                </div>

                                <form>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: window.screen.height * 0.002,
                                            gap: window.screen.width * 0.005,
                                            padding: 5
                                        }}
                                    >

                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                display: 'flex',
                                                gap: window.screen.width * 0.015,
                                            }}
                                        >
                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    marginTop: window.screen.height * 0.005,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro'
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
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                ID de Solicitud:
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    marginTop: window.screen.height * 0.005,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                Fecha de Ingreso:
                                            </label>

                                        </div>

                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                display: 'flex',
                                                gap: window.screen.width * 0.01,
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
                                                {stateModal ? 'Activo' : 'Inactivo'}
                                            </div>

                                            <input id="hrDefaultinput" placeholder="" className="form-input" />

                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
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
                                                                        fontSize: 13,
                                                                        fontWeight: 600,
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
                                            <text
                                                style={{
                                                    color: 'white',
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                Descargar
                                            </text>
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
                                    margin: window.screen.height * 0.002,
                                }}
                            >

                                <div
                                    style={{
                                        width: '50%',
                                        margin: 10
                                    }}
                                >

                                    <form>

                                        <div
                                            style={{
                                                paddingTop: 5,
                                                paddingRight: 5,
                                                paddingBottom: 5,
                                                marginLeft: window.screen.width * 0.008,
                                                fontSize: '16px',
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            <p> Informacion del Solicitante: </p>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                margin: window.screen.height * 0.002,
                                                gap: window.screen.width * 0.1,
                                                padding: 10
                                            }}
                                        >

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    gap: window.screen.width * 0.015,
                                                }}
                                            >
                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        marginTop: window.screen.height * 0.005,
                                                        width: window.screen.width * 0.083,
                                                        fontFamily: 'Maven Pro'
                                                    }}
                                                >
                                                    Nombre:
                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        marginTop: window.screen.height * 0.005,
                                                        width: window.screen.width * 0.083,
                                                        fontFamily: 'Maven Pro'
                                                    }}
                                                >
                                                    Email:
                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        marginTop: window.screen.height * 0.005,
                                                        width: window.screen.width * 0.083,
                                                        fontFamily: 'Maven Pro'
                                                    }}
                                                >
                                                    Cargo:
                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        marginTop: window.screen.height * 0.005,
                                                        width: window.screen.width * 0.083,
                                                        fontFamily: 'Maven Pro'
                                                    }}
                                                >
                                                    Ingresos:
                                                </label>

                                            </div>

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    gap: window.screen.width * 0.01,
                                                    width: '100%'
                                                }}
                                            >
                                                <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />

                                                <input id="hrDefaultinput" placeholder="" className="form-input" />

                                                <input id="hrDefaultinput" placeholder="" className="form-input" />

                                                <input id="hrDefaultinput" placeholder="" className="form-input" />
                                            </div>

                                        </div>
                                    </form>

                                </div>

                                <div
                                    style={{
                                        width: '50%'
                                    }}
                                >

                                    <form>

                                        <div
                                            style={{
                                                paddingTop: 5,
                                                paddingRight: 5,
                                                paddingBottom: 5,
                                                marginLeft: window.screen.width * 0.008,
                                                fontSize: '16px',
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            {stateModal === true ?
                                                <p>Detalles del Pago:</p> : <p>Observaciones:</p>
                                            }

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                margin: window.screen.height * 0.002,
                                                gap: window.screen.width * 0.1,
                                                padding: 10,
                                                //backgroundColor: 'red'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    gap: window.screen.width * 0.015,
                                                    //backgroundColor: 'yellow'
                                                }}
                                            >
                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontSize: 14,
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: window.screen.height * 0.005,
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
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: window.screen.height * 0.005,
                                                        width: window.screen.width * 0.083,
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
                                                                marginTop: window.screen.height * 0.005,
                                                                width: window.screen.width * 0.083,
                                                                fontFamily: 'Maven Pro'
                                                            }}
                                                        >
                                                            <p> Referencia: </p>

                                                        </label>

                                                        <label
                                                            htmlFor="hrDefaultinput"
                                                            style={{
                                                                fontSize: 14,
                                                                marginTop: window.screen.height * 0.005,
                                                                width: window.screen.width * 0.083,
                                                                fontFamily: 'Maven Pro'
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
                                                    gap: window.screen.width * 0.01,
                                                    width: '100%'
                                                }}
                                            >


                                                <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />

                                                <input id="hrDefaultinput" placeholder="" className="form-input" />

                                                {stateModal ?

                                                    <>

                                                        <input id="hrDefaultinput" placeholder="" className="form-input" />

                                                        <div style={{ position: 'relative', width: '100%' }}>
                                                            <input
                                                                id="hrDefaultinput"
                                                                placeholder=""
                                                                className="form-input"
                                                                style={{
                                                                    width: '100%',
                                                                    paddingRight: '30px'
                                                                }}
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    right: '10px',
                                                                    transform: 'translateY(-50%)',
                                                                    fontSize: '16px',
                                                                    color: '#999',
                                                                    pointerEvents: 'none',
                                                                }}
                                                            >
                                                                <IconEye />
                                                            </span>
                                                        </div>

                                                    </> :
                                                    <>

                                                        <input id="hrDefaultinput" placeholder="" className="form-input" style={{  visibility: 'hidden'}}/>

                                                        <div style={{ position: 'relative', width: '100%',  visibility: 'hidden'}}>
                                                            <input
                                                                id="hrDefaultinput"
                                                                placeholder=""
                                                                className="form-input"
                                                                style={{
                                                                    width: '100%',
                                                                    paddingRight: '30px',
                                                                    visibility: 'hidden'
                                                                }}
                                                            />
                                                            <span
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    right: '10px',
                                                                    transform: 'translateY(-50%)',
                                                                    fontSize: '16px',
                                                                    color: '#999',
                                                                    pointerEvents: 'none',
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
                                    margin: 10
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        backgroundColor: '#E0E6ED',
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
                                            fontWeight: 600,
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
                                            fontWeight: 600,
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
                                            fontWeight: 600,
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
                                            fontWeight: 600,
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
                                        <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />
                                    </div>

                                    <div
                                        style={{ width: '14%' }}
                                    >
                                        <input id="hrDefaultinput" placeholder="" className="form-input" style={{ width: '100%' }} />
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
                                            width: '40%',
                                            marginTop: 20,
                                            marginBottom: 20,
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >

                                        <p
                                            style={{
                                                padding: 20,
                                                color: '#0E1726',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            Documentación
                                        </p>

                                        {documentos.map((doc, index) => (
                                            <div
                                                key={doc.id}
                                                style={{
                                                    margin: 20,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderBottom: index !== documentos.length - 1 ? "1px solid #E5E5E5" : "none",
                                                }}
                                            >

                                                <div
                                                    style={{
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

                                        {cuotas.map((cuota) => (
                                            <div
                                                key={cuota.id}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "5px 0",
                                                    color: '#0E1726',
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                <span>{cuota.description}</span>
                                                <span>${cuota.valor.toFixed(2)}</span>
                                            </div>
                                        ))}

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: "20px 0",
                                                color: '#0E1726',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
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