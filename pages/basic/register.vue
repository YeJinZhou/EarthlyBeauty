<template>
	
	<view class="content">
		<view class="logo">
			<img class="photo1"  style="width:100%;height: 100%;max-height: 200%;max-width: 200%; min-width:100% ;overflow:hidden; " src='../../static/img/logo2.png' ></image>
		</view>
		
			
			<view class="input-row">
				<text class="title">邮箱：</text>
				<input class="inputbox" type="text" focus clearable v-model="acount" placeholder="请输入邮箱"></input>
			</view>
			<view class="input-row">
				<text class="title">昵称：</text>
				<input class="inputbox" type="text" clearable v-model="name" placeholder="请输入昵称"></input>
			</view>
			<view class="input-row ">
				<text class="title">密码：</text>
				<input class="inputbox" type="password" displayable v-model="password" placeholder="请输入密码"></input>
			</view>
			<view class="input-row">
				<text class="title">确认：</text>
				<input class="inputbox" type="password" displayable v-model="password1" placeholder="请再次输入密码"></input>
			</view>
		
			<view class="input-row" >
		    	
					<text class="title">省市：</text>
		    		
		    		<view class="inputbox" style="width: 67%;">
		    			<view class="uni-list-cell">
		    				<view class="uni-list-cell-db">
		    					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
		    						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</view>
		    					</picker>
		    				</view>
		    			</view>
		    		</view>
		    	
		    </view>	
	
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>

</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
    import uniCombox from '@/components/uni-combox/uni-combox.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				acount: '',
				password: '',
				password1:'',
				name: '',
				index: 0,
				multiArray: [
					['北京市','广东省','山东省','江苏省','河南省','上海市','河北省', '浙江省','香港特别行政区','陕西省','湖南省','重庆市','福建省','天津市','云南省','四川省','广西壮族自治区','安徽省','海南省','江西省','湖北省','山西省','辽宁省','台湾省','黑龙江','内蒙古自治区','澳门特别行政区','贵州省','甘肃省','青海省','新疆维吾尔自治区','西藏区','吉林省','宁夏回族自治区'],
					['朝阳区','海淀区','通州区','房山区','丰台区','昌平区','大兴区','顺义区','西城区','延庆县','石景山区','宣武区','怀柔区','崇文区','密云县','东城区','平谷区','门头沟区'　]
				],
				multiIndex: [0, 0],
			}
		},
		
		methods: {
			async registerUser(){
							
							const res = await this.$myRequest({
								url: '/v1/api/loadpage/registerUser', //仅为示例，并非真实接口地址。
								data: {
									acount: this.acount,
									name:this.name,
									password:this.password,
									city:this.multiArray[1][this.multiIndex[1]]
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded', 
								},
								"method":"POST"
							})
							console.log(this.acount,this.name,this.password,this.multiArray[1][this.multiIndex[1]]);			
						},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] =['朝阳区','海淀区','通州区','房山区','丰台区','昌平区','大兴区','顺义区','西城区','延庆县','石景山区','宣武区','怀柔区','崇文区','密云县','东城区','平谷区','门头沟区'　]								
								break
							case 1:
								this.multiArray[1] = ['东莞市','广州市','中山市','深圳市','惠州市','江门市','珠海市','汕头市','佛山市','湛江市','河源市','肇庆市','清远市','潮州市', '韶关市','揭阳市','阳江市','梅州市','云浮市','茂名市','汕尾市']
								break
							case 2:
							    this.multiArray[1] = ['济南市','青岛市','临沂市','济宁市','菏泽市','烟台市','淄博市','泰安市','潍坊市','日照市','威海市','滨州市','东营市','聊城市','德州市','莱芜市','枣庄市']
							    break
							case 3:
							    this.multiArray[1] = ['苏州市','徐州市','盐城市','无锡市','南京市','南通市','连云港市','常州市','镇江市','扬州市','淮安市','泰州市','宿迁市']
							    break
							case 4:
								this.multiArray[1] = ['郑州市','南阳市','新乡市','安阳市','洛阳市','信阳市','平顶山市','周口市','商丘市','开封市','焦作市','驻马店市','濮阳市','三门峡市','漯河市','许昌市','鹤壁市','济源市']
								break
							case 5:
								this.multiArray[1] = ['松江区','宝山区','金山区','嘉定区','南汇区','青浦区','浦东新区','奉贤区','徐汇区','静安区','闵行区','黄浦区','杨浦区','虹口区','普陀区','闸北区','长宁区','崇明县','卢湾区']
								break
							case 6:
								this.multiArray[1] = ['石家庄市','唐山市','保定市','邯郸市','邢台市','河北区','沧州市','秦皇岛市','张家口市','衡水市','廊坊市','承德市']
								break
							case 7:
								this.multiArray[1] = ['温州市','宁波市','杭州市','台州市','嘉兴市','金华市','湖州市','绍兴市','舟山市','丽水市','衢州市']
								break
							case 8:
								this.multiArray[1] = ['中西区','湾仔区','东区','南区','油尖旺区','深水埗区','九龙城区','黄大仙区','观塘区','北区','大埔区','沙田区','西贡区','荃湾区','屯门区','元朗区','葵青区','离岛区']
								break
							case 9:
								this.multiArray[1] = ['西安市','咸阳市','宝鸡市','汉中市','渭南市','安康市','榆林市','商洛市','延安市','铜川市']
								break
							case 10:
								this.multiArray[1] = ['长沙市','邵阳市','常德市','衡阳市','株洲市','湘潭市','永州市','岳阳市','怀化市','郴州市','娄底市','益阳市','张家界市','湘西州']
								break
							case 11:
								this.multiArray[1] = ['江北区','渝北区','沙坪坝区','九龙坡区','万州区','永川市','南岸区','酉阳县','北碚区','涪陵区','秀山县','巴南区','渝中区','石柱县','忠县','合川市','大渡口区','开县','长寿区','荣昌县','云阳县','梁平县','潼南县','江津市','彭水县','綦江县','璧山县','黔江区','大足县','巫山县','巫溪县','垫江县','丰都县','武隆县','万盛区','铜梁县','南川市','奉节县','双桥区','城口县']
								break
							case 12:
								this.multiArray[1] = ['漳州市','厦门市','泉州市','福州市','莆田市','宁德市','三明市','南平市','龙岩市']
								break
							case 13:
								this.multiArray[1] = ['和平区','北辰区','河北区','河西区','西青区','津南区','东丽区','武清区','宝坻区','红桥区','大港区','汉沽区','静海县','塘沽区','宁河县','蓟县','南开区','河东区']
								break
							case 14:
								this.multiArray[1] = ['昆明市','红河州','大理州','文山州','德宏州','曲靖市','昭通市','楚雄州','保山市','玉溪市','丽江地区','临沧地区','思茅地区','西双版纳州','怒江州','迪庆州']
								break
							case 15:
								this.multiArray[1] = ['成都市','绵阳市','广元市','达州市','南充市','德阳市','广安市','阿坝州','巴中市','遂宁市','内江市','凉山州','攀枝花市','乐山市','自贡市','泸州市','雅安市','宜宾市','资阳市','眉山市','甘孜州']
								break
							case 16:
								this.multiArray[1] = ['贵港市','玉林市','北海市','南宁市','柳州市','桂林市','梧州市','钦州市','来宾市','河池市','百色市','贺州市','崇左市','防城港市']
								break
							case 17:
								this.multiArray[1] = ['芜湖市','合肥市','六安市','宿州市','阜阳市','安庆市','马鞍山市','蚌埠市','淮北市','淮南市','宣城市','黄山市','铜陵市','亳州市','池州市','巢湖市','滁州市']
								break
							case 18:
								this.multiArray[1] = ['三亚市','海口市','琼海市','文昌市','东方市','昌江县','陵水县','乐东县','保亭县','五指山市','澄迈县','万宁市','儋州市','临高县','白沙县','定安县','琼中县','屯昌县']
								break
							case 19:
								this.multiArray[1] = ['南昌市','赣州市','上饶市','吉安市','九江市','新余市','抚州市','宜春市','景德镇市','萍乡市','鹰潭市']
								break
							case 20:
								this.multiArray[1] = ['武汉市','宜昌市','襄樊市','荆州市','恩施州','黄冈市','孝感市','十堰市','咸宁市','黄石市','仙桃市','天门市','随州市','荆门市','潜江市','鄂州市','神农架林区']
								break
							case 21:
								this.multiArray[1] = ['太原市','大同市','运城市','长治市','晋城市','忻州市','临汾市','吕梁市','晋中市','阳泉市','朔州市']
								break
							case 22:
								this.multiArray[1] = ['大连市','沈阳市','丹东市','辽阳市','葫芦岛市','锦州市','朝阳市','营口市','鞍山市','抚顺市','阜新市','盘锦市','本溪市','铁岭市']
								break
							case 23:
								this.multiArray[1] = ['台北市','高雄市','台中市','新竹市','基隆市','台南市','嘉义市']
								break
							case 24:
								this.multiArray[1] = ['齐齐哈尔市','哈尔滨市','大庆市','佳木斯市','双鸭山市','牡丹江市','鸡西市','黑河市','绥化市','鹤岗市','伊春市','大兴安岭地区','七台河市']
								break
							case 25:
								this.multiArray[1] = ['赤峰市','包头市','通辽市','呼和浩特市','鄂尔多斯市','乌海市','呼伦贝尔市','兴安盟','巴彦淖尔盟','乌兰察布盟','锡林郭勒盟','阿拉善盟']
								break
							case 26:
								this.multiArray[1] = ['花地玛堂区','圣安多尼堂区','大堂区','望德堂区','风顺堂区','嘉模堂区','圣方济各堂区']
								break
							case 27:
								this.multiArray[1] = ['贵阳市','黔东南州','黔南州','遵义市','黔西南州','毕节地区','铜仁地区','安顺市','六盘水市']
								break
							case 28:
								this.multiArray[1] = ['兰州市','天水市','庆阳市','武威市','酒泉市','张掖市','陇南市','白银市','定西市','平凉市','嘉峪关市','临夏回族自治州','金昌市','甘南州']
								break
							case 29:
								this.multiArray[1] = ['西宁市','海西州','海东地区','海北州','果洛州','玉树州','黄南藏族自治州']
								break
							case 30:
								this.multiArray[1] = ['乌鲁木齐市','伊犁州','昌吉州','石河子市','哈密地区','阿克苏地区','巴音郭楞州','喀什地区','塔城地区','克拉玛依市','和田地区','阿勒泰州','吐鲁番地区','阿拉尔市','博尔塔拉州','五家渠市','克孜勒苏州','图木舒克市']
								break
							case 31:
								this.multiArray[1] = ['拉萨市','山南地区','林芝地区','日喀则地区','阿里地区','昌都地区','那曲地区']
								break
							case 32:
								this.multiArray[1] = ['吉林市','长春市','白山市','延边州','白城市','松原市','辽源市','通化市','四平市']
								break
							case 33:
								this.multiArray[1] = ['银川市','吴忠市','中卫市','石嘴山市','固原市']
								break
						}
						this.multiIndex.splice(1, 1, 0)
						break
				}
				this.$forceUpdate()
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.acount.length < 3 || !~this.acount.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法',
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.password1!=this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码输入不一致'
					});
					return;
				}
				if (this.name.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '昵称最短为3个字符'
					});
					return;
				}
             
                		console.log(this.acount);								
                		this.registerUser();
              
				const data = {
					account: this.acount,
					password: this.password,
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});
				
				uni.navigateTo({
					url: 'login',
				});
			}
			
		}
	}
</script>

<style>
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
		background-color: #e87e62;
	}
	
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* #endif */
	
	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}
	
	/* #endif */
.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #e87e62;
		padding: 10upx;
	}
    .logo{
		display: block;
		margin-left: auto;
		margin-right: auto;
			margin-top: 200upx;
		    width: 120upx;
			height: 120upx;
			margin-bottom: 50upx;
			border-radius: 10px;

	}
	.input-group {
		background-color: #FFFFFF;
		width: 80%;
		margin-left: 10%;
		position: relative;
		border-radius: 10px;    
	}

	
    .inputbox
		{
			background-color: #ffffff;
			border-radius: 10px;
			height: 70upx;
			font-size: 16px;
		}
		.input-row {
		width: 80%;
		margin-top: 15upx;
		margin-left: 10%;
		width: 80%;
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}
   .input-row1{
	width: 80%;
	margin-left: 2%;
	margin-top: 15upx;
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 18px;
	line-height: 40px;
	
   }
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #000000;
	}

	.btn-row {
	
		display: block;
		width: 70%;
		margin: 100upx auto;
		
	}

	button.primary {
		color: #000000;
		background-color: #ffffff;
		border-radius: 15px;
	}
</style>
