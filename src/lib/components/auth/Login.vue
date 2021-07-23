<template>
    <el-form class="auto-login-main">
        <el-form-item
            :config="config"
            class="el-login-item">
            <el-button
                size="small"
                type="primary"
                class="login-action-button"
                @click="loginAction" >{{ 'ログイン' }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import rest from '../../api/rest';

export default {
    name: 'Login',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        async loginAction() {
            console.log('start to login...');
            try {
                let localConfig = {
                    serviceCode: 'lakeel-passport-api',
                    apiCode: 'serviceAccountLogin',
                    userpoolId: 'lakeel',
                    clientId: 'validation-batch',
                    clientSecret: 'b9af4a73-b78e-409d-b1bf-7690c46e60aa',
                    tenantCode: 'lakeel'
                };
                if (this.config && Object.prototype.toString.call(this.config) === '[object Object]' && Object.keys(this.config).length > 0) localConfig = this.config;
                if (localConfig.tenantCode) sessionStorage.setItem('tenantCode', localConfig.tenantCode);
                const loginRes = await rest.request({
                    targetApi: {
                        serviceCode: localConfig.serviceCode,
                        apiCode: localConfig.apiCode
                    },
                    path: {
                        userpoolId: localConfig.userpoolId
                    },
                    data: {
                        clientId: localConfig.clientId,
                        clientSecret: localConfig.clientSecret,
                        offlineAccess: true
                    }
                });
                console.log('loginRes', loginRes);
                if (loginRes) sessionStorage.setItem('accessToken', loginRes.accessToken);
                console.log('login success !');
            } catch (e) {
                console.log('login failed .');
                console.error(e);
            }
        }
    }
};
</script>

<style scoped>
.auto-login-main {
    display: flex;
    justify-content: flex-end;
}
.el-login-item .login-action-button{
    min-width: 100px;
}
</style>
