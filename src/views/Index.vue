<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left">
				<mu-icon value="home"></mu-icon>
			</mu-button>
			<mu-button flat slot="right">
				<mu-switch @change="themeChange" v-model="themeBool"></mu-switch>
			</mu-button>
		</mu-appbar>
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
	export default {
		data() {
			return {
				themeBool: false,
				imgs: [
					"https://dsfs.oppo.com/archives/201903/201903261103295c9a3f055d6a4.jpg",
					"https://dsfs.oppo.com/archives/201904/201904250304345cc16706d1c29.jpg",
					"https://dsfs.oppo.com/archives/201904/201904100304015cad9c69e00ec.jpg",
					"https://dsfs.oppo.com/archives/201904/201904110704035caf1e6fbf9d0.jpg"
				]
			};
		},
		mounted() {
			this.themeBool = localStorage.getItem("themeBool") == 1;
			this.themeChange();
		},
		methods: {
			themeChange() {
				if (this.themeBool) {
					theme.use("teal");
				} else {
					theme.use("light");
				}
				localStorage.setItem("themeBool", this.themeBool ? 1 : 2);
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

