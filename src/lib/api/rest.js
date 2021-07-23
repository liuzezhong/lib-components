import { WebApiClientFactory, ClientType } from 'lib-web-api-client';

export default {
    async request(apiConfig) {
        let hostName = '';
        if (window && window._Vue && window._Vue.prototype) hostName = window._Vue.prototype.$lakeelSynergyLogicHostName;
        const apiClient = WebApiClientFactory.create(ClientType.frontend, hostName);
        const lslConfig = {
            targetApi: apiConfig.targetApi,
            query: apiConfig.query,
            path: apiConfig.path
        };
        const data = apiConfig.data;
        const request = {
            lslConfig,
            data
        };
        const result = await apiClient.request(request);
        return result.data;
    }
};
