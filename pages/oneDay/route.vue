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
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item1" style="height: 67px; background-color: #FFFFFF; display: flex; align-items: center; flex-direction: row; justify-content: space-around;">
							<view class="cu-avatar round lg" style="margin:10px;" :style="[{ backgroundImage:'url(' + planitems[0].foodurl + ')' }]"></view>
							<view>
								<view class="text-grey">早餐：{{planitems[0].foodname}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{planitems[0].shopname}}</view>
							</view>
							<view class="acti">
								<view class="cu-tag round bg-red sm" >{{planitems[0].shopscore}}分</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">

					<view class="con bg-white padding">
						<view class="text-grey">
							<text class="cuIcon-camerafill text-red margin-right-xs"></text>途经：{{planitems[0].sceneryname}}</view>

						<image style="height:140px;width:200px;" :src="planitems[0].sceneryurl"></image>
					</view>

				</view>

			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item1" style="height: 67px; background-color: #FFFFFF; display: flex; align-items: center; flex-direction: row; justify-content: space-around;">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + planitems[1].foodurl + ')' }]"></view>
							<view>
								<view class="text-grey">中餐：{{planitems[1].foodname}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{planitems[1].shopname}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-red sm">{{planitems[1].shopscore}}分</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">

					<view class="con bg-white padding">
						<view class="text-grey">
							<text class="cuIcon-camerafill text-red margin-right-xs"></text>途经：{{planitems[1].sceneryname}}</view>

						<image style="height:140px;width:200px;" :src="planitems[1].sceneryurl"></image>
					</view>

				</view>

			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">
					<view class="cu-list menu-avatar radius">
						<view class="cu-item1" style="height: 67px; background-color: #FFFFFF; display: flex; align-items: center; flex-direction: row; justify-content: space-around;">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + planitems[2].foodurl + ')' }]"></view>
							<view>
								<view class="text-grey">晚餐：{{planitems[2].foodname}}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-red"></text>{{planitems[2].shopname}}</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-red sm">{{planitems[2].shopscore}}分</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="cu-item text-red">
				<view class="bg-red shadow-blur con" style="border-radius: 7px;">

					<view class="con bg-white padding">
						<view class="text-grey">
							<text class="cuIcon-camerafill text-red margin-right-xs"></text>途经：{{planitems[2].sceneryname}}</view>

						<image style="height:140px;width:200px;" :src="planitems[2].sceneryurl"></image>
					</view>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			planitems: {
				type: Array,
				default () {
					return [{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						},
						{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						},
						{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						}
					];
				}
			}
		},
		data() {
			return {};
		},
		methods: {
		}
	}
</script>

<style>
	.cu-timeline>.cu-item>.con {
		padding: 0px !important;
	}
	.cont{
		padding-right: 45px;
	}
</style>
