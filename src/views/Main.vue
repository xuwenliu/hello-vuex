<template>
	<div>
		<div class="main">
			<keep-alive>
				<router-view/>
			</keep-alive>
		</div>
		<mu-tabs
			class="footer"
            :value.sync="footerIndex"
            @change="tabChange"
			full-width
			inverse
			color="secondary"
			indicator-color="transparent"
			text-color="#666"
		>
			<mu-tab>
				<mu-icon value="home"></mu-icon>首页
			</mu-tab>
			<mu-tab>
				<mu-icon value="list"></mu-icon>列表
			</mu-tab>
			<mu-tab>
				<mu-icon value="shopping_cart"></mu-icon>购物车
			</mu-tab>
			<mu-tab>
				<mu-icon value="account_circle"></mu-icon>个人中心
			</mu-tab>
		</mu-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                footerIndex:0,
                routerList:[
                    {name:'index',fullPath:'/main/index'},
                    {name:'phoneList',fullPath:'/main/phone/list'},
                    {name:'cart',fullPath:'/main/cart'},
                    {name:'center',fullPath:'/main/center'},
                ]
			};
        },
        created(){
            this.routerList.map((item,index) => {
                if(location.href.indexOf(item.fullPath) >=0 ){
                    this.footerIndex = index;
                }
            })
        },
		methods: {
			tabChange(){
                this.$router.push({name:this.routerList[this.footerIndex].name});
            }
		}
	};
</script>

<style scoped lang="less">
.main{
    padding-bottom: 50px;
}

 .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e5e5e5;
        height:50px;
        /deep/.mu-tab-wrapper{
            padding: 0;
            .mu-icon{
                margin-bottom: 0;
            }
        }
    }
</style>