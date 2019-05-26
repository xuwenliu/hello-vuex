<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button @click="open=true" icon slot="left">
				<mu-icon value="menu"></mu-icon>
			</mu-button>
			<mu-text-field class="search-input" action-icon="search" underline-color="#fff" v-model="searchKeyword"></mu-text-field>
		</mu-appbar>

		<mu-drawer :open.sync="open">
			<mu-list>
				<mu-list-item button>
					<mu-list-item-title>个人中心</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>
						主题切换
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
				<mu-carousel-item v-for="item,index in slides" :key="index">
					<img :src="item.image">
				</mu-carousel-item>
			</mu-carousel>
		</div>
	</div>
</template>
<script>
	import theme from "muse-ui/lib/theme";
	import { USER_LOGOUT } from "@/vuex/mutation-types";

	export default {
		data() {
			return {
				themeBool: false,
				// imgs: [
				// 	"https://dsfs.oppo.com/archives/201903/201903261103295c9a3f055d6a4.jpg",
				// 	"https://dsfs.oppo.com/archives/201904/201904250304345cc16706d1c29.jpg",
				// 	"https://dsfs.oppo.com/archives/201904/201904100304015cad9c69e00ec.jpg",
				// 	"https://dsfs.oppo.com/archives/201904/201904110704035caf1e6fbf9d0.jpg"
				// ],
				slides: [
					{
						image:
							"http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg",
						goodsId: "b1195296679f482aa7d54d95ac2b4a94"
					},
					{
						image:
							"http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg",
						goodsId: "da34d6f381464a219b37a9ac0ad579e8"
					},
					{
						image:
							"http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg",
						goodsId: "ad176e397858448a854dc50371334faf"
					}
				],
				open: false,
				docked: false,
				searchKeyword: ""
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
					theme.use("pink");
				}
				localStorage.setItem("themeBool", this.themeBool ? 1 : 2);
			},
			async logout() {
				let result = await this.$store.dispatch(`user/${USER_LOGOUT}`);
				if (result.data.success) {
					localStorage.removeItem("token");
					this.$router.push({ name: "user" });
					this.$toast.success(`退出成功!`);
				} else {
					this.$toast.error(result.data.msg);
				}
			}
		}
	};
</script>
<style scope lang="less">
	.mu-carousel {
        max-height:9rem;
		.mu-carousel-item > img {
			width: 100%;
		}
	}
</style>

