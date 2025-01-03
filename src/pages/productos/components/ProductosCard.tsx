import IconArrowLeft from '../../../components/Icon/IconArrowLeft';

const ProductosCard = ({
    cardData
}:{
    cardData: any[];
}) => {

    return(

        <div style={{ margin: '1rem' }}>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "16px",
                    width: '100%',
                }}>
                    {cardData.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #3B3F5C",
                                borderRadius: "4px",
                                padding: 12,
                                width: "210px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >

                            <div
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    textAlign: 'center',
                                    fontWeight: 200,
                                    fontSize: '1.5rem',
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
                                    width: '100%',
                                    height: 'auto',
                                    textAlign: 'center',
                                    fontSize: '3rem',
                                    fontWeight: 400,
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
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p style={{fontFamily: 'Maven Pro'}}>Plazo: </p>
                                </div>
                                <div>
                                    <p style={{fontFamily: 'Maven Pro'}}>{data.term}</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p>Tipo de Débito: </p>
                                </div>
                                <div>
                                    <p>{data.type}</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p style={{fontFamily: 'Maven Pro'}}>
                                        Tarifa de Capital:
                                    </p>
                                </div>
                                <div>
                                    <p>${data.capitalRate.toFixed(2)}</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p style={{fontFamily: 'Maven Pro'}}>
                                        Costo Transaccional:
                                    </p>
                                </div>
                                <div>
                                    <p>${data.transactionCost.toFixed(2)}</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p style={{fontFamily: 'Maven Pro'}}>
                                        IVA costo transaccional:
                                    </p>
                                </div>
                                <div>
                                    <p>${data.vatCost.toFixed(2)}</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '8px 0',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 13,
                                    fontWeight: 400,
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconArrowLeft />
                                    </div>
                                    <p style={{fontFamily: 'Maven Pro'}}>
                                        <strong>Total: </strong>
                                    </p>
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
