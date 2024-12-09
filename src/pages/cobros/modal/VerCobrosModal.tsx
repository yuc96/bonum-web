import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconEye from '../../../components/Icon/IconEye';

const documentos = [
    { id: 1, title: "Documento 1", description: "" },
    { id: 2, title: "Documento 2", description: "" }
];

const cuotas = [
    { id: 1, description: "Cuota 1", valor: 123.23 },
    { id: 2, description: "Cuota 2", valor: 100.00 },
    { id: 3, description: "Cuota 3", valor: 100.00 },
];

const VerCobrosModal = (
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
                                margin: window.screen.height * 0.015,
                                borderRadius: 6,
                                //height: window.screen.height * 1.15,
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
                                        //backgroundColor: 'yellow'
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
                                                fontSize: 14,
                                                paddingTop: 7,
                                                width: '84px',
                                                //backgroundColor: 'green',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                            }}
                                        >
                                            ID Solicitud:
                                        </label>

                                        <form>
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
                                        </form>
                                    </div>

                                </div>

                                <form>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: window.screen.height * 0.002,
                                            gap: 5,
                                            //padding: 5,
                                            //backgroundColor: 'blue'
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
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Estado:
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontSize: 14,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                    marginRight: 2
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
                                                //gap: window.screen.width * 0.01,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: window.screen.width * 0.08,
                                                    height: window.screen.height * 0.04,
                                                    backgroundColor: 'green',
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
                                                {'Activo'}
                                            </div>

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
                                                                width: '230px',
                                                                height: '35px',
                                                                flexShrink: 0,
                                                                '& .MuiInputBase-root': {
                                                                    height: '35px',

                                                                    fontSize: 12,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    backgroundColor: 'white',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '4px',
                                                                    fontFamily: 'Maven Pro',
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
                                                                        fontSize: 13,
                                                                        fontWeight: 400,
                                                                        color: '#0E1726',
                                                                        fontFamily: 'Maven Pro',
                                                                        opacity: 1
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
                                        justifyContent: 'center',
                                        //backgroundColor: 'cyan'
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
                                                width: '220px',
                                                height: '38px',
                                                flexShrink: 0,
                                                backgroundColor: '#bf5cf3',
                                                borderRadius: 6,
                                                gap: 5
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
                                    // style={{
                                    //     backgroundColor: 'yellow',
                                    // }}
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

                                            <p>Detalles del Pago:</p>

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
                                                    <p>  Metodo de Pago: </p>
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
                                                    <p> Banco: </p>
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

                                                <div style={{ position: 'relative', width: '100%' }}>
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
                                            fontFamily: 'Maven Pro',
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
                                            fontFamily: 'Maven Pro',
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
                                            fontFamily: 'Maven Pro',
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
                                            fontFamily: 'Maven Pro',
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
                                        //height: window.screen.height * 0.05,
                                        marginTop: 10,
                                        //backgroundColor: 'red',
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
                                        //backgroundColor: 'red',
                                        gap: window.screen.width * 0.1
                                    }}
                                >

                                    <div
                                        style={{
                                            width: '40%',
                                            flexShrink: 0,
                                            marginTop: 10,
                                            marginBottom: 20,
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            //backgroundColor: 'blue'
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
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <p style={{ 
                                                    color: 'green',  
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    fontFamily: 'Maven Pro'
                                                }}>
                                                    {cuota.description}
                                                </p>
                                                <p>
                                                    ${cuota.valor.toFixed(2)}
                                                </p>
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
                                                fontFamily: 'Maven Pro',
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

export default VerCobrosModal;