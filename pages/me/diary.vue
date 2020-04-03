<template>
	<view >
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的食记</block>
		</cu-custom>
		<!-- 用户信息 -->
		<view class="solids-bottom padding flex align-center">
			<view class="cu-avatar lg round" :style="[{ backgroundImage:'url(' + headPortrait + ')' }]"></view>
			<view >
				<view class="text-lg margin-left">
					<text class="text-black text-bold">{{UserName}}</text>
				</view>
				<view class="text-sm margin-left">
					<text>粉丝{{numFan}}</text> 
					<text>|关注{{numAtten}}</text> 
				</view>
			</view>	
		</view>
		<view v-for="(item,index) in diaryList" :key="index" style="margin:3%;border-radius: 10px;">
			<navigator url="/pages/discover/diary">
				<view  class="cu-card case" :class="isCard?'no-card':''" style="width:100%;">
					<view class="cu-item shadow">
						<view class="image">
							<image :src= "item.background" 
							mode="scaleToFill"></image>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.introduction}}</text></view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.headPortrait + ')' }]" ></view>
								<view class="content flex-sub">
									<view class="text-grey">{{item.name}}</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.date}}
										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.views}}
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.likes}}
											<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</navigator>	
		</view>
	</view>	
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		data() {
			return {
				UserName:"叶小洲",
				headPortrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=865100368,2934340936&fm=26&gp=0.jpg',
				numAtten: 80,
				numFan: 54,
				diaryList : [
					{
						id: 0,
						background: "/static/food1.png",
						introduction : "今天去了一家自助店",
						headPortrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=865100368,2934340936&fm=26&gp=0.jpg',
						name : "叶小洲",
						date : "2020年3月31日",
						views : 13, 
						likes : 2,
						comment :3,
					},
					{
						id: 1,
						background: "/static/food5.png",
						introduction : "下馆子喽！",
						headPortrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=865100368,2934340936&fm=26&gp=0.jpg',
						name : "Username",
						date : "2020年3月18日",
						views : 111, 
						likes : 23,
						comment :30,
					},
					{
						id: 2,
						background: "/static/shop05.png",
						introduction : "第一次打卡，有点紧张...",
						headPortrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=865100368,2934340936&fm=26&gp=0.jpg',
						name : "Username",
						date : "2020年2月1日",
						views : 1, 
						likes : 2,
						comment :3,
					}
				]
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
