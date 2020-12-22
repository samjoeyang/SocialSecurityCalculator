//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.showShareMenu()
    var mta =require('utils/mta_analysis.js')
    mta.App.init({
      "appID": "500458537",
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
  },
  locations:{
    arr:["上海","北京","广州","深圳"],
    index:0,
  },
  incometax:{   //个人所得税
      base:3500,
      begintime:"2011-09-01",
      tax:{
        level1:{
          min:0,
          max:1500,
          t:3,
          takeoff:0,
        },
        level2:{
          min:1500,
          max:3500,
          t:10,
          takeoff:105,
        },
        level3:{
          min:4500,
          max:9000,
          t:20,
          takeoff:555,
        },
        level4:{
          min:9000,
          max:35000,
          t:25,
          takeoff:1005,
        },
        level5:{
          min:35000,
          max:55000,
          t:30,
          takeoff:2755,
        },
        level6:{
          min:55000,
          max:80000,
          t:35,
          takeoff:5505,
        },
        level7:{
          min:80000,
          max:9999999999999999999,
          t:45,
          takeoff:13505,
        },
      },
    },
  shanghai:{
    location:"上海",
    s:{   //社会保险
      base:{ 
        min:3902,
        max:19512
      },
      e:{   //养老保险
        tax:{
          e:20,
          p:8
        }
      },
      me:{  //医疗保险
        tax:{
          e:9.5,
          p:2
        }
      },
      u:{   //失业保险
        tax:{
          e:0.5,
          p:0.5
        }
      },
      i:{   //工伤保险
        tax:{
          e:0.2,
          p:0
        }
      },
      ma:{  //生育保险
        tax:{
          e:1,
          p:0
        }
      },
    },
    h:{ //住房公积金
      base:{
        min:2020,
        max:17817,
      },
      tax:{
        e:7,
        p:7
      },
      fee:{
        min:282,
        max:2494
      },
      ex_tax:{
        arr:[0,1,2,3,4,5],
        index:0
      },
      ex_fee:{
        min:0,
        max:1782
      },
      expire:"2016.7-2017.6",
    },
  },
  beijing:{
    location:"北京",
    s:{   //社会保险
      base:{ 
        min:2834,
        max:21258
      },
      e:{   //养老保险
        tax:{
          e:19,
          p:8
        }
      },
      me:{  //医疗保险
        tax:{
          e:10,
          p:2
        }
      },
      u:{   //失业保险
        tax:{
          e:0.8,
          p:0.2
        }
      },
      i:{   //工伤保险
        tax:{
          e:0.4,
          p:0
        }
      },
      ma:{  //生育保险
        tax:{
          e:0.8,
          p:0
        }
      },
    },
    h:{ //住房公积金
      base:{
        min:1955,
        max:21258,
      },
      tax:{
        e:12,
        p:12
      },
      fee:{
        min:469.2,
        max:2494
      },
      ex_tax:{
        arr:[0],
        index:0
      },
      ex_fee:{
        min:0,
        max:0
      },
      expire:"2016.7-2017.6",
    },
    incometax:{   //个人所得税
      base:3500,
      begintime:"2011-09-01",
      tax:{
        level1:{
          min:0,
          max:1500,
          t:3,
          takeoff:0,
        },
        level2:{
          min:1500,
          max:3500,
          t:10,
          takeoff:105,
        },
        level3:{
          min:4500,
          max:9000,
          t:20,
          takeoff:555,
        },
        level4:{
          min:9000,
          max:35000,
          t:25,
          takeoff:1005,
        },
        level5:{
          min:35000,
          max:55000,
          t:30,
          takeoff:2755,
        },
        level6:{
          min:55000,
          max:80000,
          t:35,
          takeoff:5505,
        },
        level7:{
          min:80000,
          max:9999999999999999999,
          t:45,
          takeoff:13505,
        },
      },
    },
  },
  guangzhou:{
    location:"广州",
    s:{   //社会保险
      base:{ 
        min:2529,
        max:12303
      },
      e:{   //养老保险
        tax:{
          e:12,
          p:8
        }
      },
      me:{  //医疗保险
        tax:{
          e:8,
          p:2
        }
      },
      u:{   //失业保险
        tax:{
          e:2,
          p:1,
        }
      },
      i:{   //工伤保险
        tax:{
          e:0.85,
          p:0
        }
      },
      ma:{  //生育保险
        tax:{
          e:0.85,
          p:0
        }
      },
    },
    h:{ //住房公积金
      base:{
        min:1550,
        max:20505,
      },
      tax:{
        e:8,
        p:8
      },
      fee:{
        min:248,
        max:3280
      },
      ex_tax:{
        arr:[0],
        index:0
      },
      ex_fee:{
        min:0,
        max:0
      },
      expire:"2016.7-2017.6",
    },
  },
  shenzhen:{
    location:"深圳",
    s:{   //社会保险
      base:{ 
        min:3131,
        max:15654
      },
      e:{   //养老保险
        tax:{
          e:14,
          p:8
        }
      },
      me:{  //医疗保险
        tax:{
          e:6.2,
          p:2
        }
      },
      u:{   //失业保险
        tax:{
          e:2,
          p:1,
        }
      },
      i:{   //工伤保险
        tax:{
          e:0.4,
          p:0
        }
      },
      ma:{  //生育保险
        tax:{
          e:0.5,
          p:0
        }
      },
    },
    h:{ //住房公积金
      base:{
        min:1808,
        max:26091,
      },
      tax:{
        e:13,
        p:13
      },
      fee:{
        min:235,
        max:3391
      },
      ex_tax:{
        arr:[0],
        index:0
      },
      ex_fee:{
        min:0,
        max:0
      },
      expire:"2016.7-2017.6",
    },
  },
  //自定义function
  getBase:function(b,min,max) {
    return b<min?min:b>max?max:b;
  },
  getFee:function(f,t){
    return Math.round(f*t)/100;
  },
  getIncomeTax:function(b){
    var r=0
    b=b-3500
    switch (true){
      case (b<=0):
        r = 0;
        break;
      case (b<=1500):
        r = b*.03;
        break;
      case (b<=4500):
        r = b * .1 -105;
        break;
      case (b<=9000):
        r = b * .2 -555;
        break;
      case (b<=35000):
        r = b * .25 -1005;
        break;
      case (b<=55000):
        r = b * .3 -2755;
        break;
      case (b<=80000):
        r = b * .35 -5505;
        break;
      case (b>80000):
        r = b * .45 -13505;
        break;
      default:
        r = 0
    }
    return r;
  },
  cal:function(m,s,h,_h,obj){
    var cals = {}
    cals.s_e_e = this.getFee(s , obj.s.e.tax.e)
    cals.s_e_p = this.getFee(s , obj.s.e.tax.p)
    cals.s_me_e = this.getFee(s ,obj.s.me.tax.e)
    cals.s_me_p = this.getFee(s ,obj.s.me.tax.p)
    cals.s_u_e = this.getFee(s ,obj.s.u.tax.e)
    cals.s_u_p = this.getFee(s ,obj.s.u.tax.p)
    cals.s_i_e = this.getFee(s ,obj.s.i.tax.e)
    cals.s_i_p = this.getFee(s ,obj.s.i.tax.p)
    cals.s_ma_e = this.getFee(s ,obj.s.ma.tax.e)
    cals.s_ma_p = this.getFee(s ,obj.s.ma.tax.p)

    // cals.h_e = this.getBase(this.getFee(h,obj.h.tax.e),obj.h.fee.min/2,obj.h.fee.max/2)
    // cals.h_p = this.getBase(this.getFee(h,obj.h.tax.p),obj.h.fee.min/2,obj.h.fee.max/2)
    cals.h_e = this.getFee(h,obj.h.tax.e)
    cals.h_p = this.getFee(h,obj.h.tax.p)

    cals._h_e =  this.getBase(this.getFee(h,_h),obj.h.ex_fee.min/2,obj.h.ex_fee.max/2)
    cals._h_p = this.getFee(h,_h)

    cals.t_e = cals.s_e_e + cals.s_me_e + cals.s_u_e + cals.s_ma_e + cals.s_i_e + cals.h_e + cals._h_e
    cals.t_p = cals.s_e_p + cals.s_me_p + cals.s_u_p + cals.s_ma_p + cals.s_i_p + cals.h_p + cals._h_p

    cals.i_base = m - cals.t_p
    cals.i_t = this.getIncomeTax(cals.i_base)

    cals.m_after = m - cals.t_p - cals.i_t
    cals.all_e = parseFloat(m) + parseFloat(cals.t_e)

    return cals
  },
})