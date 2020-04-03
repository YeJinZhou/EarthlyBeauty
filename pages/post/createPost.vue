<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="backText">返回</block><block slot="content">发表食记</block></cu-custom>
		<my-issue key="1" />
		<robby-tags v-model="tagList" @add="addTag" @delete="delTag" @click="clickTag" :enable-del="enableDel" :enable-add="enableAdd"></robby-tags>
		
	
		
		
	</view>
</template>

<script>
  import myIssue from '@/components/myIssue.vue'
  import robbyTags from '@/components/robby-tags/robby-tags.vue'
	export default {
		components:{myIssue},
		data() {
			return {
				PageCur:"post",
				title: 'Hello',
				enableDel: true,
				enableAdd: true,
				colorType: 'primary',
				tagList: []
			}
		},
		onLoad() {

		},
		methods:{
		    clickTag: function(e){
		        console.log(e)
		    },
		    delTag: function(e){
		        console.log(e)
		    },
		    addTag: function(e){
		        console.log(e)
		    }
		}
	}
</script>

<style>
	.content{
		height: 100%;
	}
</style>