import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../components/Icon/IconSearch";
import Dropdown from "../../components/Dropdown";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ProductosCard from './components/ProductosCard';

const cardData = [
    {
        id: "AS100-1",
        amount: 100,
        term: 1,
        type: "Mensual",
        capitalRate: 100.0,
        transactionCost: 16.23,
        vatCost: 1.13,
        total: 117.33,
    },
    {
        id: "AS100-2",
        amount: 100,
        term: 2,
        type: "Mensual",
        capitalRate: 100.0,
        transactionCost: 19.15,
        vatCost: 1.31,
        total: 120.46,
    },
    {
        id: "AS200-2",
        amount: 200,
        term: 2,
        type: "Mensual",
        capitalRate: 200.0,
        transactionCost: 21.23,
        vatCost: 2.11,
        total: 224.44,
    },
    {
        id: "AS200-3",
        amount: 200,
        term: 3,
        type: "Mensual",
        capitalRate: 200.0,
        transactionCost: 22.31,
        vatCost: 2.80,
        total: 230.03,
    },
    {
        id: "AS100-3",
        amount: 300,
        term: 3,
        type: "Mensual",
        capitalRate: 300.0,
        transactionCost: 32.23,
        vatCost: 3.11,
        total: 335.44,
    },
];


const Productos = () => {

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [searchData, setSearchData] = useState(false);

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'phone', title: 'Phone' },
        { accessor: 'company', title: 'Company' },
        { accessor: 'address.street', title: 'Address' },
        { accessor: 'age', title: 'Age' },
        { accessor: 'dob', title: 'Birthdate' },
        { accessor: 'isActive', title: 'Active' },
    ];

    return (

        <div>
            <div
                style={{
                    //backgroundColor: 'cyan',
                    //fontFamily: Nunito;
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingTop: 15,
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    fontFamily: 'Maven Pro'
                }}
            >

                <div
                    style={{
                        //background: 'blue',
                        width: '6vw',
                        justifyItems: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        fontFamily: 'Maven Pro'
                        //fontFamily: Nunito,

                    }}
                >
                    <p> Productos </p>
                </div>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    margin: window.screen.width * 0.007,
                    borderRadius: 5,
                    // borderTopLeftRadius: 10,
                    // borderTopRightRadius: 10
                }}
            >


                <div
                    style={{
                        //backgroundColor: 'green',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 15
                    }}
                >

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            //backgroundColor: 'green',
                            alignItems: 'center'
                        }}
                    >

                        <div
                            style={{
                                //backgroundColor: 'yellow',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px'
                            }}
                        >
                            <button
                                style={{
                                    marginLeft: '20px',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: '161px',
                                    height: window.screen.height * 0.05,
                                    backgroundColor: '#bf5cf3',
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5vw',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p>
                                    Todos los productos
                                </p>
                            </button>

                            {/*
                            <button
                                style={{
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: '111px',
                                    height: window.screen.height * 0.05,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    color: 'black',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5vw',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p>
                                    Adelantos
                                </p>
                            </button>

                            <button
                                style={{
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: '111px',
                                    height: window.screen.height * 0.05,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    color: 'black',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5vw',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p
                                    style={{
                                        color: 'black'
                                    }}
                                >
                                    Tarjetas
                                </p>
                            </button>
                            */}

                        </div>

                        <div
                            style={{
                                paddingRight: 15,
                                //backgroundColor: 'cyan',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                gap: '5px',
                                width: '100%'
                            }}
                        >

                            <form
                                className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearchData(false)}
                            >

                                <div
                                    className="relative flex items-center"
                                    style={{
                                        width: 219,
                                        height: 38,
                                    }}
                                >

                                    <input
                                        type="text"
                                        className="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                        placeholder="Buscar..."
                                        style={{
                                            //backgroundColor: 'red',
                                            marginTop: window.screen.height * 0.013,
                                            width: 219,
                                            height: 38,
                                            color: '#888EA8',
                                            //fontFamily: Nunito;
                                            fontSize: 14,
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                            outline: 'none',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    />

                                    <div
                                        className="absolute right-2 flex items-center justify-center cursor-pointer"
                                        onClick={() => { }}
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        <IconSearch className="w-5 h-5 text-gray-500" />
                                    </div>

                                </div>

                            </form>

                            <button
                                type="button"
                                onClick={() => setSearchData(!searchData)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button>


                        </div>

                    </div>

                    {/* <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        marginLeft: window.screen.width * 0.14
                    }}
                >


                </div> */}

                </div>

                <ProductosCard
                    cardData={cardData}
                />


            </div>
        </div>
    )

}

export default Productos;