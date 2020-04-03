<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-red"></text>
				<text>定制计划</text>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">一日美食计划路线</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur content" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + list[0].imageURL + ')' }]"></view>
							<view class="content">
								<view class="text-grey">早餐：{{list[0].food}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{list[0].place}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-red sm">{{list[0].distance}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur content" style="border-radius: 7px;">

					<view class="content bg-white padding">
						<view class="text-grey">
							<text class="cuIcon-camerafill text-red margin-right-xs"></text>途经：{{item[0].attraction}}</view>
						<view class="text-grey">
							<text class="cuIcon-footprint text-red margin-right-xs"></text>步行:{{item[0].walk}}

							<view class="cu-tag round bg-red sm margin-left-xs">{{item[0].distance}}</view>
						</view>
						<image style="height:140px;width:200px;" :src="item[0].imageURL"></image>
					</view>

				</view>

			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur content" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + list[1].imageURL + ')' }]"></view>
							<view class="content">
								<view class="text-grey">中餐：{{list[1].food}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{list[1].place}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-red sm">{{list[1].distance}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur content" style="border-radius: 7px;">

					<view class="content bg-white padding">
						<view class="text-grey">
							<text class="cuIcon-camerafill text-red margin-right-xs"></text>途经：{{item[1].attraction}}</view>
						<view class="text-grey">
							<text class="cuIcon-footprint text-red margin-right-xs"></text>步行:{{item[1].walk}}

							<view class="cu-tag round bg-red sm margin-left-xs">{{item[1].distance}}</view>
						</view>
						<image style="height:140px;width:200px;" :src="item[1].imageURL"></image>
					</view>

				</view>

			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur content" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + list[2].imageURL + ')' }]"></view>
							<view class="content">
								<view class="text-grey">晚餐：{{list[2].food}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{list[2].place}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-red sm">{{list[2].distance}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					food: '馒头',
					place: '柯桥',
					distance: '1.1km',
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					food: '馒头',
					place: '柯桥',
					distance: '1.1km',
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					food: '馒头',
					place: '柯桥',
					distance: '1.1km',
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}],
				item: [{
					attraction: '西安城墙',
					walk: '10分钟',
					distance:'1.1km',
					imageURL: 'http://img4.imgtn.bdimg.com/it/u=190739518,2454535920&fm=11&gp=0.jpg'
				}, {
					attraction: '西安城墙',
					walk: '10分钟',
					distance:'1.1km',
					imageURL: 'http://img4.imgtn.bdimg.com/it/u=190739518,2454535920&fm=11&gp=0.jpg'
				}]
			};
		}
	}
</script>

<style>
	.cu-timeline>.cu-item>.content {
		padding: 0px !important;
	}
</style>
