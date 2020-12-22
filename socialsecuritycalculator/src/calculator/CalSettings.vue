<template>
  <div>
    <h2>设置</h2>
    <ul>
      <li>
        <label for="ssBase">{{ssBase.name}}</label>
        <input v-model="ssBase.min" type="number" placeholder="下限" />
        <input v-model="ssBase.max" type="number" placeholder="上限" />
      </li>
      <li>
        <label for="proportion_of_endowment_insurance">{{proportion_of_endowment_insurance.name}}</label>
        <input type="number" name="proportion_of_endowment_insurance" id="" placeholder="企业" v-model="proportion_of_endowment_insurance.e" />
        <input type="number" name="proportion_of_endowment_insurance" id="" placeholder="个人" v-model="proportion_of_endowment_insurance.p" />
      </li>
       <li>
        <label for="proportion_of_medical_insurance">{{proportion_of_medical_insurance.name}}</label>
        <input type="number" name="proportion_of_medical_insurance" id="" placeholder="企业" v-model="proportion_of_medical_insurance.e" />
        <input type="number" name="proportion_of_medical_insurance" id="" placeholder="个人" v-model="proportion_of_medical_insurance.p" />
      </li>
       <li>
        <label for="proportion_of_unemployment_insurance">{{proportion_of_unemployment_insurance.name}}</label>
        <input type="number" name="proportion_of_unemployment_insurance" id="" placeholder="企业" v-model="proportion_of_unemployment_insurance.e" />
        <input type="number" name="proportion_of_unemployment_insurance" id="" placeholder="个人" v-model="proportion_of_unemployment_insurance.p" />
      </li>
      <li>
        <label for="proportion_of_industrial_injury_insurance">{{proportion_of_industrial_injury_insurance.name}}</label>
        <input type="number" name="proportion_of_industrial_injury_insurance" id="" placeholder="企业" v-model="proportion_of_industrial_injury_insurance.e" />
        <input type="number" name="proportion_of_industrial_injury_insurance" id="" placeholder="个人" v-model="proportion_of_industrial_injury_insurance.p" />
      </li>
      <hr />
      <li>
        <label class="w8" for="hpfBase">{{hpfBase.name}}</label>
        <input class="w8" type="number" name="hpfBase" id="" placeholder="下限" v-model="hpfBase.min" />
        <input class="w8" type="number" name="hpfBase" id="" placeholder="上限" v-model="hpfBase.max" />
      </li>
      <li>
        <label class="w8" for="proportion_of_housing_provident_fund">{{proportion_of_housing_provident_fund.name}}</label>
        <input class="w8" type="number" name="proportion_of_housing_provident_fund" id="" placeholder="企业" v-model="proportion_of_housing_provident_fund.e" />
        <input class="w8" type="number" name="proportion_of_housing_provident_fund" id="" placeholder="个人" v-model="proportion_of_housing_provident_fund.p" />
      </li>
      <li>
        <label class="w8" for="proportion_of_housing_provident_fund_supplementary">{{proportion_of_housing_provident_fund_supplementary.name}}</label>
        <input class="w8" type="number" name="proportion_of_housing_provident_fund_supplementary" id="" placeholder="企业" v-model="proportion_of_housing_provident_fund_supplementary.e" />
        <input class="w8" type="number" name="proportion_of_housing_provident_fund_supplementary" id="" placeholder="个人" v-model="proportion_of_housing_provident_fund_supplementary.p" />
      </li>
      <hr />
      <li style="display: block; text-align: left">个人所得税<span style="font-size:9px;margin-left:6px;">(全国统一，起征点5000元)</span></li>
      <li class="t">
        <ul>
          <li>
            <div>区间上限</div>
            <div>税率</div>
            <div>扣除数</div>
          </li>
          <li v-for="(data,index) in individual_income_tax" :key="index">
            <div><input type="number" name="" id="" v-model="data.levelMax" /></div>
            <div><input type="number" name="" id="" v-model="data.proportion" /></div>
            <div><input type="number" name="" id="" v-model="data.deduction" /></div>
          </li>
        </ul>
        <!-- <div>
          <div>区间上限</div>
          <div>税率</div>
          <div>扣除数</div>
        </div>
        <div v-for="(data,index) in individual_income_tax" :key="index">
          <div><input type="number" name="" id="" v-model="data.levelMax" /></div>
          <div><input type="number" name="" id="" v-model="data.proportion" /></div>
          <div><input type="number" name="" id="" v-model="data.deduction" /></div>
        </div> -->
      </li>
      <li style="margin:10px 0;">
        <button class="success" @click="saveSettings">保存</button>
        <button class="primary" @click="resetSettings">恢复默认值</button>
      </li>
    </ul>
    <div class="foot">Copyright © 上海不丁网络科技有限公司 2020</div>
    <!-- <KDialog
      v-model="KD.diaShow"
      :buttons="KD.diaBtn"
      :title="KD.title"
      :desc="KD.desc"
    /> -->
    <toast v-show="KD.diaShow">
      <span slot="header">{{KD.title}}</span>
      <span slot="main" v-html="KD.desc"></span>
      <span slot="footer" @click="hideToast">确定</span>
    </toast>
  </div>
</template>

<script>
import { KDialog } from 'kbone-ui'
import Toast from '../common/unoToast.vue'

export default {
  components: { KDialog, Toast },
  data() {
    return {
      KD: {
        title: '操作提示',
        desc: '用户您好，<br>首次使用请先根据当地政策法规设定该计算中使用的数据，<br>默认情况使用2020年度上海标准。',
        diaShow: false,
        diaBtn: [
          {
            text: '确定',
            click: () => {
              console.log('确定')
              this.KD.diaShow = false
            }
          }
        ],
      },
      toastShow: false,
      ssBase: { name: '社保汇缴基数', min: 4927, max: 28017 },
      proportion_of_endowment_insurance: { name: '养老保险比例', e: 16, p: 8 },
      proportion_of_medical_insurance: { name: '医疗保险比例', e: 10, p: 2 }, // 医疗保险+生育保险(合并)
      proportion_of_unemployment_insurance: { name: '失业保险比例', e: 0.5, p: 0.5 },
      proportion_of_industrial_injury_insurance: { name: '工伤保险比例', e: 1.5, p: 0 },

      hpfBase: { name: '住房公积金基数', min: 2480, max: 28017 },
      proportion_of_housing_provident_fund: { name: '汇缴比例', e: 7, p: 7 },
      proportion_of_housing_provident_fund_supplementary: { name: '补充汇缴比例', e: 0, p: 0 },

      individual_income_tax: [
        { levelMax: 3000, proportion: 3, deduction: 0 },
        { levelMax: 12000, proportion: 10, deduction: 210 },
        { levelMax: 25000, proportion: 20, deduction: 1410 },
        { levelMax: 35000, proportion: 25, deduction: 2660 },
        { levelMax: 55000, proportion: 30, deduction: 4410 },
        { levelMax: 80000, proportion: 35, deduction: 7160 },
        { levelMax: -1, proportion: 45, deduction: 15160 }
      ] // 个人所得税
    }
  },
  mounted() {
    if (localStorage.getItem('sscInit') === null) {
      this.KD.title = '欢迎使用UNO-四金计算器'
      this.KD.diaShow = true

      localStorage.setItem('sscInit', true, '365d')
      localStorage.setItem('ssBase', JSON.stringify(this.ssBase), '365d')
      localStorage.setItem('proportion_of_endowment_insurance', JSON.stringify(this.proportion_of_endowment_insurance), '365d')
      localStorage.setItem('proportion_of_medical_insurance', JSON.stringify(this.proportion_of_medical_insurance), '365d')
      localStorage.setItem('proportion_of_unemployment_insurance', JSON.stringify(this.proportion_of_unemployment_insurance), '365d')
      localStorage.setItem('proportion_of_industrial_injury_insurance', JSON.stringify(this.proportion_of_industrial_injury_insurance), '365d')

      localStorage.setItem('hpfBase', JSON.stringify(this.hpfBase), '365d')
      localStorage.setItem('proportion_of_housing_provident_fund', JSON.stringify(this.proportion_of_housing_provident_fund), '365d')
      localStorage.setItem('proportion_of_housing_provident_fund_supplementary', JSON.stringify(this.proportion_of_housing_provident_fund_supplementary), '365d')
      localStorage.setItem('individual_income_tax', JSON.stringify(this.individual_income_tax), '365d')
    }

    this.ssBase = this.getCalItem('ssBase', this.ssBase)
    this.proportion_of_endowment_insurance = this.getCalItem('proportion_of_endowment_insurance', this.proportion_of_endowment_insurance)
    this.proportion_of_medical_insurance = this.getCalItem('proportion_of_medical_insurance', this.proportion_of_medical_insurance)
    this.proportion_of_unemployment_insurance = this.getCalItem('proportion_of_unemployment_insurance', this.proportion_of_unemployment_insurance)
    this.proportion_of_industrial_injury_insurance = this.getCalItem('proportion_of_industrial_injury_insurance', this.proportion_of_industrial_injury_insurance)

    this.hpfBase = this.getCalItem('hpfBase', this.hpfBase)
    this.proportion_of_housing_provident_fund = this.getCalItem('proportion_of_housing_provident_fund', this.proportion_of_housing_provident_fund)
    this.proportion_of_housing_provident_fund_supplementary = this.getCalItem('proportion_of_housing_provident_fund_supplementary', this.proportion_of_housing_provident_fund_supplementary)

    this.individual_income_tax = this.getCalItem('individual_income_tax', this.individual_income_tax)
  },
  methods: {
    hideToast() {
      this.KD.diaShow = false
    },
    getCalItem(item, obj) {
      if (localStorage.getItem(item) === undefined || localStorage.getItem(item) === null || localStorage.getItem(item) === '') {
        localStorage.setItem(item, JSON.stringify(obj), '365d')
        return obj
      // eslint-disable-next-line
      } else {
        return JSON.parse(localStorage.getItem(item))
      }
    },
    saveSettings() {
      localStorage.setItem('ssBase', JSON.stringify(this.ssBase), '365d')
      localStorage.setItem('proportion_of_endowment_insurance', JSON.stringify(this.proportion_of_endowment_insurance), '365d')
      localStorage.setItem('proportion_of_medical_insurance', JSON.stringify(this.proportion_of_medical_insurance), '365d')
      localStorage.setItem('proportion_of_unemployment_insurance', JSON.stringify(this.proportion_of_unemployment_insurance), '365d')
      localStorage.setItem('proportion_of_industrial_injury_insurance', JSON.stringify(this.proportion_of_industrial_injury_insurance), '365d')

      localStorage.setItem('hpfBase', JSON.stringify(this.hpfBase), '365d')
      localStorage.setItem('proportion_of_housing_provident_fund', JSON.stringify(this.proportion_of_housing_provident_fund), '365d')
      localStorage.setItem('proportion_of_housing_provident_fund_supplementary', JSON.stringify(this.proportion_of_housing_provident_fund_supplementary), '365d')

      localStorage.setItem('individual_income_tax', JSON.stringify(this.individual_income_tax), '365d')

      this.KD.title = '操作提示'
      this.KD.desc = '保存成功！'
      this.KD.diaShow = true
    },
    resetSettings() {
      localStorage.removeItem('sscInit')
      // this.$router.push('/settings')
      this.saveSettings()
      this.$router.go(-1)
      // this.KD.title = '操作提示'
      // this.KD.desc = '恢复成功！'
      // this.KD.diaShow = true
    }
  }
}
</script>
<style lang="scss">
.t {
  margin: 0;
  width: 100%;
  ul {
    width: 100%;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px dotted #2c3e50;
      padding: 0;
      div {
        // justify-content: center;
        width:33%;
        border-right: 1px dotted #2c3e50;
        // border-bottom: none;
        text-align: center;
        padding: 2px;
      }
      div:last-child{
        border-right: none;
      }
    }
  }
}
.foot {
  margin: 2.5em 0;
  padding: 10px auto;
  width: 100%;
  text-align: center;
  font-size: 0.5em;
}
</style>
