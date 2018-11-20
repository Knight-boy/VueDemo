<template>
	<div class="loginContainer">
		<head-top :head-title="loginWay? '登录':'密码登录'" goBack="true"></head-top>

		<form class="loginForm" v-if="loginWay">
			<section class="input_container phone_number">
				<input type="text" placeholder="账号密码输入" name="phone" maxlength="11" v-model="phoneNumber">
				<button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
				<button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
			</section>
			<section class="input_container">
				<input type="text" placeholder="验证码" name="mobileCode" maxLength="6" v-model="mobileCode">
			</section>
		</form>

		<form class="loginForm" v-else>
			<section class="input_container">
				<input type="text" placeholder="账号" v-model.lazy="userAccount">
			</section>
			<section class="input_container">
				<input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
				<input v-else type="text" placeholder="密码" v-model="passWord">
				<div class="button_switch" :class="{change_to_text: showPassword}">
					<div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
					<span>abc</span>
					<span>...</span>
				</div>
			</section>
			<section class="input_container captcha_code_container">
				<input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
				<div class="img_change_img">
					<img v-show="captchaCodeImg" :src="captchaCodeImg">
					<div class="change_img" @click="getCaptchaCode">
						<p>看不清</p>
						<p>换一张</p>
					</div>
				</div>
			</section>
		</form>

		<p class="login_tips">
			温馨提示： 未注册过的账号， 登陆时自动注册
		</p>
		<p class="login_tips">
			注册过的用户可凭账号密码登陆
		</p>
		<div class="login_container" @click="mobileLogin">登录</div>
		<router-link to="/forget" class="to_forget" v-if="!loginWay">忘记密码?</router-link>
		<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import headTop from '@/components/header/head'
	import alertTip from '@/components/common/alertTip'
	import {localapi, proapi, imgBaseUrl} from '@/config/env'
	import {mapState, mapMutations} from 'vuex'
	import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from "@/service/getData"

	export default {
		data() {
			return {
				loginWay: false,
				showPassword: false,
				phoneNumber: null,
				mobileCode: null,
				validate_token: null,
				computedTime: 0,
				userInfo: null,
				userAccount: null,
				passWord: null,
				captchaCodeImg: null,
				codeNumber: null,
				showAlert: false,
				alertText: null,
			}
		},
		created() {
			this.getCaptchaCode();
		},
		components: {
			headTop,
			alertTip,
		},
		computed: {
			rightPhoneNumber: function() {
				return /^1\d{10}$/gi.test(this.phone_number);
			}
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO',
			]),
			changeLoginWay() {
				this.loginWay = !this.loginWay;
			},
			changePassWordType() {
				this.showPassword = !this.showPassword;
			},
			async getCaptchaCode() {
				let res = await getcaptchas();
				this.captchaCodeImg = res.code;
			},
			async getVerifyCode() {
				if(this.rightPhoneNumber) {
					this.computedTime = 60;
					this.timer = setIterval(() => {
						this.computedTime--;
						if(this.computedTime===0) {
							clearInterval(this.timer)
						}
					}, 1000)

					let exsis = await checkExsis(this.phoneNumber, 'mobile');
					if(exsis.message) {
						this.showAlert = true;
						this.alertText = exsis.message;
						return
					}else if(!exsis.is_exists) {
						this.showAlert = true;
						this.alertText = "您尚未绑定手机号";
						return
					}

					let res = await mobileCode(this.phoneNumber);
					if(res.message) {
						this.showAlert = true;
						this.alertText = res.message;
						return
					}
					this.validate_token = res.validate_token;
				}
			},
			async mobileLogin() {
				if(this.loginWay) {
					if(!this.rightPhoneNumber) {
						this.showAlert = true;
						this.alertText = "手机号码不正确";
						return
					}else if(!(/^\d{6}$/gi.test(this.mobileCode))) {
						this.showAlert = true;
						this.alertText = "验证码错误";
						return
					}
					this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
				}else{
					if(!this.userAccount) {
						this.showAlert = true;
						this.alertText = '请输入手机号/邮箱/用户名';
						return
					}else if(!this.passWord){
						this.showAlert = true;
						this.alertText = "请输入密码";
						return
					}else if(!this.codeNumber){
						this.showAlert = true;
						this.alertText = "请输入验证码";
						return
					}
					this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
				}
				if(!this.userInfo.user_id) {
					this.showAlert = true;
					this.alertText = this.userInfo.message;
					if(!this.loginWay) this.getCaptchaCode();
				}else{
					this.RECORD_USERINFO(this.userInfo);
					this.$router.go(-1);
				}
			},
			closeTip() {
				this.showAlert = false;
			}
		}
	}

</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.loginContainer {
		padding-top: 1.95rem;
		p, span, input {
			font-family: Helvetica Neue, Tahoma, Arial;
		}
	}
	.change_login {
		position: absolute;
		@include ctb;
		right: 0.75px;
		@include sc(.7rem, #fff);
	}
	.loginForm {
		background-color: #fff;
		margin-top: .6rem;
		.input_container{
			display: flex;
			justify-content: space-between;
			padding: .6rem .8rem;
			border-bottom: 1px solid #f1f1f1;
			input{
				@include sc(.7rem, #666);
			}
			button{
				@include sc(.65rem, #fff);
				font-family: Helvetica Neue, Tahoma, Arial;
				padidng: .28rem .4rem;
				border: 1px;
				border-radius: .15rem;
			}
			.right_phone_number {
				background-color: #5cd965;
			}
		}
		.phone_number {
			padding: .3rem .8rem;
		}
		.captcha_code_container{
			height: 2.2rem;
			.img_change_img{
				display: flex;
				align-items: center;
				img{
					@include wh(3.5rem, 1.5rem);
					margin-right: .2rem;
				}
				.change_img{
					display: flex;
					flex-direction: 'column';
					flex-wrap: wrap;
					width: 2rem;
					justify-content: center;
					p{
						@include sc(.55rem, #666);
					}
					p:nth-of-type(2) {
						color: #3b9519;
						margin-top: .2rem;
					}
				}
			}
		}
	}
	.login_tips {
		@include sc(.5rem, red);
		padding: .4rem .6rem;
		line-heght: .5rem;
		a{
			color: #3b9519;
		}
	}
	.login_container {
		margin: 0 .5rem 1rem;
		@include sc(.7rem, #fff);
		padding: .5rem 0;
		background-color: #5cd965;
		border: 1px;
		border-radius: 0.15rem;
		text-align: center;
	}
	.button_switch{
		background-color: #ccc;
		display: flex;
		justify-content: center;
		@inclde wh(2rem, .7rem);
		padding: 0 .2rem;
		border: 1px;
		border-radius: .5rem;
		position: relative;
		.circle_button{
			transition: all .3s;
			position: absolute;
			top: -0.2rem;
			z-index: 1;
			left: -0.3rem;
			@include wh(1.2rem, 1.2rem);
			box-shadow: 0 0.03rem 0.05rem 0 rgba(0,0,0,0.1);
			background-color: #f1f1f1;
			border-radius: 50%;
		}
		.trans_to_right{
			transform: translateX(1.3rem);
		}
		span{
			@include sc(.45rem, #fff);
			transform: translateX(0.05rem);
			line-heght: 0.6rem;
		}
		span: nth-of-type(2) {
			transform: translateY(-.08rem);
		}
	}
	.change_to_text{
		background-color: #5cd965;
	}

	.to_forget {
		float: right;
		@include sc(.6rem, #3b95e9);
		margin-right: .3rem;
	}
</style>