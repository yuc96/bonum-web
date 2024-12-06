const ambiente = 'local';
const urlAmbiente = {
    local:
    {
        host: 'http://167.172.247.51:3000', 
    },
};

const initConfig = {
    ambiente: ambiente,
    host: urlAmbiente[ambiente].host,
}

export default initConfig;
