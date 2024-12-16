import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IconEye from '../../../components/Icon/IconEye';

const documentos = [
    { id: 1, title: "Convenio Aprobado | dd-mm-yyyy/hh:mm", description: "" },

];

const cuotas = [
    { id: 1, description: "Primera Cuota ", valor: 100.00 },
    { id: 2, description: "Costo por Servicio ", valor: 23.23 },
    { id: 3, description: "Primer Débito del Rol ", valor: 123.23 },
    { id: 4, description: "Segunda Cuota ", valor: 100.00 },
    { id: 5, description: "Tercera Cuota ", valor: 100.00 },
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
                                    // backgroundColor: 'red',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 20,
                                    marginLeft: 29,
                                    marginTop: 20,
                                    marginBottom:'5px',
                                    marginRight: 29,
                                    borderBottom: '2px solid #D1D1D1', // Línea estilizada
                                    paddingBottom:'25px'

                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // backgroundColor: 'yellow'
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
                                            alignItems:'center',
                                            marginTop: 7,
                                            // background:'red'
                                        }}
                                    >
                                        <label
                                            htmlFor="hrDefaultinput"
                                            style={{
                                                paddingTop: 7,
                                                width: '84px',
                                                //backgroundColor: 'green',
                                                fontFamily: 'Nunito', // Familia tipográfica
                                                fontSize: '14px', // Tamaño de fuente
                                                fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                lineHeight: '19px', // Altura de línea
                                                textAlign: 'left', // Alineación de texto a la izquierda
                                                textUnderlinePosition: 'from-font', // Subrayado basado en la fuente
                                                textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                            }}
                                        >
                                            ID Solicitud
                                        </label>

                                        <form>
                                            <input
                                                id="hrDefaultinput"
                                                placeholder=""
                                                className="form-input"
                                                style={{
                                                    width: '250px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFFF',
                                                }}
                                            />
                                        </form>
                                    </div>

                                </div>

                                <form style={{
                                        // background:'red',
                                        // display:'flex',
                                        // alignItems:'colum'

                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent:'center',
                                            // margin: window.screen.height * 0.002,
                                            gap: 25,
                                            //padding: 5,
                                            // backgroundColor: 'blue',
                                            height:'auto'

                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 25,
                                                // background:'green'
                                            }}
                                        >
                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{

                                                    marginTop: window.screen.height * 0.005,
                                                    width: window.screen.width * 0.083,
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19px', // Altura de línea
                                                    textAlign: 'left', // Alineación de texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Subrayado basado en la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                }}
                                            >
                                                Estado
                                            </label>
                                            <div
                                                style={{
                                                    width: '88.2px',
                                                    height: '22px',
                                                    backgroundColor: '#00AB55',
                                                    color: '#FFFFFF',
                                                    alignContent: 'center',
                                                    fontFamily: 'Nunito Sans, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 12,
                                                    lineHeight: '16px',
                                                    textAlign: 'left', // Ya configurado
                                                    textUnderlinePosition: 'from-font', // Agregado
                                                    textDecorationSkipInk: 'none', // Agregado
                                                    paddingLeft:'10px',
                                                    // marginLeft: window.screen.width * 0.05,
                                                    borderRadius: '4px',
                                                }}

                                            >
                                                {'Aprobado'}
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                gap: 17,
                                                //gap: window.screen.width * 0.01,
                                                // background:'brown'
                                            }}
                                        >
                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    // width: window.screen.width * 0.083,
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19px', // Altura de línea
                                                    textAlign: 'center', // Alineación de texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Subrayado basado en la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado

                                                }}
                                            >
                                                Fecha de Solicitud
                                            </label>


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
                                                                width: '250px',
                                                                height: '38px',
                                                                flexShrink: 0,
                                                                // background:'red',
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
                                            fontFamily: 'Nunito', // Familia tipográfica
                                            fontSize: '18px', // Tamaño de fuente
                                            fontWeight: 600, // Peso de la fuente (semi-negrita)
                                            lineHeight: '24.55px', // Altura de línea
                                            textAlign: 'left', // Alineación del texto a la izquierda
                                            textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                            textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                            color: '#0E1726',
                                          }}

                                    >
                                        <p> Información del Solicitante </p>
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
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none',
                                                    color:'#0E1726',
                                                }}
                                            >
                                                Nombre
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none',
                                                    color:'#0E1726',
                                                }}
                                            >
                                                Email
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none',
                                                    color:'#0E1726',
                                                }}
                                            >
                                                Cargo
                                            </label>

                                            <label
                                                htmlFor="hrDefaultinput"
                                                style={{
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none',
                                                    color:'#0E1726',
                                                }}
                                            >
                                                Ingresos
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
                                                    fontFamily: 'Nunito', // Familia tipográfica
                                                    fontSize: '18px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '24.55px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                    color: '#0E1726', // Fondo del texto o contenedor
                                                  }}


                                        >

                                            <p>Detalles del Desembolso</p>

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
                                                        fontFamily: 'Nunito', // Familia tipográfica
                                                        fontSize: '14px', // Tamaño de fuente
                                                        fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                        lineHeight: '19.1px', // Altura de línea
                                                        textAlign: 'left', // Alineación del texto a la izquierda
                                                        textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                        textDecorationSkipInk: 'none',
                                                        color:'#0E1726',
                                                        width: stateModal ? window.screen.width * 0.083 : window.screen.width * 0.1, // Ancho dinámico
                                                      }}

                                                >
                                                    <p>  Método de Pago </p>
                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontFamily: 'Nunito', // Familia tipográfica
                                                        fontSize: '14px', // Tamaño de fuente
                                                        fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                        lineHeight: '19.1px', // Altura de línea
                                                        textAlign: 'left', // Alineación del texto a la izquierda
                                                        textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                        textDecorationSkipInk: 'none',
                                                        color:'#0E1726',
                                                    }}
                                                >
                                                    <p> Banco </p>
                                                </label>


                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontFamily: 'Nunito', // Familia tipográfica
                                                        fontSize: '14px', // Tamaño de fuente
                                                        fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                        lineHeight: '19.1px', // Altura de línea
                                                        textAlign: 'left', // Alineación del texto a la izquierda
                                                        textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                        textDecorationSkipInk: 'none',
                                                        color:'#0E1726',
                                                    }}
                                                >
                                                    <p> Referencia </p>
                                                </label>

                                                <label
                                                    htmlFor="hrDefaultinput"
                                                    style={{
                                                        fontFamily: 'Nunito', // Familia tipográfica
                                                        fontSize: '14px', // Tamaño de fuente
                                                        fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                        lineHeight: '19.1px', // Altura de línea
                                                        textAlign: 'left', // Alineación del texto a la izquierda
                                                        textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                        textDecorationSkipInk: 'none',
                                                        color:'#0E1726',
                                                    }}
                                                >
                                                    Comprobante
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
                                    marginRight: 24,
                                    paddingBottom:'20px',


                                }}
                            >
                                <div
                                    style={{

                                        // background:'yellow',
                                        paddingBottom:'25px',
                                        borderBottom: '2px solid #E0E6ED', // Línea estilizada

                                    }}
                                >
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            backgroundColor: 'rgba(224, 230, 237, 0.3)', // Fondo con opacidad del 30%,
                                            padding: 5,
                                            position: 'relative'
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'Nunito', // Cambiado a Nunito
                                                fontSize: '14px', // Tamaño de fuente
                                                fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                lineHeight: '19.1px', // Altura de línea
                                                textAlign: 'left', // Alineación del texto a la izquierda
                                                textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                width: '60%', // Ancho ajustado al 60% del contenedor
                                                color: '#0E1726', // Color del texto
                                                fontStyle: 'normal', // Estilo normal para la fuente
                                                alignContent: 'center', // Alineación del contenido (centro)
                                                paddingLeft: 2, // Espaciado a la izquierda

                                            }}

                                        >
                                            <p> Item </p>
                                        </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Nunito', // Cambiado a Nunito
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                    width: '60%', // Ancho ajustado al 60% del contenedor
                                                    color: '#0E1726', // Color del texto
                                                    fontStyle: 'normal', // Estilo normal para la fuente
                                                    alignContent: 'center', // Alineación del contenido (centro)
                                                    paddingLeft: 1, // Espaciado a la izquierda
                                                    position: 'absolute',
                                                    left:'59%'
                                                }}
                                            >
                                                <p> Cuotas </p>
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Nunito', // Cambiado a Nunito
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                    width: 'auto', // Ancho ajustado al 60% del contenedor
                                                    color: '#0E1726', // Color del texto
                                                    fontStyle: 'normal', // Estilo normal para la fuente
                                                    alignContent: 'center', // Alineación del contenido (centro)
                                                    paddingLeft: 1, // Espaciado a la izquierda
                                                    // background:'red',
                                                    position: 'absolute',
                                                    left:'73%'
                                                }}
                                            >
                                                <p> Monto </p>
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Nunito', // Cambiado a Nunito
                                                    fontSize: '14px', // Tamaño de fuente
                                                    fontWeight: 600, // Peso de la fuente (semi-negrita)
                                                    lineHeight: '19.1px', // Altura de línea
                                                    textAlign: 'left', // Alineación del texto a la izquierda
                                                    textUnderlinePosition: 'from-font', // Posición del subrayado desde la fuente
                                                    textDecorationSkipInk: 'none', // No saltar tinta en subrayado
                                                    width: '180px', // Ancho ajustado al 60% del contenedor
                                                    color: '#0E1726', // Color del texto
                                                    fontStyle: 'normal', // Estilo normal para la fuente
                                                    alignContent: 'center', // Alineación del contenido (centro)
                                                    paddingLeft: 1, // Espaciado a la izquierda
                                                    // background:'yellow',
                                                    position: 'absolute',
                                                    left:'86.5%'
                                                }}
                                            >
                                                <p> Costo por Servicio </p>
                                            </div>
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

                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection:'row',
                                        justifyContent: 'center',
                                        alignItems:'center',
                                        // backgroundColor: 'green',
                                        gap: '30px'
                                    }}
                                >

                                    <div
                                        style={{
                                            width: '550px',
                                            height:'138px',
                                            flexShrink: 0,
                                            marginTop: 10,
                                            marginBottom: 20,
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            // backgroundColor: 'blue'
                                        }}
                                    >

                                        <p
                                            style={{
                                                fontFamily: 'Nunito',
                                                fontSize: '18px',
                                                fontWeight: 600,
                                                lineHeight: '24.55px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                padding: '20px',
                                                color: '#0E1726',
                                            }}

                                        >
                                            Documentación
                                        </p>

                                        {documentos.map((doc, index) => (
                                            <div
                                                key={doc.id}
                                                    style={{
                                                        fontFamily: 'Nunito',
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        lineHeight: '19.1px',
                                                        textAlign: 'left',
                                                        textUnderlinePosition: 'from-font',
                                                        textDecorationSkipInk: 'none',
                                                        marginTop: '5px',
                                                        marginLeft: '20px',
                                                        marginRight: '20px',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        borderBottom: index !== documentos.length - 1 ? '1px solid #E5E5E5' : 'none',
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
                                            width: '80%',
                                            marginTop: 20,
                                            marginBottom: 20,
                                            // background:'red'

                                        }}
                                    >

                                        {cuotas.map((cuota, index) => (


                                            <div

                                            >
                                                <div key={cuota.id}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "5px 0",
                                                    color: '#0E1726',
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    fontFamily: 'Maven Pro',
                                                }}>
                                                    <p
                                                    style={{
                                                        fontFamily: 'Nunito',
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        lineHeight: '37px',
                                                        textAlign: 'left',
                                                        textUnderlinePosition: 'from-font',
                                                        textDecorationSkipInk: 'none',
                                                        color: ' #0E1726',
                                                    }}
                                                >
                                                        {cuota.description}
                                                    </p>
                                                    <p>
                                                        ${cuota.valor.toFixed(2)}
                                                    </p>

                                                </div>

                                                {index === 2 && (
                                                    <p

                                                    style={{
                                                        fontFamily: 'Nunito',
                                                        fontSize: '14px',
                                                        fontWeight: 600, // Aumenta el grosor del texto
                                                        lineHeight: '19.1px', // Ajusta la altura de línea para mejor legibilidad
                                                        textAlign: 'left',
                                                        textUnderlinePosition: 'from-font',
                                                        textDecorationSkipInk: 'none',
                                                        color: '#B2B6B8',
                                                        margin: '10px 0', // Espaciado uniforme arriba y abajo
                                                        borderBottom: '1px solid #000000',
                                                    }}

                                                    >
                                                        Incluye IVA y solo se cobra 1 vez
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        {/* <div
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
                                        </div> */}

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
