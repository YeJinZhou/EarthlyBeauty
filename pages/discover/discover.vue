<template>
	<view class="content">
		
		<WaterFull ref="waterFull" />
		
	
		
	</view>
</template>

<script>
	import WaterFull from '../../components/WaterFull.vue'
	export default {
		data() {
			return {
				PageCur: "discover",
				title: 'Hello',
				dataList: []
			}
		},
		components: {
			WaterFull
		},
		methods: {
			// 给waterfill赋值
			giveData(arr) {
				let that = this;
				that.$refs.waterFull.handleLoad(arr);
			},
			
			// 获取网络信息
			getNetWork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res);
					}
				});
			},
			// 获取设备信息
			getSystemInfo() {
				uni.getSystemInfo({
					success: function(res) {
						console.log(res);
					}
				});
			}
		},
		onLoad() {
			this.getNetWork();
			this.getSystemInfo();
		},
		mounted() {
			let that = this;
			let arr = [{
				cover: "/static/1.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 0,
				name: "随芝所乐",
				photo: "/static/logo.png",
				title: "吃货慎重！点进来你就无法自拔了！",
			}, {
				cover: "/static/7.png",
				id: "1084",
				isLiked: "0",
				likeCount: 520,
				name: "大吃货",
				photo: "/static/logo.png",
				title: "这间店真的太赞了！"
			}, {
				cover: "/static/2.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 650,
				name: "千层梦想家",
				photo: "/static/logo.png",
				title: "我爱千层千层爱我！"
			}, {
				cover: "/static/3.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 999,
				name: "无风",
				photo: "/static/logo.png",
				title: "西安美食大搜罗！",
			}, {
				cover: "/static/4.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 25,
				name: "123",
				photo: "/static/logo.png",
				title: "这种美食你绝对不能错过！",
			}, {
				cover: "/static/5.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 4,
				name: "快到碗里来",
				photo: "/static/logo.png",
				title: "啊，一口吃掉！",
			}];
			this.dataList = arr;
			that.giveData(arr);
		}
	}
</script>

<style>
</style>
