<template>
	<view >
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的食记</block>
		</cu-custom>
		<!-- 用户信息开始 -->
		<view class="solids-bottom padding flex align-center">
			<view class="cu-avatar lg round" :style="[{ backgroundImage:'url(' + user.headportrait + ')' }]"></view>
			<view >
				<view class="text-lg margin-left">
					<text class="text-black text-bold">{{user.name}}</text>
				</view>
				<view class="text-sm margin-left">
					<text>粉丝{{user.fansNumber}}</text> 
					<text>|关注{{user.focusNumber}}</text> 
				</view>
			</view>	
		</view>
		<!-- 用户信息结束 -->
		<view v-for="(item,index) in user.resultFoodRecords" :key="index" style="border-radius: 10px;">
			<navigator url="/pages/discover/diary">
				<view  class="cu-card case" style="width:100%;">
					<view class="cu-item shadow">
						<view class="image">
							<image :src= "item.pictures[0]" 
							mode="scaleToFill"></image>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + user.headportrait + ')' }]" ></view>
								<view class="content flex-sub">
									<view class="text-grey">{{user.name}}</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.time}}
										<view class="text-gray text-sm">
											<!-- <text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.viewnumber}} -->
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praisenumber}}
											<!-- <text class="cuIcon-messagefill margin-lr-xs"></text> {{item.commentnumber}} -->
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
				userid: '472296000@qq.com',
				user: [],
				diaryList : []				
			}
		},
		methods: {
			async initPage(){
				// 获取用户信息
				const user = await this.$myRequest({
					url: '/v1/api/mypage/getPersonInfo?account',
					data: {
						account: this.userid
						}
				})
				// 给页面的数据赋值
				this.user = user.data.data;
			}
		},
		onLoad(e) {
			console.log('page Diary loaded...');
			console.log('e = ');
			console.log(e);
			this.userid = e.id || '472296000@qq.com';
			this.initPage();
			console.log(this.user);
		}
	}
</script>

<style>

</style>
