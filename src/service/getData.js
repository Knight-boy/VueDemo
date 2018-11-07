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
 *
 */
 export const msiteAddress = geohash => fetch('/api/v2/pois/' + geohash);

