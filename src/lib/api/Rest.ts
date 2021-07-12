import { WebApiClient, WebApiClientFactory, ClientType, Request, Response } from 'lib-web-api-client';

export default class Rest {
    async request(apiConfig: any): Promise<any> {
        let hostName: string = '';
        const windowTarget: any = (window as any);
        if (windowTarget && windowTarget._Vue && windowTarget._Vue.prototype) hostName = windowTarget._Vue.prototype.$lakeelSynergyLogicHostName;
        const apiClient: WebApiClient = WebApiClientFactory.create(ClientType.frontend, hostName);
        const lslConfig: any = {
            targetApi: apiConfig.targetApi,
            query: apiConfig.query,
            path: apiConfig.path
        };
        const data: any = apiConfig.data;
        const request: Request = {
            lslConfig,
            data
        };
        const result: Response = await apiClient.request(request);
        return result.data;
    }
}