import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useContext, useEffect, useState } from "react";
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import IconTrash from '../../../components/Icon/IconTrash';
import IconEye from '../../../components/Icon/IconEye';
import { delete_empleados } from '../../../server/empleados/EmpleadosApi';
import { AccionContext } from '../../../contexts/AccionesContext';
import EditarEmpleadoModal from '../modal/EditarEmpleadoModal';

const EmpleadosTable = ({
    rowData,
    isChecked,
    openModal,
    openModalNew,
    page,
    pageSize,
    initialRecords,
    recordsData,
    search,
    searchData,
    sortStatus,
    hideCols,
    setIsChecked,
    setOpenModal,
    setOpenModalNew,
    setPage,
    setPageSize,
    setSearch,
    setSearchData,
    setSortStatus,
    setHideCols,
    PAGE_SIZES,
    openModalEdit,
    setOpenModalEdit,
    hideButton,
    setHideButton,
    openMessage,
    setOpenMessage
}: {
    rowData: any[];
    isChecked: boolean;
    openModal: boolean;
    openModalNew: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    recordsData: any[];
    search: string;
    searchData: boolean;
    sortStatus: DataTableSortStatus;
    hideCols: any;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalNew: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
    setHideCols: React.Dispatch<React.SetStateAction<any>>;
    PAGE_SIZES: any[];
    openModalEdit: boolean;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
    hideButton: boolean;
    setHideButton: React.Dispatch<React.SetStateAction<boolean>>;
    openMessage: boolean;
    setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    useEffect(() => {
        console.log(rowData)
    }, [])

    const { accionDatos } = useContext(AccionContext);
    const [idEmpleado, setIdEmpleado] = useState(0)

    const handleDelete = (id: any) => {
        delete_empleados(id)
            .then((res) => {
                accionDatos();
                console.log("Borrado?: ", res);
            })
            .catch((err) => {
                console.log("Error en la API: ", err);
            })
    }

    function configDate(fecha: string): string {

        const months = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
        ];

        const date = new Date(fecha);

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    };

    return (

        <div
            className="datatables"
            style={{
                marginTop: 24
            }}
        >
            <TableContainer component={Paper}>
                <Table
                    sx={{
                        minWidth: 500
                    }}
                    size="medium"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#e9efff',
                            flexShrink: 0,
                        }}
                    >
                        <TableRow>

                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Identificación </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Nombre </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Email </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Fecha </p>
                            </TableCell>
                            <TableCell
                                align='right'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Sueldo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Estado  </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Maven Pro',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Acciones </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rowData!.length > 0 ?
                            <>
                                {rowData.map((row, index) => (
                                    <TableRow key={row.identification_number} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.identification_number} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.name + ' ' + row.lastname} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.email} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p>
                                                {configDate(row.registration_date)}
                                            </p>
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {'$' + row.net_salary.toFixed(2)} </p>

                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Maven Pro',
                                                fontWeight: 400,
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                lineHeight: 'normal',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                justifyItems: 'center',
                                                alignItems: 'center'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    width: '88.201px',
                                                    height: '24px',
                                                    flexShrink: 0,
                                                    borderRadius: 4,
                                                    boxShadow: '4px 10px 15px 0px rgba(0, 0, 0, 0.12)',
                                                    backgroundColor: row.status === 'active' ? '#00AB55' : '#E7515A',
                                                    color: 'white',
                                                    fontFamily: 'Maven Pro',
                                                    fontWeight: 400,
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    lineHeight: 'normal',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    justifyItems: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <p style={{ paddingBottom: 2 }}>
                                                    {row.status === 'active' ? 'Activo' : 'Inactivo'}
                                                </p>

                                            </div>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: window.screen.width * 0.08,
                                                justifyContent: 'center',
                                                justifyItems: 'center',
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <button
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginTop: window.screen.height * 0.009
                                                }}
                                                onClick={() => {
                                                    setIdEmpleado(row._id)
                                                    setOpenModalEdit(!openModalEdit)
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M0.833496 10C0.833496 10 4.16683 3.33337 10.0002 3.33337C15.8335 3.33337 19.1668 10 19.1668 10C19.1668 10 15.8335 16.6667 10.0002 16.6667C4.16683 16.6667 0.833496 10 0.833496 10Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginLeft: window.screen.width * 0.02
                                                }}
                                                onClick={() => {
                                                    handleDelete(row._id)
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M2.5 5H4.16667H17.5" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M15.8332 4.99996V16.6666C15.8332 17.1087 15.6576 17.5326 15.345 17.8451C15.0325 18.1577 14.6085 18.3333 14.1665 18.3333H5.83317C5.39114 18.3333 4.96722 18.1577 4.65466 17.8451C4.3421 17.5326 4.1665 17.1087 4.1665 16.6666V4.99996M6.6665 4.99996V3.33329C6.6665 2.89127 6.8421 2.46734 7.15466 2.15478C7.46722 1.84222 7.89114 1.66663 8.33317 1.66663H11.6665C12.1085 1.66663 12.5325 1.84222 12.845 2.15478C13.1576 2.46734 13.3332 2.89127 13.3332 3.33329V4.99996" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8.3335 9.16663V14.1666" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M11.6665 9.16663V14.1666" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </>
                            :
                            <>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell
                                        align='center'
                                        colSpan={8}
                                        //size='small'
                                        sx={{
                                            width: '1%',
                                            height: 300,
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >

                                        Sin Registros

                                    </TableCell>
                                </TableRow>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: '2px',
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingBottom: 20
                }}
            >

                <div
                    style={{ width: '240px', marginRight: 9 }}
                >
                    <Typography
                        style={{
                            color: '#3B3F5C',
                            fontFamily: 'Nunito',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal'
                        }}
                    >
                        Mostrando {rowData!.length} de {rowData!.length} registros
                    </Typography>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <select
                        value={pageSize!}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{
                            width: '70px',
                            height: '34px',
                            flexShrink: 0,
                            borderRadius: 6,
                            border: '1px solid #E0E6ED',
                            background: '#FFFFF',
                            paddingLeft: 13,
                            outline: 'none'
                        }}
                    >
                        {PAGE_SIZES!.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right',
                        gap: '5px',
                        paddingRight: 63
                    }}
                >
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        style={{
                            width: '36px',
                            height: '36px',
                            flexShrink: 0,
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page === 1 ? '#f5f5f5' : '#ffffff',
                            color: page === 1 ? '#ccc' : '#000',
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M10.9375 11.375L6.5625 7L10.9375 2.625M7.4375 11.375L3.0625 7L7.4375 2.625" stroke="#3B3F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    {[...Array(Math.ceil(rowData!.length / pageSize)).keys()].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            style={{
                                width: '36px',
                                height: '36px',
                                flexShrink: 0,
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                backgroundColor: page === index + 1 ? '#BF5CF3' : '#f5f5f5',
                                color: page === index + 1 ? '#ffffff' : '#000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: page === index + 1 ? 600 : 300,
                                fontFamily: 'Nunito',
                                fontSize: 14,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={page * pageSize >= initialRecords!.length}
                        onClick={() => setPage(page + 1)}
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page * pageSize >= initialRecords!.length ? '#f5f5f5' : '#ffffff',
                            color: page * pageSize >= initialRecords!.length ? '#ccc' : '#000',
                            cursor: page * pageSize >= initialRecords!.length ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3.0625 11.375L7.4375 7L3.0625 2.625M6.5625 11.375L10.9375 7L6.5625 2.625" stroke="#3B3F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <EditarEmpleadoModal
                idEmpleado={idEmpleado}
                openModalEdit={openModalEdit}
                setOpenModalEdit={setOpenModalEdit}
                hideButton={hideButton}
                setHideButton={setHideButton}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
            />

        </div >

    )

}

export default EmpleadosTable;

