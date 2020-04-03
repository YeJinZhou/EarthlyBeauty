<template>
	<view class="page">
		<view style="height:40px;"></view>
		<view class="uni-flex" style="height: 100px;color: #fff;">
			<view class="center">精选特色菜品</view>
			<view class="flex justify-end" style="font-size: 12px;">
				<navigator url="../home/city">前往我的城市></navigator>
			</view>	
		</view>
		
		<view class="cu-bar search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
		</view>
		
		<view>
		    <scroll-view scroll-y="true" style="height: 600px">
		        <view class="content uni-flex">
					<navigator url="../food/food" hover-class="navigator-hover">
						<image class="picture" src="/static/food4.png"></image>
					</navigator>
					<view style="font-size: 18px;font-weight: bold">{{foodname1}}</view>
					<view class="text" style="width: 320px;">
						<template v-if="showText">
							<view style="font-size: 15px;color:#000;">{{description}}
								<text v-if="description !== null && description.length > 60" @click="toggleDescription" style="color: #f00;">收起</text>
							</view>
						</template>
						<template v-else>
							<view style="font-size: 15px;color:#000;">{{description.substr(0, 57)}}
								<text v-if="description !== null && description.length > 60" @click="toggleDescription" style="color: #f00;">...更多</text>
							</view>
						</template>
					</view>
				</view>
				
				<view class="content" >
					<navigator url="../food/food" hover-class="navigator-hover">
						<image class="picture" src="/static/food3.png"></image>
					</navigator>
					<view style="font-size: 18px;font-weight: bold">{{foodname2}}</view>
					<view class="text" style="width: 320px;">
						<template v-if="showText">
							<view style="font-size: 15px;color:#000;">{{description}}
								<text v-if="description !== null && description.length > 45" @click="toggleDescription" style="color: #f00;">收起</text>
							</view>
						</template>
						<template v-else>
							<view style="font-size: 15px;color:#000;">{{description.substr(0, 42)}}
								<text v-if="description !== null && description.length > 45" @click="toggleDescription" style="color: #f00;">...更多</text>
							</view>
						</template>
					</view>
				</view>
				
				<view class="content" >
					<navigator url="../food/food" hover-class="navigator-hover">
						<image class="picture" src="/static/food1.png"></image>
					</navigator>
					<view style="font-size: 18px;font-weight: bold">{{foodname3}}</view>
					<view class="text" style="width: 320px;">
						<template v-if="showText">
							<view style="font-size: 15px;color:#000;">{{description}}
								<text v-if="description !== null && description.length > 45" @click="toggleDescription" style="color: #f00;">收起</text>
							</view>
						</template>
						<template v-else>
							<view style="font-size: 15px;color:#000;">{{description.substr(0, 42)}}
								<text v-if="description !== null && description.length > 45" @click="toggleDescription" style="color: #f00;">...更多</text>
							</view>
						</template>
					</view>
				</view>	
		    </scroll-view>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		name:'home',
		data() {
			return {
				PageCur:"home",
				foodname1: '武汉.热干面',
				foodname2: '山东.排骨藕汤',
				foodname3: '河北.酸辣土豆',
				CustomBar: this.CustomBar,
				showText: false,
				description:'热干面是中国十大面条之一。是湖北省武汉最出名的小吃之一，有多重做法。通常以油、盐、芝麻酱、色拉油、香油、细香葱、大蒜子、萝卜丁等构成。'
			}
		},
		methods: {
			toggleDescription (num) {
				this.showText = !this.showText
			}
		}
	}
</script>

<style>
	.center{
		display: flex;
		font-size: 20px;
		justify-content: center;
		font-family: 'FZXiaoBiaoSong-B05S';
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.picture {
		height: 200px;
		width: 320px;
		margin-top: 0px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0px;
		border-radius: 10px;
	}
	.text{
		padding: 10upx;
		colof: #999;
		max-height: 130px;
		overflow: scroll;
	}
	.text-center {
		display: flex;
		justify-content: center;
	}
	.page{
		background: linear-gradient(#f00,#fff);
	}
</style>
