<template>
  <el-form>
    <el-form-item
      :config="config"
      class="el-login-item">
      <el-button
        size="small"
        type="primary"
        class="login-action-button"
        @click="loginAction" >{{ 'ログイン' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Rest from '../api/Rest'

export default {
  name: 'Login',
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    loginAction() {
      const apiConfig = {
        serviceCode: 'lakeel-passport-api',
        apiCode: 'serviceAccountLogin',
        userpoolId: 'lakeel',
        clientId: 'validation-batch',
        clientSecret: 'b9af4a73-b78e-409d-b1bf-7690c46e60aa',
        tenantCode: 'lakeel'
      }
      if (!Object.keys(this.config).length) this.config = apiConfig
      try {
        if (this.config.tenantCode) sessionStorage.setItem('tenantCode', this.config.tenantCode)
        const loginRes = new Rest().request({
          targetApi: {
            serviceCode: this.config.serviceCode,
            apiCode: this.config.apiCode
          },
          path: {
            userpoolId: this.config.userpoolId
          },
          data: {
            clientId: this.config.clientId,
            clientSecret: this.config.clientSecret,
            offlineAccess: true
          }
        })
        console.lg('loginRes', loginRes)
        if (loginRes) sessionStorage.setItem('accessToken', loginRes.accessToken)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.log-toolbar {
  border-bottom: 1px #dcdfe6 solid;
}
</style>
