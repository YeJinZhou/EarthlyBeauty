<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">关注的人</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in lists" :key="index"
			 :data-target="'move-box-' + index">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+item.imageURL+')'}]"></view>

				<view class="content">
					<view class="text-black">{{item.name}}</view>
				</view>     
				
				<view class="action">
					<view class="cu-tag round bg-red light">已关注</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				lists: [
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'张若昀'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'张的的'
					},
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'肖正国'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'张显宗'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'鹿飞'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'陈山'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'范闲'
					}, 
					{
						imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						name:'zyr'
					}]
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			
		}
	}
</script>

<style>

</style>
