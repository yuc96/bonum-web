import IconHome from "../components/Icon/IconHome";
import HomeIcon from '@mui/icons-material/Home';

const Index = () => {

    return (
        <div
            style={{
                backgroundColor: 'white',
            }}
        >
            <div
                style={{

                    display: 'flex',
                    flexDirection: 'row',
                    //backgroundColor: 'red',
                    height: window.screen.width * 0.02,
                    padding: 20,
                    margin: 20,
                }}
            >
                <div
                    style={{
                        width: window.screen.width * 0.03,
                        justifyItems: 'center'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                        <path d="M2.75 7.82427L11 1.73877L19.25 7.82427V17.3872C19.25 17.8483 19.0568 18.2906 18.713 18.6167C18.3692 18.9427 17.9029 19.1259 17.4167 19.1259H4.58333C4.0971 19.1259 3.63079 18.9427 3.28697 18.6167C2.94315 18.2906 2.75 17.8483 2.75 17.3872V7.82427Z" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.25 19.1258V10.4323H13.75V19.1258" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div
                    style={{
                        paddingLeft: '1vw',
                        textAlign: "center"
                    }}
                >
                    <text> Dashboard </text>
                </div>

            </div>

            <div
                style={{
                    height: '70vh', 
                    width: '100%', 
                    overflow: 'hidden', 
                    padding: 10
                }}
            >
                <img
                    src="/assets/images/banner_min.png"
                    alt="Imagen de Dashboard"
                    style={{
                        width: '100%', // La imagen ocupa el ancho completo
                        height: '100%', // La imagen ocupa la altura completa
                        objectFit: 'cover', // Se adapta sin distorsionarse
                    }}
                />
            </div>

        </div>
    );
};

export default Index;
