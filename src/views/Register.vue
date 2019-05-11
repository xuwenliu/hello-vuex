<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left"></mu-button>注册/登录
			<mu-button flat slot="right">
				<mu-icon value="home"></mu-icon>
			</mu-button>
		</mu-appbar>
		<mu-container>
			<mu-form ref="form" :model="form" class="mu-register-form">
				<mu-text-field
					icon="account_circle"
					prop="userName"
					v-model="form.userName"
					label="用户名"
                    label-float
                    help-text="6-12位中文数字字母下划线"
                    max-length="12"
                    @change="userNameChange"
                    :error-text="userNameError"
				></mu-text-field>
				<br>
				<mu-text-field
					icon="locked"
					type="password"
					prop="password"
					v-model="form.password"
					label="密码"
                    label-float
                    help-text="6-20字母数字下划线"
                    max-length="20"
                    @change="passwordChange"
                    :error-text="passwordError"
				></mu-text-field>
				<mu-form-item class="submit-btns">
					<mu-button color="primary" @click="submit(1)">注册</mu-button>
					<mu-button @click="submit(2)">登录</mu-button>
				</mu-form-item>
			</mu-form>
		</mu-container>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { USER_REGISTER, USER_LOGIN,RESET_USER } from '@/vuex/mutation-types';
	export default {
		data() {
			return {
                userNameError:'',
                passwordError:'',
			};
        },
        computed:{
            ...mapState('user',{
                form: state=> state.form
            })
        },
        methods:{
            async submit(type){
                // type 1=注册 2=登录
                if(this.userNameChange() && this.passwordChange()){
                    if(this.form.userName === this.form.password){
                        this.$toast.warning('用户名和密码不能相同');
                        return ;
                    }
                    let str = type ===1 ?USER_REGISTER:USER_LOGIN;
                    let result = await this.$store.dispatch(`user/${str}`, this.form);
                    if(result.data.success){
                        this.$toast.success(`${type ===1?'注册成功!':'登录成功!'}`);
                        this.reset();
                        this.$router.push({name:'index'});
                    }else {
                        this.$toast.error(result.data.msg);
                    }

                    
                }
            },
            userNameChange(){
                let reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{6,12}$/;
                if(!reg.test(this.form.userName)){
                    this.userNameError = '用户名格式错误';
                    return false;
                }else {
                    this.userNameError = '';
                    return true;
                }
            },
            passwordChange(){
                let reg = /^[A-Za-z0-9_]{6,20}$/;
                if(!reg.test(this.form.password)){
                    this.passwordError = '密码格式错误';
                    return false;
                }else {
                    this.passwordError = '';
                    return true;
                }
            },
            //重置
			reset() {
				this.$refs.form.clear();
				this.$store.commit(`user/${RESET_USER}`);
			}
        }
	};
</script>
<style scope lang="less">
	.container {
        margin-top: 30px;
        .mu-register-form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .submit-btns{
                margin-top: 40px;
            }
        }
	}
</style>

