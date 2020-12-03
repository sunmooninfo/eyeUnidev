const baseUrl = "https://wwwapidev.6eye9.com/"; //云端  
// const baseUrl = "http://192.168.1.66:8060/wx/"; // 本地
//const baseUrl = "http://192.168.1.14:8060/wx/"; // 本地 
//const baseUrl = "https://langbobbb.utools.club/wx/"; // 内网穿透

// post请求封装
function postRequest(url, data) {
    let promise = new Promise((resolve, reject) => {
        let that = this;
        let postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "POST",
            header: {
                'Content-Type': 'application/json',
                'X-Eye-Token': uni.getStorageSync('token'),
                'X-Eye-Refresh_Token': uni.getStorageSync('refresh_token')
            },
            success: function(res) {
                //返回什么就相应的做调整
                if(res.data.errno == '501'){
                    uni.showToast({
                        // image: '../static/images/liuyan.png',
                        title: `请登录`,
						icon: 'none',
                        duration: 1500
                    })
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '../login/login'
                        });
                    }, 1200);
                }
                if(res.data.errmsg == '501'){
                    console.log(请登录)
                }
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
                    // 接口后面的then执行
                    // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    // 不会被阻断在那里执行不下去！
                    resolve(res.data.msg);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

// get请求封装
function getRequest(url, data) {
    let promise = new Promise((resolve, reject) => {
        let that = this;
        let postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "GET",
            dataType: "json",
            header: {
                'Content-Type': 'application/json',
                'X-Eye-Token': uni.getStorageSync('token'),
				'X-Eye-Refresh_Token': uni.getStorageSync('refresh_token')
            },
            success: function(res) {
                if(res.data.errno == '501'){
                    uni.showToast({
                        // image: '../static/images/liuyan.png',
                        title: `请登录`,
                        duration: 1500
                    })
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '../login/login'
                        });
                    }, 1200);
                }
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
}

module.exports = {
    post: postRequest,
    get: getRequest
};