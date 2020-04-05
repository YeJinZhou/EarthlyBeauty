// 因为本地缓存中的信息是以及KEY+VALUE（键值对）的形式来存储数据
// 所以要定义一个用户信息的KEY，即USER_KEY
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
// 没有在其他地方用到过，可以删除。除非是要存储什么state
// state在vuex中表示数据源，你可能是在相关的地方见到他用来存储数据，但是目前不需要
const STATE_KEY = 'STATE_KEY';	

const getUsers = function() {
	// let是一个数据类型，自行查阅与var的区别
	let ret = '';
	// 通过KEY来获取本地缓存中对应的数据
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	// parse是stringify的反操作，使字符串转化回对象，返回user
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	// 先通过KEY来获取当前的user，可以理解为一个数组或者列表，一开始的时候是空的，表示没有账号
	let users = getUsers();
	// 把account和passsword作为一个整体添加到users列表中，表示添加一个账户
	// 如果有两个账户，则users可以表示为
		// user = {
		// 	{
		// 		account: 'acc1',
		// 		password: 'psd1'
		// 	},
		// 	{
		// 		account: 'acc1',
		// 		password: 'psd1'
		// 	}
		// }
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	// 把账户信息再通过KEY+VALUE的形式放入本地缓存中，因为只能放入字符串，
	// 所以要通过JSON.stringify（string是字符串的意思，ify表示这个动作，即对象字符串化）把users变成字符串
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
	getUsers,
	addUser
}
