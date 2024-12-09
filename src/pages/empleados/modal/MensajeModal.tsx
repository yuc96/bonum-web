import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';

const MensajeModal = (

    {
        openMessage,
        setOpenMessage,
        openModalEdit,
        setOpenModalEdit
    }
    :
    {
        openMessage: boolean;
        setOpenMessage: (isOpen: boolean) => void;
        openModalEdit: boolean;
        setOpenModalEdit: (isOpen: boolean) => void;

    }

) => {

    return (
        <Transition
            appear
            show={openMessage}
            as={Fragment}>
            <Dialog
                as="div"
                open={openMessage} onClose={() => setOpenMessage(false)}>
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
                                // width: window.screen.width * 0.277,
                                width: '512px',
                                height: '125px',
                                flexShrink: 0,
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
                                    color: '#3B3F5C',
                                    textAlign: 'center',
                                    //fontFamily: Nunito;
                                    fontSize: 20,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    paddingTop: 15,
                                    paddingLeft: 20,
                                    paddingBottom: 10,
                                    paddingRight: 20,
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <p> Guardado Exitosamente </p>
                            </div>

                            <div
                                style={{
                                    color: '#3B3F5C',
                                    textAlign: 'center',
                                    //fontFamily: Nunito;
                                    fontSize: 20,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    paddingTop: 15,
                                    paddingLeft: 20,
                                    paddingBottom: 20,
                                    paddingRight: 20,
                                    fontFamily: 'Maven Pro',
                                }}
                            >

                                <button
                                    onClick={() => {
                                        setOpenMessage(false)
                                    }}
                                    type="button"
                                    style={{
                                        width: '60px',
                                        height: '36px',
                                        flexShrink: 0,
                                        marginLeft: window.screen.width * 0.005,
                                        backgroundColor: '#bf5cf3',
                                        padding: 5,
                                        borderRadius: 5,
                                        color: 'white',
                                        fontSize: 14,
                                        fontFamily: 'Maven Pro',
                                    }}>
                                    OK
                                </button>

                            </div>

                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

        </Transition>
    )

}

export default MensajeModal;