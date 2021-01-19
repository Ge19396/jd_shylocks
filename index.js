//'use strict';
exports.main_handler = async (event, context, callback) => {
  try {
    //如果想定时触发执行js文件，需要在定时触发器的【附加信息】里面填写对应的名称 ，如 qqreadbox
    //如果想在一个定时触发器里面执行多个js文件需要在定时触发器的【附加信息】里面填写对应的名称，用 & 链接
    //例如我想一个定时触发器里执行qqreadbox.js和qqreadins.js，在定时触发器的【附加信息】里面就填写 qqreadbox&qqreadins
    for (const v of event["Message"].split("&")) {
      console.log(v);
      var request = require('request');
      //1.执行自己上传的js文件
      delete require.cache[require.resolve('./'+v+'.js')];
      require('./'+v+'.js')

      //2.执行国内gitee远端js文件如果部署，在国内节点，选择1或2的方式
      //request('https://gitee.com/lxk0301/jd_scripts/raw/master/'+v+'.js', function (error, response, body) {
      // eval(response.body)
      //})

      //3.执行github远端的js文件(因github的raw类型的文件被墙,此方法云函数不推荐)
      //request('https://raw.githubusercontent.com/lxk0301/jd_scripts/master/' + v + '.js', function (error, response, body) {
        //eval(response.body)
      //})
    }
  } catch (e) {
    console.error(e)
  }
}
