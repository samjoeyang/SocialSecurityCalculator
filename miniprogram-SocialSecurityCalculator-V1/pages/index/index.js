//index.js
//获取应用实例
var app = getApp()
var cal = getApp()
var cnf = cal.shanghai
var value_salary=0
var value_ssf_base=0
var value_housing_base=0
var value_ex_housing_tax=0
var h_disabled=false

Page({
  data: {
    motto: '社保公积金所得税计算器',
    userInfo: {},
    s:cnf.s,
    h:cnf.h,
    incometax:cal.incometax,
    array:cnf.h.ex_tax.arr,
    index:cnf.h.ex_tax.index,
    location_array:cal.locations.arr,
    location_index:cal.locations.index,
    _location:cnf.location,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindlocation:function(e){
    switch (true){
      case (e.detail.value==0):
        cnf=cal.shanghai;
        break;
      case (e.detail.value==1):
        cnf=cal.beijing;
        break;
      case (e.detail.value==2):
        cnf=cal.guangzhou;
        break;
      case (e.detail.value==3):
        cnf=cal.shenzhen;
        break;
      default:
        cnf=cal.shanghai;
    }
    // e.detail.value==0?cnf=cal.shanghai:cnf=cal.beijing
    this.setData({
      location_index:e.detail.value,
      _location:cnf.location,
    })
    if (value_ssf_base) {
      var res = cal.cal(value_salary,value_ssf_base,value_housing_base,value_ex_housing_tax,cnf)
      this._setData(res)
    }else{
      this.setData({
        value_endowment_fee_e:cnf.s.e.tax.e + "%",
        value_endowment_fee_p:cnf.s.e.tax.p + "%",
        value_medical_fee_e:cnf.s.me.tax.e + "%",
        value_medical_fee_p:cnf.s.me.tax.p + "%",
        value_unemployment_fee_e:cnf.s.u.tax.e + "%",
        value_unemployment_fee_p:cnf.s.u.tax.p + "%",
        value_industrial_injury_fee_e:cnf.s.i.tax.e + "%",
        value_industrial_injury_fee_p:cnf.s.i.tax.p + "%",
        value_maternity_fee_e:cnf.s.ma.tax.e + "%",
        value_maternity_fee_p:cnf.s.ma.tax.p + "%",
        value_housing_fee_e:cnf.h.tax.e + "%",
        value_housing_fee_p:cnf.h.tax.p + "%",
        value_s_base_min:cnf.s.base.min,
        value_s_base_max:cnf.s.base.max,  
        value_h_fee_min:cnf.h.fee.min,
        value_h_fee_max:cnf.h.fee.max,
        value_h_ex_fee_min:cnf.h.ex_fee.min,
        value_h_ex_fee_max:cnf.h.ex_fee.max,
        array:cnf.h.ex_tax.arr,
        index:cnf.h.ex_tax.index,
      })
    }
    
  },
  bindinputChange:function(e){
    value_salary=e.detail.value
    if (h_disabled){

    }else{
      value_ssf_base = cal.getBase(value_salary,cnf.s.base.min,cnf.s.base.max)
      value_housing_base = cal.getBase(value_salary,cnf.h.base.min,cnf.h.base.max)
    }
    this.setData({
      value_ssf_base:value_ssf_base,
      value_housing_base:value_housing_base,
    })
  },
  bindPickerChange: function(e) {
    value_ex_housing_tax = e.detail.value
    this.setData({
      index: value_ex_housing_tax,
    })
    var res = cal.cal(value_salary,value_ssf_base,value_housing_base,value_ex_housing_tax,cnf)
    this._setData(res)
  },
  bindblurChange:function(e){
    if (e.target.id=="ssf"){
      value_ssf_base = cal.getBase(e.detail.value,cnf.s.base.min,cnf.s.base.max)
      this.setData({
        value_ssf_base:value_ssf_base,
      })
    }
    if (e.target.id=="housing"){
      value_housing_base = cal.getBase(e.detail.value,cnf.h.base.min,cnf.h.base.max)
      this.setData({
        value_housing_base:value_housing_base,
      })
    }
  
    var res = cal.cal(value_salary,value_ssf_base,value_housing_base,value_ex_housing_tax,cnf)
    this._setData(res)

    console.log("m:",value_salary,"s:",value_ssf_base,"h:",value_housing_base,"_h:",value_ex_housing_tax,"计算出的结果:",res)
  },
  switchChange:function(e){
    if (e.detail.value){
      value_housing_base=cal.getBase(e.detail.value,cnf.h.base.min,cnf.h.base.max)
    }else{
      value_housing_base=0
    }
    this.setData({
      h_disabled:e.detail.value?false:true,
      value_housing_base:value_housing_base,
    })

    var res = cal.cal(value_salary,value_ssf_base,value_housing_base,value_ex_housing_tax,cnf)
    this._setData(res)
  },
  frooze:function(e){
    h_disabled=e.detail.value
    this.setData({
      h_disabled:h_disabled,
    })
  },
  //定义一个赋值的方法
  _setData:function(res){
    this.setData({
      value_endowment_fee_e:res.s_e_e,
      value_endowment_fee_p:res.s_e_p,
      value_medical_fee_e:res.s_me_e,
      value_medical_fee_p:res.s_me_p,
      value_unemployment_fee_e:res.s_u_e,
      value_unemployment_fee_p:res.s_u_p,
      value_industrial_injury_fee_e:res.s_i_e,
      value_industrial_injury_fee_p:res.s_i_p,
      value_maternity_fee_e:res.s_ma_e,
      value_maternity_fee_p:res.s_ma_p,
      value_housing_fee_e:res.h_e,
      value_housing_fee_p:res.h_p,
      value_ex_housing_fee_e:res._h_e,
      value_ex_housing_fee_p:res._h_p,
      value_total_e:res.t_e,
      value_total_p:res.t_p,
      value_income_tax_base:res.i_base,
      value_income_tax_fee:(res.i_t).toFixed(2),
      value_salary_after:(res.m_after).toFixed(2),
      value_expenditure_e:res.t_e,
      value_expenditure_p:res.t_p+res.i_t,
      value_all_e:res.all_e,
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
  },
  //分享按钮
  onShareAppMessage: function () {
    return {
      title: this.data.motto,
      path: '/pages/index/index',
      success: function(res) {
        console.log("分享成功",res)
      },
      fail: function(res) {
        console.log("分享失败",res)
      }
    }
  }
})
