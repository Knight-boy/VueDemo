import fetch from '../config/fetch'
import { getStorage } from '../config/mUtils'

/**
 * 获取用户信息
 */

 export const getUser = () => fetch('/api/v1/user', {
 	user_id: getStorage('user_id')
 });
 

/**
 *定位城市
 */
 export const cityGuess = () => fetch('/api/v1/cities', {
 	type: 'guess'
 });

/**
 *获取热门城市
 */
 export const hotcity = () => fetch('/api/v1/cities', {
 	type: 'hot'
 });

/**
 *获取所有城市
 */
 export const groupcity = () => fetch('/api/v1/cities', {
 	type: 'group'
 });

/**
 *当前城市
 */
 export const currentcity = number => fetch('/api/v1/cities' + number);

/**
 *搜索查询
 */
export const searchplace = (cityid, value) => fetch('/api/v1/pois', {
	type: 'search',
	cityid: cityid,
	keyword: value
});

/**
 *位置信息
 */
 export const msiteAddress = geohash => fetch('/api/v2/pois/' + geohash);

/**
 *获取验证码
 */
export const mobileCode = phone => fetch('/api/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');

/**
 *图片验证码
 */
export const getcaptchas = () => fetch('/api/v1/captchas',{},'POST');

/**
 *
 */
export const checkExsis = (checkNumber, type) => fetch('/api/v1/users/exists', {
	[type]: checkNumber,
	type
});

/**
 * 手机号登录
 */
export const sendLogin = (code, mobile, validate_token) => fetch('/api/v1/login/app_mobile',{
	code,
	mobile,
	validate_token
},'POST');

/**
 *密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/api/v2/login',{username, password, captcha_code}, 'POST');
