<template>
	<view>
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">修改个人资料</block>
		</cu-custom>
		
		<view class="margin-top">
			<view class="content-column" style="background-color: #ddd;">
				<view@tap="upload" style="background-color: #fff;border-radius: 50%;">
					<image :src="img" mode="aspectFill" style="height: 200upx;width: 200upx;border-radius: 50%;" />
				</view>
			</view>
			
			<view class="cu-form-group margin-top content-row">
				<view class="content-row" style="font-size: 30upx;font-weight: bold;">
					姓名:<input style="width: 330upx;" type="text" v-model="people.name" value="" :placeholder=personInfo.name />
				</view>
			</view>
			
			<view class="cu-form-group margin-top content-row">
				<view class="content-row" style="font-size: 30upx;font-weight: bold;">
					性别:<input style="width: 330upx;" type="text" value="" :placeholder=personInfo.sex v-model="people.sex"/>
				</view>	
			</view>
			
			<view class="cu-form-group margin-top content-row">
				<view class="content-row" style="font-size: 30upx;font-weight: bold;">
					年龄:<input style="width: 330upx;" type="number" value="" :placeholder=personInfo.age v-model="people.age"/>
				</view>	
			</view>
			
			<button class="margin-top btn" @tap="confirm">提交</button>
		</view>
	</view>	
</template>

<script>
	let img;
	var person;
	export default {
		data() {
			return {	
				img:img,
				personInfo: [],
				people:{
					name:'',
					sex:'',
					age:'',
				}
			}
		},
		onLoad(e) {
			person = e;
			console.log(person.id)
			this.initPage()
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/mypage/getPersonInfo',
					data: {
						account: person.id,
					}
				})
				this.personInfo =res.data.data;
				this.img = this.personInfo.headportrait;
			},
			
			confirm() {
				console.log(person.id)
				// let data = this.people;
				// console.log(JSON.stringify(data));
				//console.log(this.img)
				//console.log(data.name);	
			    this.changeUser();
			},
		
			async changeUser(){
				console.log(person.id)
				// const res = await this.$myRequest({
				// 	url: '/v1/api/mypage/updatePersonalInformation', 
				// 	data: {
				// 		acount: '982157286@qq.com',
				// 		//name:this.people.name,
				// 		sex:this.people.sex,
				// 		age:this.people.age,
				// 	},
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded', 
				// 	},
				// 	"method":"POST"
				// })
				// console.log(1111)
				// // console.log(this.name);	
				// // console.log(this.data);			
				// console.log(this.people.name);		
				//console.log(this.people.sex)
				uni.uploadFile({
				    url: 'http://10.21.234.73:8080/v1/api/mypage/updatePersonalInformation', //仅为示例，非真实的接口地址
				    filePath: this.img,
				    name: 'file',
				    formData: {
				        acount: person.id,
						name: this.people.name,
						sex: this.people.sex,
						age: this.people.age,
				    },
					success: function () {
					    console.log('头像上传成功');
					},
				});
			
			},
				
			upload(){
				let that = this;
				uni.chooseImage({
				    success: function (chooseImageRes) {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						that.img = chooseImageRes.tempFilePaths[0];
				       /* uni.uploadFile({
				            url: 'http://10.21.234.73:8080/v1/api/mypage/updatePersonalInformation', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                acount: '982157286@qq.com',
								sex: '男',
								age: 1,
				            },
							success: function () {
							    console.log('头像上传成功');
							},
				        }); */
				    }
				});
				console.log(person.id)
			},
		}
	}
</script>

<style>
	.btn{
		width: 400upx;
		color: #ffffff;
		background-color: #ea0b3f;
		border-radius: 15px;
	}
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
