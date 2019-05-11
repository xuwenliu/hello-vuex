<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left">
				<mu-icon value="menu"></mu-icon>
			</mu-button>Vuex体验店
			<mu-button @click.native="goEdit" flat slot="right">
				<mu-icon value="add"></mu-icon>
			</mu-button>
		</mu-appbar>

		<mu-list>
			<mu-list-item
				button
				:ripple="false"
				v-for="item,index in newList"
				v-if="newList && newList.length>0"
			>
				<mu-list-item-action>
					<mu-icon :value="item.brandId === 1? 'phone_iphone':'phone_android'"></mu-icon>
				</mu-list-item-action>
				<mu-list-item-title>{{item.brandName}}-{{item.typeName}}-{{item.statusName}}</mu-list-item-title>
				<mu-list-item-action class="action">
					<mu-icon @click="goEdit(item)" color="blue" value="edit"></mu-icon>
					<mu-icon @click="deletePhone(item)" color="pink" value="delete"></mu-icon>
				</mu-list-item-action>
			</mu-list-item>
		</mu-list>
		<div v-show="!newList || newList.length < 1" class="no-data">
			<mu-icon size="80" color="blue400" value="panorama"></mu-icon>
			<p>暂无数据</p>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions, mapGetters } from "vuex";
	import { GET_PHONE_LIST,DELETE_PHONE } from "@/vuex/mutation-types";
	export default {
		name: "phoneList",
		computed: {
			...mapState("phone", {
				list: state => state.list
			}),
			...mapGetters("phone", {
				newList: "newList"
			})
		
		},
		mounted() {
			this.getList();
		},
		methods: {

            //去添加/修改页面
			goEdit(item) {
                if(item){
				    this.$router.push({ name: "phone",query:{id:item._id }});
                }else {
                    this.$router.push({ name: "phone"});
                }
            },
            
            //获取手机列表
			...mapActions("phone", {
				getList: GET_PHONE_LIST
            }),

            //删除
            async deletePhone(item){
                await this.$confirm('确定删除该手机吗 ?', '提示',{
                    /*
                    who true = 确定 false = 取消
                    */
                    beforeClose:async (who,instance,close)=>{
                        if(who){ //确定
                            let result = await this.$store.dispatch(`phone/${DELETE_PHONE}`, {
                                id:item._id
                            });
                            if(result.data.success){
                                this.$toast.success('删除成功!');
                                close(who);
                                this.getList();
                            }else {
                                this.$toast.error(result.data.msg)
                            }
                        }else {
                            close(who);
                        }
                
                    },
                });
                
            }
		}
	};
</script>
<style lang="less" scoped>
	.action {
		flex-direction: row;
	}
	.no-data {
		text-align: center;
		padding-top: 80px;
		p {
			padding: 0;
			margin: 0;
			color: #42a5f5;
		}
	}
</style>

