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

        <>
            <div
                style={{
                    // backgroundColor: 'cyan',
                    //fontFamily: Nunito;
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 400,
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
                        fontFamily: 'Maven Pro',
                        paddingTop: 38,
                        paddingBottom: 31,
                        paddingLeft: 39
                        //fontFamily: Nunito,

                    }}
                >
                    <p> Productos </p>
                </div>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginLeft: 24,
                    marginRight: 24
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
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px'
                            }}
                        >
                            <button
                                style={{
                                    width: '156px',
                                    height: '40px',
                                    flexShrink: 0,
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
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                    paddingBottom: 3,
                                    marginLeft: 15
                                }}
                            >
                                <p>
                                    Todos los productos
                                </p>
                            </button>

                        </div>

                        <form
                            className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                            onSubmit={() => setSearchData(false)}
                        >
                            <div
                                className="relative flex items-center"
                                style={{
                                    width: '218px',
                                    height: '42px',
                                    marginRight: 15
                                }}
                            >

                                <input
                                    type="text"
                                    className="!flex items-center border border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    placeholder="Buscar..."
                                    style={{
                                        fontFamily: 'Maven Pro',
                                        fontWeight: 400,
                                        borderRadius: 6,
                                        border: '1px solid #E0E6ED',
                                        background: '#FFF',
                                        width: '218px',
                                        height: '42px',
                                        flexShrink: 0,
                                        outline: 'none'
                                    }}
                                />

                                <div
                                    className="absolute right-2 flex items-center justify-center cursor-pointer"
                                    onClick={() => { }}
                                >
                                    <IconSearch className="w-5 h-5 text-gray-500" />
                                </div>

                            </div>

                        </form>


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
        </>
    )

}

export default Productos;