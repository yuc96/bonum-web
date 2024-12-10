import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMenu from '../Icon/IconMenu';
import IconHome from '../Icon/IconHome';
import IconUser from '../Icon/IconUser';
import IconBook from '../Icon/IconBook';
import IconSquareCheck from '../Icon/IconSquareCheck';
import IconChartSquare from '../Icon/IconChartSquare';
import IconBolt from '../Icon/IconBolt';
import IconBarChart from '../Icon/IconBarChart';
import IconFolder from '../Icon/IconFolder';
import IconUserPlus from '../Icon/IconUserPlus';
import IconUsers from '../Icon/IconUsers';
import IconCreditCard from '../Icon/IconCreditCard';
import IconServer from '../Icon/IconServer';
import IconNotes from '../Icon/IconNotes';
import IconCode from '../Icon/IconCode';
import IconHelpCircle from '../Icon/IconHelpCircle';
import IconSettings from '../Icon/IconSettings';
import IconPencilPaper from '../Icon/IconPencilPaper';
import IconPencil from '../Icon/IconPencil';
import IconClipboardText from '../Icon/IconClipboardText';
import IconDollarSignCircle from '../Icon/IconDollarSignCircle';
import { blob } from 'stream/consumers';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingTop: 6,
                            paddingLeft: 17
                        }}
                    >

                        <img
                            src="/assets/images/logo_side.png"
                            alt="logo"
                            style={{
                                width: '145px',
                                height: '41px',
                                flexShrink: 0,
                                objectFit: 'cover'
                            }}
                        />

                        <button
                            style={{
                                width: '24px',
                                height: '22.761px',
                                flexShrink: 0,
                                paddingLeft: 57,
                                paddingTop: 7.07,
                                paddingRight: 20
                            }}
                            type="button"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            {/* <IconCaretsDown className="m-auto rotate-90" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                                <path d="M11 16.1936L6 11.4517L11 6.70972" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 16.1936L13 11.4517L18 6.70972" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                    </div>

                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">

                        <ul className="relative font-semibold space-y-0.5 p-4 py-0" style={{paddingTop: 24}}>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                {/* <IconHome className="group-hover:!text-primary shrink-0" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                    <path d="M2.75 7.82427L11 1.73877L19.25 7.82427V17.3872C19.25 17.8483 19.0568 18.2906 18.713 18.6167C18.3692 18.9427 17.9029 19.1259 17.4167 19.1259H4.58333C4.0971 19.1259 3.63079 18.9427 3.28697 18.6167C2.94315 18.2906 2.75 17.8483 2.75 17.3872V7.82427Z" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8.25 19.1258V10.4323H13.75V19.1258" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Dashboard
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/empleados" className="group">
                                            <div className="flex items-center">
                                                <IconUsers className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Colaboradores
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/productos" className="group">
                                            <div className="flex items-center">
                                                {/* <IconSquareCheck className="group-hover:!text-primary shrink-0" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                                    <g clip-path="url(#clip0_0_7325)">
                                                        <path d="M9.1665 3.16125H3.33317C2.89114 3.16125 2.46722 3.32779 2.15466 3.62422C1.8421 3.92065 1.6665 4.32269 1.6665 4.74191V15.8065C1.6665 16.2257 1.8421 16.6277 2.15466 16.9241C2.46722 17.2206 2.89114 17.3871 3.33317 17.3871H14.9998C15.4419 17.3871 15.8658 17.2206 16.1783 16.9241C16.4909 16.6277 16.6665 16.2257 16.6665 15.8065V10.2742" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M15.4165 1.97579C15.748 1.66138 16.1977 1.48474 16.6665 1.48474C17.1353 1.48474 17.585 1.66138 17.9165 1.97579C18.248 2.2902 18.4343 2.71663 18.4343 3.16127C18.4343 3.60592 18.248 4.03235 17.9165 4.34676L9.99984 11.8549L6.6665 12.6452L7.49984 9.48388L15.4165 1.97579Z" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_0_7325">
                                                            <rect width="20" height="18.9678" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Productos
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/anticipos" className="group">
                                            <div className="flex items-center">
                                                {/* <IconClipboardText className="group-hover:!text-primary shrink-0" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                                    <g clip-path="url(#clip0_0_7330)">
                                                        <path d="M12.8278 3.20362L13.3147 2.63316L13.3147 2.63316L12.8278 3.20362ZM16.1268 6.01946L15.6398 6.58992H15.6398L16.1268 6.01946ZM18.0453 8.02495L17.3665 8.34375L17.3665 8.34375L18.0453 8.02495ZM10.8413 1.79041L11.0978 1.08563L11.0978 1.08563L10.8413 1.79041ZM2.6433 16.4611L3.1594 15.917L3.1594 15.917L2.6433 16.4611ZM17.3573 16.4611L17.8734 17.0053L17.3573 16.4611ZM18.9951 14.3031C19.0378 13.8911 18.7385 13.5225 18.3265 13.4798C17.9145 13.437 17.5458 13.7364 17.5031 14.1484L18.9951 14.3031ZM11.667 16.6371H8.33366V18.1371H11.667V16.6371ZM2.41699 11.0645V7.90317H0.916992V11.0645H2.41699ZM17.5837 10.719V11.0645H19.0837V10.719H17.5837ZM12.3409 3.77407L15.6398 6.58992L16.6137 5.44901L13.3147 2.63316L12.3409 3.77407ZM19.0837 10.719C19.0837 9.40114 19.1002 8.50676 18.7242 7.70616L17.3665 8.34375C17.5672 8.77114 17.5837 9.26348 17.5837 10.719H19.0837ZM15.6398 6.58992C16.7796 7.56277 17.1632 7.911 17.3665 8.34375L18.7242 7.70616C18.3508 6.91091 17.6475 6.33147 16.6137 5.44901L15.6398 6.58992ZM8.35849 2.33057C9.68374 2.33057 10.1615 2.34113 10.5849 2.49519L11.0978 1.08563C10.368 0.820006 9.5749 0.830566 8.35849 0.830566V2.33057ZM13.3147 2.63316C12.4153 1.86553 11.8309 1.35244 11.0978 1.08563L10.5849 2.49519C11.005 2.64808 11.3604 2.93722 12.3409 3.77407L13.3147 2.63316ZM8.33366 16.6371C6.74217 16.6371 5.62016 16.6356 4.77095 16.5274C3.93941 16.4213 3.48375 16.2246 3.1594 15.917L2.1272 17.0053C2.77917 17.6237 3.59734 17.8899 4.58122 18.0153C5.54743 18.1385 6.78245 18.1371 8.33366 18.1371V16.6371ZM0.916992 11.0645C0.916992 12.5324 0.915225 13.7128 1.04646 14.6385C1.18135 15.5901 1.46963 16.3817 2.1272 17.0053L3.1594 15.917C2.84066 15.6147 2.64079 15.1982 2.53161 14.428C2.41876 13.632 2.41699 12.577 2.41699 11.0645H0.916992ZM11.667 18.1371C13.2182 18.1371 14.4532 18.1385 15.4194 18.0153C16.4033 17.8899 17.2215 17.6237 17.8734 17.0053L16.8412 15.917C16.5169 16.2246 16.0612 16.4213 15.2297 16.5274C14.3805 16.6356 13.2585 16.6371 11.667 16.6371V18.1371ZM8.35849 0.830566C6.79893 0.830566 5.55795 0.829143 4.58785 0.952276C3.60064 1.07758 2.77974 1.34344 2.1272 1.9623L3.1594 3.05068C3.48318 2.74361 3.94024 2.54651 4.77673 2.44034C5.63034 2.33199 6.75879 2.33057 8.35849 2.33057V0.830566ZM2.49757 4.81924C2.59654 3.86494 2.80511 3.38668 3.1594 3.05068L2.1272 1.9623C1.39286 2.65875 1.11973 3.56377 1.00557 4.6645L2.49757 4.81924ZM17.5031 14.1484C17.4041 15.1027 17.1955 15.581 16.8412 15.917L17.8734 17.0053C18.6078 16.3089 18.8809 15.4039 18.9951 14.3031L17.5031 14.1484ZM10.0837 1.97573V3.95154H11.5837V1.97573H10.0837ZM15.0003 8.65317H18.3337V7.15317H15.0003V8.65317ZM10.0837 3.95154C10.0837 4.86063 10.0819 5.62194 10.1674 6.22482C10.2565 6.85353 10.4532 7.41863 10.9278 7.86865L11.96 6.78028C11.8243 6.6516 11.7159 6.46165 11.6525 6.01428C11.5854 5.54107 11.5837 4.90527 11.5837 3.95154H10.0837ZM15.0003 7.15317C13.9981 7.15317 13.318 7.15173 12.8092 7.08685C12.3181 7.02423 12.1012 6.91427 11.96 6.78028L10.9278 7.86865C11.3967 8.31336 11.976 8.49276 12.6195 8.57481C13.2453 8.6546 14.0384 8.65317 15.0003 8.65317V7.15317Z" fill="#888EA8" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_0_7330">
                                                            <rect width="20" height="18.9678" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Adelantos
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/cobros" className="group">
                                            <div className="flex items-center">
                                                {/* <IconNotes className="group-hover:!text-primary shrink-0" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                                    <path d="M14.5118 8.67851C15 8.19036 15 7.40468 15 5.83333C15 4.26198 15 3.47631 14.5118 2.98816M14.5118 8.67851C14.0237 9.16667 13.238 9.16667 11.6667 9.16667H8.33333C6.76199 9.16667 5.97631 9.16667 5.48816 8.67851M14.5118 8.67851C14.5118 8.67851 14.5118 8.67851 14.5118 8.67851ZM14.5118 2.98816C14.0237 2.5 13.238 2.5 11.6667 2.5L8.33333 2.5C6.76198 2.5 5.97631 2.5 5.48816 2.98816M14.5118 2.98816C14.5118 2.98816 14.5118 2.98816 14.5118 2.98816ZM5.48816 2.98816C5 3.47631 5 4.26199 5 5.83333C5 7.40468 5 8.19036 5.48816 8.67851M5.48816 2.98816C5.48816 2.98816 5.48816 2.98816 5.48816 2.98816ZM5.48816 8.67851C5.48816 8.67851 5.48816 8.67851 5.48816 8.67851Z" stroke="#888EA8" stroke-width="1.25" />
                                                    <path d="M10.8332 5.83333C10.8332 6.29357 10.4601 6.66667 9.99984 6.66667C9.5396 6.66667 9.1665 6.29357 9.1665 5.83333C9.1665 5.3731 9.5396 5 9.99984 5C10.4601 5 10.8332 5.3731 10.8332 5.83333Z" stroke="#888EA8" stroke-width="1.25" />
                                                    <path d="M15 5C13.6193 5 12.5 3.88071 12.5 2.5" stroke="#888EA8" stroke-width="1.25" stroke-linecap="round" />
                                                    <path d="M15 6.66663C13.6193 6.66663 12.5 7.78591 12.5 9.16663" stroke="#888EA8" stroke-width="1.25" stroke-linecap="round" />
                                                    <path d="M5 5C6.38071 5 7.5 3.88071 7.5 2.5" stroke="#888EA8" stroke-width="1.25" stroke-linecap="round" />
                                                    <path d="M5 6.66663C6.38071 6.66663 7.5 7.78591 7.5 9.16663" stroke="#888EA8" stroke-width="1.25" stroke-linecap="round" />
                                                    <path d="M3.3335 17.8237H5.21677C6.05916 17.8237 6.91061 17.9114 7.73044 18.0803C9.18064 18.3791 10.7075 18.4153 12.1726 18.1781C12.895 18.0612 13.6052 17.8824 14.2481 17.5721C14.8284 17.292 15.5393 16.8972 16.0168 16.4549C16.4936 16.0133 16.9901 15.2906 17.3426 14.7256C17.6448 14.2412 17.4987 13.6468 17.0206 13.2859C16.4896 12.8849 15.7016 12.885 15.1707 13.286L13.6647 14.4237C13.081 14.8646 12.4435 15.2705 11.684 15.3916C11.5927 15.4062 11.497 15.4194 11.3971 15.431M11.3971 15.431C11.3671 15.4345 11.3366 15.4378 11.3058 15.441M11.3971 15.431C11.5186 15.405 11.6393 15.33 11.7525 15.2312C12.2885 14.7634 12.3224 13.975 11.8573 13.4526C11.7494 13.3314 11.6231 13.2303 11.4827 13.1466C9.1516 11.7562 5.52468 12.8152 3.3335 14.3691M11.3971 15.431C11.3667 15.4375 11.3363 15.441 11.3058 15.441M11.3058 15.441C10.8697 15.4857 10.3595 15.4973 9.7933 15.4439" stroke="#888EA8" stroke-width="1.25" stroke-linecap="round" />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Débitos
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/pagos" className="group">
                                            <div className="flex items-center">
                                                {/* <IconDollarSignCircle className="group-hover:!text-primary shrink-0" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                                    <g clip-path="url(#clip0_0_7345)">
                                                        <path d="M10.0003 13.4354C11.381 13.4354 12.5003 12.5508 12.5003 11.4596C12.5003 10.3684 11.381 9.48382 10.0003 9.48382C8.61961 9.48382 7.50033 8.59922 7.50033 7.50801C7.50033 6.41679 8.61961 5.53219 10.0003 5.53219M10.0003 13.4354C8.61961 13.4354 7.50033 12.5508 7.50033 11.4596M10.0003 13.4354V14.2258M10.0003 4.74187V5.53219M10.0003 5.53219C11.381 5.53219 12.5003 6.41679 12.5003 7.50801M5.83366 2.63788C7.05938 1.96543 8.48246 1.58057 10.0003 1.58057C14.6027 1.58057 18.3337 5.11897 18.3337 9.48382C18.3337 13.8487 14.6027 17.3871 10.0003 17.3871C5.39795 17.3871 1.66699 13.8487 1.66699 9.48382C1.66699 8.04429 2.0728 6.69466 2.78184 5.53219" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_0_7345">
                                                            <rect width="20" height="18.9678" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {/* {t('chat')} */}
                                                    Pagos
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
