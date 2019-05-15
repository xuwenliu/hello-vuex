<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button @click="open=true" icon slot="left">
				<mu-icon  value="menu"></mu-icon>
			</mu-button>
			<mu-button flat slot="right">
				
			</mu-button>
		</mu-appbar>

		<mu-drawer :open.sync="open">
			<mu-list>
				<mu-list-item button>
					<mu-list-item-title>个人中心</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button >
					<mu-list-item-title>主题切换
                        <mu-switch @change="themeChange" v-model="themeBool"></mu-switch>   
                    </mu-list-item-title>
				</mu-list-item>
				<mu-list-item button @click="logout">
					<mu-list-item-title>退出登录</mu-list-item-title>
				</mu-list-item>
				<mu-list-item @click="open = false" button>
					<mu-list-item-title>关闭</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
		<div>
			<mu-carousel hide-controls>
				<mu-carousel-item v-for="item,index in imgs" :key="index">
					<img :src="item">
				</mu-carousel-item>
			</mu-carousel>
		</div>
	</div>
</template>
<script>
    import theme from "muse-ui/lib/theme";
    import { USER_LOGOUT } from '@/vuex/mutation-types';
    
	export default {
		data() {
			return {
				themeBool: false,
				imgs: [
					"https://dsfs.oppo.com/archives/201903/201903261103295c9a3f055d6a4.jpg",
					"https://dsfs.oppo.com/archives/201904/201904250304345cc16706d1c29.jpg",
					"https://dsfs.oppo.com/archives/201904/201904100304015cad9c69e00ec.jpg",
					"https://dsfs.oppo.com/archives/201904/201904110704035caf1e6fbf9d0.jpg"
                ],
                open:false,
                docked: false,
			};
		},
		mounted() {
			this.themeBool = localStorage.getItem("themeBool") == 1;
			this.themeChange();
		},
		methods: {
			themeChange() {
				if (this.themeBool) {
					theme.use("dark");
				} else {
					theme.use("light");
				}
				localStorage.setItem("themeBool", this.themeBool ? 1 : 2);
            },
            async logout(){
                let result = await this.$store.dispatch(`user/${USER_LOGOUT}`);
                if(result.data.success){
                        localStorage.removeItem('token');
                        this.$router.push({name:'user'});
                        this.$toast.success(`退出成功!`);
                    }else {
                        this.$toast.error(result.data.msg);
                    }
            }
		}
	};
</script>
<style scope lang="less">
	.mu-carousel {
		height: 130px;
		.mu-carousel-item > img {
			width: 100%;
		}
	}
</style>

