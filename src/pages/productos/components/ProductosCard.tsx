import IconArrowLeft from '../../../components/Icon/IconArrowLeft';

const ProductosCard = ({
    cardData
}:{
    cardData: any[];
}) => {

    return(

        <div style={{ margin: '1vh' }}>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "16px",
                    width: '100%',
                    //backgroundColor: 'green'
                }}>
                    {cardData.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #3B3F5C",
                                borderRadius: "4px",
                                padding: 12,
                                //width: window.screen.width * 0.22,
                                //height: window.screen.width * 0.237,
                                //backgroundColor: 'cyan',
                                //height: '303px',
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >

                            <div
                                style={{
                                    //width: window.screen.width * 0.197,
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.04,
                                    //backgroundColor: 'red',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    fontWeight: 200,
                                    fontSize: 24,
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <div>
                                    <p style={{fontFamily: 'Maven Pro'}}>{data.id}</p>
                                </div>

                                <div>
                                    ______
                                </div>

                            </div>

                            <div
                                style={{
                                    //width: window.screen.width * 0.197,
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.09,
                                    //backgroundColor: 'orange',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    fontSize: 48,
                                    fontWeight: 700,
                                    marginTop: '2vh',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <h2>${data.amount}</h2>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    //backgroundColor: 'blue',
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'Maven Pro'}}>Plazo: </p>
                                    </div>
                                </div>

                                <div>
                                    <p style={{ fontFamily: 'Maven Pro'}}>{data.term}</p>
                                </div>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    //backgroundColor: 'pink',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p>Tipo de Débito: </p>
                                    </div>
                                </div>

                                <div>
                                    <p>{data.type}</p>
                                </div>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    //backgroundColor: 'red',
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro'
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p style={{fontFamily: 'Maven Pro'}}>
                                            Tarifa de Capital:
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p>${data.capitalRate.toFixed(2)}</p>
                                </div>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    //backgroundColor: 'gray',
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro'
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p>Costo Transaccional: </p>
                                    </div>
                                </div>


                                <div>
                                    <p>${data.transactionCost.toFixed(2)}</p>
                                </div>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    //backgroundColor: 'orange',
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p>IVA costo transaccional: </p>
                                    </div>
                                </div>

                                <div>
                                    <p>${data.vatCost.toFixed(2)}</p>
                                </div>


                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: window.screen.width * 0.17,
                                    height: window.screen.height * 0.038,
                                    //backgroundColor: 'purple',
                                    justifyContent: 'space-between',
                                    justifySelf: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    lineHeight: '30px',
                                    fontFamily: 'Maven Pro'
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '1vw',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <div style={{ marginTop: '1vh' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <div>
                                        <p><strong>Total: </strong></p>
                                    </div>
                                </div>

                                <div>
                                    <p>${data.total.toFixed(2)}</p>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

            </div>

    )

}

export default ProductosCard;