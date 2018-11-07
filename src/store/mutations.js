import {
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN
} from './mutation-types.js'

import { setStorage, getStorage } from '../config/mUtils'

export default {
	//记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStorage('user_id', info.user_id);
	},
	//获取用户信息
	[GET_USERINFO](state, info) {
		if(state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		}
		if(!state.login){
			return;
		}
		if(!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = true;
	}
}