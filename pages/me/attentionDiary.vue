<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关注的食记</block>
		</cu-custom>
		<view class="solids-bottom padding-xs flex align-center">
			<view class="cu-avatar lg round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
			<view >
				<view class="text-lg margin-left">
					<text class="text-black text-bold">AttenName</text>
				</view>
				<view class="text-sm margin-left">
					<text>粉丝 </text> <text> numFans</text> 
					<text>|关注 </text> <text> numAtten</text> 
				</view>
			</view>	
		</view>
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">今天去了一家自助店</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">AttenName</view>
							<view class="text-gray text-sm flex justify-between">
								Publish date
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">今天去了一家自助店</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">AttenName</view>
							<view class="text-gray text-sm flex justify-between">
								Publish date
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">今天去了一家自助店</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">Username</view>
							<view class="text-gray text-sm flex justify-between">
								Publish date
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
