<template>
	<div class="verify">
		<div class="box">
			<img src="../assets/verifyEmail.png" alt="">
			<div class="content">
				<h3 class="title">Email Security Verification</h3>
				<div class="desc">For security reason.We need to verify your email address.Please click "Send" to get the verification code in your inbox</div>
				<div class="email">Send To: {{$store.state.userInfo.email}}</div>
				<div class="inputbox">
					<input class="form-control" type="text" v-model="authCode" placeholder="Enter Verification Code">
					<span v-if="!hasSendCode" @click="sendCode">Send</span>
					<span v-if="hasSendCode">{{time}}</span>
				</div>
				<button class="btn" :class="{'highlight': highlight}" @click="verifyClick">Verify</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'verify',
	data () {
		return {
			authCode: '',
			hasSendCode: false,
			highlight: false,
			userEmail: '',
			time: 0
		}
	},
	watch: {
		authCode: {
			handler: function () {
				if (this.authCode.length > 0) {
					this.highlight = true
				} else {
					this.highlight = false
				}
			},
			deep: true
		}
	},
	mounted () {
		this.userEmail = this.$store.state.userInfo.email
	},
	methods: {
		sendCode () {
			let vm = this
			this.hasSendCode = true
			this.$apiCall("api.User.checkEmail", {
				email: this.userEmail
			}, r => {
				if (r.ErrorCode == '9999') {
					this.$message({
						message: "The Code was sent successfully",
						type: "success",
					});
					vm.time = 300;
					let interval = window.setInterval(function() {
						if ((vm.time--) <= 0) {
							vm.time = 0;
							this.hasSendCode = false
							window.clearInterval(interval); //停止
						}
					}, 1000);
				} else {
					this.$message({
						message: r.Message,
          	position: "center",
					});
				}
			});
		},
		verifyClick () {
			if (!this.authCode) {
				this.$message({
					message: "Verification Code must be filled in.",
					type: "error",
				})
				return ;
			}
			this.$apiCall("api.User.checkEmailToken", {
				email: this.userEmail,
				token: this.authCode
	    }, r => {
	        if (r.ErrorCode == '9999') {
							this.$message({
								message: "User Email verified successfully",
								type: "success",
							});
							this.$router.go(-1)
	        } else {
	          	this.$elementMessage(r.Message, "error");
	        }
	    }); 
		}
	}
}
</script>

<style lang="scss" scoped>
.verify {
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: #ccc;
	.box {
		width: 800px;
		padding: 60px 60px;
		height: 340px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items:flex-start;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%, -50%);
		img {
			object-fit: contain;
			width: 200px;
		}
		.title {
			font-size: 24px;
			margin: 0;
		}
		.desc {
			font-size: 16px;
			margin: 40px 0 20px 0;
		}
		.email {
			font-size: 16px;
		}
		.inputbox {
			border-bottom: 1px solid #ccc;
			input {
				border: 0;
				width: 90%;
				display: inline-block;
				box-shadow: initial;
			}
			span {
      	color: rgb(255, 156, 32);
				font-size: 16px;
				cursor: pointer;
			} 
		}
		.btn {
			width: 200px;
			margin-top: 20px;
			line-height: 1.5;
			background: rgb(204,204,204);
			color: #fff;
			border-radius: 5px;
		}
		.highlight {
			background: #FFAB73;
		}
	}
}
</style>