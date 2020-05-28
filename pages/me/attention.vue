<template>
	<view>
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">关注的人</block>
		</cu-custom>
		<uniSwipeAction>
			<uniSwipeActionItem v-for="(item,index) in lists" @click="swipeClick($event,index)" :key="item.index" :options="options"
			 @change="swipeChange">
				<view class="cu-list menu-avatar" style="width:100%">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" :data-target="'move-box-' + index" style="padding: 0 50upx">
						<view class="cu-avatar round lg solid-bottom" :style="[{backgroundImage:'url('+item.headportrait+')'}]"></view>

						<view class="content">
							<view class="text-black">{{item.name}}</view>
						</view>

						<view class="action">
							<view class="cu-tag round bg-red light ">已关注</view>
						</view>
					</view>
				</view>
			</uniSwipeActionItem>
		</uniSwipeAction>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapState
	} from 'vuex'
	
	export default {
		computed: mapState(['userName']),
		components: {
			uniSearchBar,
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				isCard: false,
				searchVal: '',
				ischeck: new Set(),

				options: [{
							text: '取消关注',
							style: {
								backgroundColor: 'rgb(255,58,49)'
							}
						}],

				lists: [{
						headportrait: '',
						name: ''
					},
				]
			};
		},
		onLoad() {
			this.initPage();
		},
		methods: {
			async initPage() {
				const res = await this.$myRequest({
					url: '/v1/api/mypage/getFocusList', //仅为示例，并非真实接口地址。
					data: {
						account: '472296000@qq.com',
					},
				})
				console.log(res.data);
				let plans = [];
				for (let i = 0; i < res.data.data.length; i++) {
					plans.push(res.data.data[i]);
				}
				this.lists = plans;
				console.log(this.lists);
			},
			async disFocus(account) {
				const res = await this.$myRequest({
					url: '/v1/api/mypage/disFocusPerson', //仅为示例，并非真实接口地址。
					data: {
						myAcount: "1",
						focusAccount: account
					},
				})
				console.log(res.data);
				console.log(account);
				
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},

			change(e) {
				this.isOpened = e
			},
			swipeChange(e) {
			},
			swipeClick(e, index) {
				let {
					content
				} = e
				if (content.text === '取消关注') {
					uni.showModal({
						title: '提示',
						content: '是否取消关注',
						success: (res) => {
							if (res.confirm) {
								console.log(this.lists);
								let account = this.lists[index].acount;
								this.lists.splice(index, 1)
								this.disFocus(account);
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			CheckboxChange(index) {
				if (this.ischeck.has(index)) {
					this.ischeck.delete(index);
				} else {
					this.ischeck.add(index);
				}
				console.log(index);
				console.log(this.ischeck);
				this.$forceUpdate();
				console.log(this.ischeck.has(index));
			},
			getBoxStatus(index) {
				console.log("Test" + index);
				return this.ischeck.has(index) ? 'checked' : '';
			},
			onBackPress() {
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				// #endif
			},
		}
	}
</script>

<style>

</style>
