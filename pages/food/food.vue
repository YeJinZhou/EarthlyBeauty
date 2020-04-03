<template>
	<view style="background-color: #E5E5E5;">
		<cu-custom style="background-color: #fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view style="font-size: 20px;font-weight: bold;">{{title}}</view>
			</block>
		</cu-custom>
		
		<view class="content-column" style="background-color: #fff;">
			<view class="uni-flex uni-row content-row" style="background-color: #fff;width: 300px;height: 120px;">
				<view class="solids-right" style="width: 126px;">
					<image class="picture" style="width: 100px;height: 100px;border-radius: 50%;" src="/static/food5.png"></image>
				</view>
				
				<view class="uni-flex" style="height: 100px;width: 200px;">
					<view class="flex justify-end">查看西安其他美食</view>
					<view class="uni-flex uni-row content-row" style="flex-direction: row;height: 80px;">
						<view style="width: 10px;"></view>		
						<navigator url="/pages/food/food" hover-class="navigator-hover">
							<view>
								<view class="food">
									<image class="picture" src="/static/food1.png" style="border-radius: 50%;"></image>
								</view>
								<view class="food">臊子面</view>
							</view>
						</navigator>
						
						<view style="width: 10px;"></view>
						<navigator url="/pages/food/food" hover-class="navigator-hover">
							<view>
								<view class="food">
									<image class="picture" src="/static/food3.png" style="border-radius: 50%;"></image>
								</view>
								<view class="food">排骨藕汤</view>					
							</view>
						</navigator>
						
						<view style="width: 10px;"></view>
						<navigator url="/pages/food/food" hover-class="navigator-hover">
							<view>
								<view class="food">
									<image class="picture" src="/static/food4.png" style="border-radius: 50%;"></image>
								</view>
								<view class="food">牛肉面</view>
							</view>
						</navigator>
					</view>		
				</view>
			</view>
		</view>
		
		<view style="font-size: 20px;font-weight: bold;margin-left: 25px;">热干面</view>
		
		<view class="content-column uni-flex uni-column">	
			<view class="text" style="width: 320px;">			
				<template v-if="showText">			
					<view style="font-size: 15px;color:#000;">  {{description}}
						<text v-if="description !== null && description.length > 59" @click="toggleDescription" style="color: #f00;">收起</text>
					</view>
				</template>
				<template v-else>
					<view style="font-size: 15px;color:#000;">  {{description.substr(0, 56)}}
						<text v-if="description !== null && description.length > 59" @click="toggleDescription" style="color: #f00;">
							<text style="color: #000;">...</text>更多						
						</text>
					</view>
				</template>
			</view>
		</view>
		
		<view>
		    <scroll-view scroll-y="true" style="height: 460px;" >
		        <view class="content-column" style="height: 100px;">
					<navigator url="place" hover-class="navigator-hover">
						<view class="uni-flex uni-row content-row" style="background-color: #f4f4f4;width: 320px;height: 100px;">
							<image class="picture" style="width: 100px;height: 100px;" src="/static/shop01.png"></image>
							<view class="uni-flex uni-column content-column" style="height: 100px;width: 200px;">
								<view style="font-size: 15px;font-weight: bold"><text>蔡明纬（汉街店）</text></view>
								<view>评分<text>4.8</text><text> 22</text>/人</view>		
								<view><text>楚河汉街</text><text> 小吃</text><text> 1.2</text>km</view>
								<view><text>武汉热干面发明者</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
				
				<view class="content-column margin-top" style="height: 100px;">
					<navigator url="place" hover-class="navigator-hover">
						<view class="uni-flex uni-row content-row " style="background-color: #f4f4f4;width: 320px;height: 100px;">
							<image class="picture" style="width: 100px;height: 100px;" src="/static/shop02.png"></image>
							<view class="uni-flex uni-column content-column" style="height: 100px;width: 200px;">
								<view style="font-size: 15px;font-weight: bold"><text>蔡林记（武汉站1店）</text></view>
								<view>评分<text>4.6</text><text> 25</text>/人</view>		
								<view><text>武汉火车站</text><text> 小吃</text><text> 1.2</text>km</view>
								<view><text>武汉热干面已经成为了城市地标</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
				
				<view class="content-column margin-top" style="height: 100px;">
					<navigator url="place" hover-class="navigator-hover">
						<view class="uni-flex uni-row content-row " style="background-color: #f4f4f4;width: 320px;height: 100px;">
							<image class="picture" style="width: 100px;height: 100px;" src="/static/shop03.png"></image>
							<view class="uni-flex uni-column content-column" style="height: 100px;width: 200px;">
								<view style="font-size: 15px;font-weight: bold"><text>回坊老马家牛羊肉泡馍</text></view>
								<view>评分<text>4.6</text><text> 27</text>/人</view>		
								<view><text>城市运动公园</text><text> 泡馍</text><text> 1.2</text>km</view>
								<view><text>泡馍、涮菜、烤肉应有尽有</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
				
				<view class="content-column margin-top" style="height: 100px;">
					<navigator url="place" hover-class="navigator-hover">
						<view class="uni-flex uni-row content-row " style="background-color: #f4f4f4;width: 320px;height: 100px;">
							<image class="picture" style="width: 100px;height: 100px;" src="../../../static/shop04.png"></image>
							<view class="uni-flex uni-column content-column" style="height: 100px;width: 200px;">
								<view style="font-size: 15px;font-weight: bold"><text>罗氏热干牛肉面馆（玫瑰街店）</text></view>
								<view>评分<text>4.5</text><text> 18</text>/人</view>		
								<view><text>王家湾</text><text> 热干面</text><text> 1.2</text>km</view>
								<view><text>回头客多</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
				
				<view class="content-column margin-top" style="height: 100px;">
					<navigator url="place" hover-class="navigator-hover">
						<view class="uni-flex uni-row content-row " style="background-color: #f4f4f4;width: 320px;height: 100px;">
							<image class="picture" style="width: 100px;height: 100px;" src="../../../static/shop05.png"></image>
							<view class="uni-flex uni-column content-column" style="height: 100px;width: 200px;">
								<view style="font-size: 15px;font-weight: bold"><text>清蒸鼎盛鑫饭店</text></view>
								<view>评分<text>4.8</text><text> 30</text>/人</view>		
								<view><text>劳动南路</text><text> 特色菜</text><text> 1.2</text>km</view>
								<view><text>优质羊肉泡馍馆</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
		    </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showText: false,
				title:'西安美食',
				description: '热干面是中国十大面条之一。是湖北省武汉最出名的小吃之一，有多重做法。通常以油、盐、芝麻酱、色拉油、香油、细香葱、大蒜子、萝卜丁等构成。'	
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
	.text{
		padding: 10upx;
		colof: #999;
		background: #E5E5E5;
		max-height: 130px;
		overflow: scroll;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 320px;	
	}
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: auto;
	}
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.picture {
		height: 50px;
		width: 50px;
		margin-top: 0px;
		margin-left: 0px;
		margin-right: auto;
		margin-bottom: 0px;
	}
	.food{
		justify-content: center;
		display: flex;
	}
</style>
