import axios from 'axios'

//得到全国所有的医疗点数据
export function get_hos_point(callback) {
  axios({
    method: "get",
    //以下为实验全国医疗点数据
    // url: 'data/try_all_hospital.json'

    //以下为真实全国医疗点数据
    url: 'data/real_all_hospital.json'
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//得到全国所有的医疗点数据(分片方式)
export function slice_hos_point(index, callback) {
  axios({
    method: "get",
    url: `data/slice/slice${index}.json`
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//得到全国发热门诊的医疗点数据
export function get_fever_point(callback) {
  axios({
    method: "get",
    //以下为实验全国发热门诊数据
    // url: 'data/try_part_hospital.json'

    //以下为真实全国发热门诊数据
    url: 'data/real_fever_hospital.json'
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//得到热力图医疗点数据
export function get_heatmap_point(callback) {
  axios({
    method: "get",
    url: 'data/heatmap.json'
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//用户输入框输入查询数据后向后端发送请求查询数据库

//查询距离输入地一定距离的医院（20km内）
export function search_distance_point(hos_search, callback) {
  axios({
    method: "get",
    url: `http://www.xuqisheng.top:3000/nearHos?address=${hos_search}`
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//查询具体的医院名字(可模糊查询)
export function search_hos_point(hos_search, callback) {
  axios({
    method: "get",
    url: `http://www.xuqisheng.top:3000/hosDetails?name=${hos_search}`
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//根据医院的名字精准查询医院
export function search_accurate_hos(hos_search, callback) {
  axios({
    method: "get",
    url: `http://www.xuqisheng.top:3000/hosDetail?name=${hos_search}`
  })
  .then(callback)
  .catch((error)=>console.log(error))
}

//百度地图正地理编码接口接口(免费6k次/天)，注意调用需跨域
export function baidu_api_point(place_wanted, callback) {
  window.callbackData = callback;
  let url = `http://api.map.baidu.com/geocoding/v3/?address=${place_wanted}&output=json&ak=5RMRzoGfGZVaMI296Qqi0aAl05mUo431&callback=callbackData`;

  let fetchJsonp = function(url){
      let body = document.getElementsByTagName('body')[0];
      let script = document.createElement('script');
      script.setAttribute('src',url);
      body.appendChild(script);
  }
  fetchJsonp(url);
}