<template>
  <i-form
    ref="formLogin"
    :model="formLogin"
    :rules="formLoginRules"
    class="card-box"
    style="border: 1px solid #8492A6;"
  >
    <Form-item class="formLogin-title">
      <h3>人事管理系统登录</h3>
    </Form-item>

    <Form-item prop="username">
      <i-input
        size="large"
        type="text"
        v-model="formLogin.username"
        placeholder="用户名"
      >
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>
    <Form-item prop="password">
      <i-input
        size="large"
        type="password"
        v-model="formLogin.password"
        placeholder="密码"
      >
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>
    <Form-item class="login-no-bottom">
      <Row>
        <i-col :xs="{ span: 4, offset: 6 }">
          <i-button type="primary" @click="handleSubmit('formLogin')"
            >登录</i-button
          >
        </i-col>
        <i-col :xs="{ span: 4, offset: 6 }">
          <i-button type="primary" @click="formLoginReset('formLogin')"
            >重置</i-button
          >
        </i-col>
      </Row>
    </Form-item>
  </i-form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      formLoginRules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        sessionStorage.setItem(
          'user',
          JSON.stringify(this.formLogin.username)
        );
        if (valid) {
          axios.post('/api/user/signIn', { username: this.formLogin.username, password: this.formLogin.password })
            .then((res) => {
              if( res.data.success ) {
                this.$Message.success('登录成功!');
                this.$router.push({ path: '/userlist' });
              } else {
                this.$Message.error(res.data.message);
              }
            }).catch((res) => {
              this.$Message.error(res.data.message);
            });
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    formLoginReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    if (sessionStorage.getItem('username')) {
      this.formLogin.username = JSON.parse(
        sessionStorage.getItem('username')
      );
    }
    if (sessionStorage.getItem('password')) {
      this.formLogin.password = JSON.parse(sessionStorage.getItem('password'));
    }
  }
};
</script>

<style scoped>
.card-box {
  padding: 20px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 180px auto;
  width: 400px;
  /* border: 2px solid #8492A6;*/
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.formLogin-title {
  text-align: center;
}
.formLogin-title h3 {
  font-size: 18px;
}
.login-no-bottom {
  margin-bottom: 10px;
}
</style>
