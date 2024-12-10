
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx';
//import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconXCircle from '../../../components/Icon/IconXCircle';
import { create_empleados_from_excel } from '../../../server/empleados/EmpleadosApi';
import { AccionContext } from '../../../contexts/AccionesContext';


const CargarEmpleadosModal = (
    {
        openModalNew,
        setOpenModalNew,
    }
        :
        {
            openModalNew: boolean;
            setOpenModalNew: (isOpen: boolean) => void;
        }
) => {

    const [fileName, setFileName] = useState<string | null>(null);
    const [datosEmpleados, setDatosEmpleados] = useState<any[]>([]);

    const { accionDatos } = useContext(AccionContext);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (file) {

            setFileName(file.name);
            const reader = new FileReader();

            reader.onload = (e) => {

                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setDatosEmpleados(jsonData);

            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleUploadData = (data: any) => {

        create_empleados_from_excel(data)
            .then((res) => {
                accionDatos();
                setOpenModalNew(false);
            })
            .catch((err) => {
                console.log("Error en API: ", err)
            })

    }

    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };



    return (

        <Transition
            appear
            show={openModalNew}
            as={Fragment}>
            <Dialog
                as="div"
                open={openModalNew} onClose={() => setOpenModalNew(false)}>
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
                                marginTop: window.screen.height * 0.025,
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifySelf: 'center',
                                alignSelf: 'center'
                            }}
                        >

                            <div
                                style={{
                                    marginTop: 48,
                                    marginLeft: 67,
                                    marginRight: 67,
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    width: 538
                                }}
                            >

                                <div
                                    style={{
                                        paddingTop: 10,
                                        paddingLeft: 15,
                                        marginBottom: 10,
                                        //fontFamily: 'Nunito',
                                        fontSize: 16,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro',
                                        color: '#BF5CF3'
                                    }}
                                >
                                    <p> Importar nómina de colaboradores </p>

                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        //backgroundColor: 'blue',
                                        alignItems: 'center',
                                        borderRadius: '8px',
                                        width: '511.333px',
                                        height: '25.333px',
                                        marginLeft: window.screen.width * 0.007,

                                    }}
                                >


                                    {fileName ? (

                                        <span
                                            style={{
                                                flex: 1,
                                                paddingTop: window.screen.height * 0.005,
                                                paddingLeft: window.screen.width * 0.005,
                                                fontSize: '12px',
                                                color: '#555',
                                                backgroundColor: '#f4f4f4',
                                                borderTopLeftRadius: 5,
                                                borderBottomLeftRadius: 5,
                                                height: window.screen.height * 0.035,
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            {fileName}
                                        </span>

                                    ) : (
                                        <span
                                            style={{
                                                flex: 1,
                                                paddingTop: window.screen.height * 0.005,
                                                paddingLeft: window.screen.width * 0.005,
                                                fontSize: '12px',
                                                color: '#555',
                                                backgroundColor: '#f4f4f4',
                                                borderTopLeftRadius: 5,
                                                borderBottomLeftRadius: 5,
                                                height: window.screen.height * 0.035,
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            Formato XLSX o CSV
                                        </span>
                                    )}

                                    <label
                                        style={{
                                            backgroundColor: '#e0c3fc',
                                            color: '#BF5CF3',
                                            textAlign: 'center',
                                            padding: '4px',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            borderTopRightRadius: '5px',
                                            borderBottomRightRadius: '5px',
                                            marginTop: window.screen.height * 0.0058,
                                            width: '115px',
                                            height: '24px',
                                            flexShrink: 0,
                                            //height: window.screen.height * 0.035,
                                            //width: window.screen.width * 0.1,
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                            marginRight: 10
                                        }}
                                    >
                                        Importar Archivo

                                        <input
                                            type="file"
                                            accept=".xlsx,.csv"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: window.screen.width * 0.3,
                                        height: window.screen.height * 0.3,
                                        justifySelf: 'center',
                                        justifyItems: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        padding: 10,
                                        gap: window.screen.width * 0.02
                                    }}
                                >

                                    <div
                                        style={{
                                            //paddingTop: window.screen.height * 0.0005,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img
                                            src="/assets/images/xlsx.png"
                                            alt="Imagen de Dashboard"
                                            style={{
                                                width: window.screen.width * 0.12,
                                                height: window.screen.height * 0.27,
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    justifySelf: 'end',
                                    margin: 15,
                                    marginTop: window.screen.height * 0.025,
                                    marginBottom: window.screen.height * 0.025
                                }}
                            >

                                <button
                                    onClick={() => {
                                        handleUploadData(datosEmpleados);
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
                                        fontSize: 13,
                                        fontFamily: 'Maven Pro',
                                    }}>
                                    Guardar
                                </button>
                            </div>

                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>



        </Transition>

    )

}

export default CargarEmpleadosModal;
