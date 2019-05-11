<!-- 添加/修改手机 -->
<template>
	<div>
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left" @click="$router.go(-1)">
				<mu-icon value="arrow_back"></mu-icon>
			</mu-button>Vuex体验店
			<mu-button flat slot="right">
				<mu-icon value="home"></mu-icon>
			</mu-button>
		</mu-appbar>
		<mu-sub-header>{{subTitle}}</mu-sub-header>

		<mu-form :model="form" ref="form" label-position="right" label-width="100">
			<mu-form-item prop="brandId" label="手机品牌" :rules="brandRules">
				<mu-select v-model="form.brandId" @change="chooseBrand">
					<mu-option
						v-for="option,index in phoneOptions"
						:key="option.id"
						:label="option.name"
						:value="option.id"
					></mu-option>
				</mu-select>
			</mu-form-item>

			<mu-form-item prop="typeId" label="手机型号" :rules="typeRules">
				<mu-select :disabled="!form.brandId" v-model="form.typeId">
					<mu-option
						v-for="option,index in types"
						:key="option.id"
						:label="option.name"
						:value="option.id"
					></mu-option>
				</mu-select>
			</mu-form-item>
			<mu-form-item prop="status" label="手机状态">
				<mu-radio v-model="form.status" :value="1" label="在售"></mu-radio>
				<mu-radio v-model="form.status" :value="2" label="未售"></mu-radio>
			</mu-form-item>
			<mu-form-item>
				<mu-button color="primary" @click="submit">提交</mu-button>
				<mu-button @click="reset">重置</mu-button>
			</mu-form-item>
		</mu-form>
	</div>
</template>
<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import axios from "@/axios/axios";
	import {
		GET_PHONES,
		CHOOSE_BRAND,
		RESET_ADD_PHONE,
		ADD_PHONE,
		SET_TITLE,
		GET_PHONE_INFO,
		UPDATE_PHONE
	} from "@/vuex/mutation-types";
	export default {
		name: "phone",
		data() {
			return {
				brandRules: [{ validate: val => !!val, message: "请选择手机品牌" }],
				typeRules: [{ validate: val => !!val, message: "请选择手机型号" }]
			};
		},
		mounted() {
			this.gePhones();
			this.updateInfo();
		},
		computed: {
			...mapState("phone", {
				subTitle: state => state.subTitle,
				phoneOptions: state => state.phoneOptions,
				types: state => state.types,
				form: state => state.form
			})
		},
		methods: {
			//设置 添加/修改手机 title
			...mapMutations("phone", {
				setTitle: SET_TITLE
			}),

			...mapActions("phone", {
				gePhones: GET_PHONES, //获取手机品牌
				getInfo: GET_PHONE_INFO //获取手机修改信息
			}),

			//这里chooseBrand方法返回一个value值
			//通过手机品牌 获取手机型号
			chooseBrand(value) {
				this.form.typeId = "";
				this.$store.dispatch(`phone/${CHOOSE_BRAND}`, value);
			},

			//添加/修改提交
			async submit() {
				let validate = await this.$refs.form.validate();
				if (!validate) return;

				let str = this.$route.query.id ? UPDATE_PHONE : ADD_PHONE;

				//添加/修改
				let result = await this.$store.dispatch(`phone/${str}`, this.form);
				if (result.data.success) {
					this.$toast.success(
						`${this.$route.query.id ? "修改" : "添加"}成功!`
					);
					this.reset();
					this.$router.go(-1);
				} else {
					this.$toast.error(result.data.msg);
				}
			},

			//获取修改信息
			async updateInfo() {
				let id = this.$route.query.id;
				if (id) {
					this.setTitle("修改手机");
					let result = await this.getInfo(id);
					if (result.data.success) {
						//修改信息获取成功后 通过brandId去获取手机型号下拉-不然手机型号下拉没有数据
						this.$store.dispatch(
							`phone/${CHOOSE_BRAND}`,
							result.data.data.brandId
						);
					}
				} else {
					this.setTitle("添加手机");
				}
			},

			//重置
			reset() {
				this.$refs.form.clear();
				this.$store.commit(`phone/${RESET_ADD_PHONE}`);
			}
		}
	};
</script>
