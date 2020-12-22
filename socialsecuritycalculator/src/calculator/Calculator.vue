<template>
  <div>
    <!-- <h2>五险一金计算器</h2> -->
    <ul>
      <li>
        <label for="salary" class="w8">税前薪资</label>
        <input
          class="w16"
          type="number"
          name="salary"
          id="salary"
          placeholder="税前薪资"
          v-model="salary"
          @blur="handleIIT"
        />
      </li>
      <li>
        <label for="ssBase" class="w8">{{ssBase.name}}</label
        ><input class="w16" type="number" name="ssBase" id="ssBase" :placeholder="ssBase.name" :min="ssBase.min" :max="ssBase.max" v-model="ssBase.min" @blur="ssBaseChk" />
      </li>
      <li>
        <label for="hpfBase" class="w8">{{hpfBase.name}}</label
        ><input class="w16" type="number" name="hpfBase" id="hpfBase" :placeholder="hpfBase.name" v-model="hpfBase.min" @blur="hpfBaseChk"/>
      </li>
      <hr />
      <li>
          <div></div>
          <div style="text-align:right;padding-right:1em;">企业</div>
          <div style="text-align:right;padding-right:1em;">个人</div>
      </li>
      <li>
        <label for="endowmentInsurance">养老保险金</label>
        <input type="number" name="endowmentInsurance" id="endowmentInsurance" placeholder="养老保险金" :value="endowmentInsurance.e * ssBase.min / 100"/>
        <input type="number" name="endowmentInsurance" id="endowmentInsurance" placeholder="养老保险金" :value="endowmentInsurance.p * ssBase.min / 100" />
      </li>
      <li>
        <label for="medicalInsurance">医疗保险金</label>
        <input type="number" name="medicalInsurance" id="medicalInsurance" placeholder="医疗保险金" :value="medicalInsurance.e * ssBase.min / 100" />
        <input type="number" name="medicalInsurance" id="medicalInsurance" placeholder="医疗保险金" :value="medicalInsurance.p * ssBase.min / 100" />
      </li>
      <li>
        <label for="unemploymentInsurance">失业保险金</label>
        <input type="number" name="unemploymentInsurance" id="unemploymentInsurance" placeholder="失业保险金" :value="unemploymentInsurance.e * ssBase.min / 100" />
        <input type="number" name="unemploymentInsurance" id="unemploymentInsurance" placeholder="失业保险金" :value="unemploymentInsurance.p * ssBase.min / 100" />
      </li>
      <li>
        <label for="industrialInjuryInsurance">工伤保险金</label>
        <input type="number" name="industrialInjuryInsurance" id="industrialInjuryInsurance" placeholder="工伤保险金" :value="industrialInjuryInsurance.e * ssBase.min / 100" />
        <input type="number" name="industrialInjuryInsurance" id="industrialInjuryInsurance" placeholder="工伤保险金" :value="industrialInjuryInsurance.p * ssBase.min / 100" />
      </li>
      <li>
        <label for="housingProvidentFund">住房公积金</label>
        <input type="number" name="housingProvidentFund" id="housingProvidentFund" placeholder="住房公积金" :value="housingProvidentFund.e * hpfBase.min / 100" />
        <input type="number" name="housingProvidentFund" id="housingProvidentFund" placeholder="住房公积金" :value="housingProvidentFund.p * hpfBase.min / 100" />
      </li>
      <hr />
      <li>
        <label for="sscTotal">保险金合计</label>
        <input type="number" name="sscTotalE" id="sscTotalE" placeholder="保险金合计" :value="sscTotal.eT" />
        <input type="number" name="sscTotalP" id="sscTotalP" placeholder="保险金合计" :value="sscTotal.pT" />
      </li>
      <hr />
      <li>
        <label for="taxableSalary" class="w8">应税薪资</label
        ><input class="w16" type="number" name="taxableSalary" id="taxableSalary" placeholder="应税薪资" :value="taxableSalary"/>
      </li>
      <li>
        <label for="salor" class="w8">个人所得税</label
        ><input class="w16" type="number" name="salor" id="" placeholder="个人所得税" :value="individualIncomeTax"/>
      </li>
      <li>
        <label for="salor" class="w8">税后薪资</label
        ><input class="w16" type="number" name="salor" id="" placeholder="税后薪资" :value="numFilter(taxableSalary - individualIncomeTax)" />
      </li>
    </ul>
    <toast v-show="toastShow">
      <span slot="header">欢迎使用UNO-四金计算器</span>
      <span slot="main">用户您好，首次使用需要先进行税率设置，点击后跳转到设置页面。</span>
      <span slot="footer" @click="hideToast">确定</span>
    </toast>
  </div>
</template>

<script>
/* eslint-disable */
import Toast from '../common/unoToast.vue'

export default {
  components: {
    Toast
  },
  data() {
    return {
      toastShow: false,
      salary: '',
      ssBase: '',
      hpfBase: 0,
      endowmentInsurance: '',
      medicalInsurance: '',
      unemploymentInsurance: '',
      industrialInjuryInsurance: '',
      housingProvidentFund: '',
      sscTotal: { e: 0, p: 0, eT: 0, pT: 0 },
      taxableSalary: '',
      individualIncomeTax: ''
    }
  },
  mounted() {
    if (localStorage.getItem('sscInit') === null) {
      this.toastShow =true
      // this.$router.push('/settings')
    }
    this.ssBase = JSON.parse(localStorage.getItem('ssBase'))
    this.hpfBase = JSON.parse(localStorage.getItem('hpfBase'))
    this.endowmentInsurance = JSON.parse(localStorage.getItem('proportion_of_endowment_insurance'))
    this.medicalInsurance = JSON.parse(localStorage.getItem('proportion_of_medical_insurance'))
    this.unemploymentInsurance = JSON.parse(localStorage.getItem('proportion_of_unemployment_insurance'))
    this.industrialInjuryInsurance = JSON.parse(localStorage.getItem('proportion_of_industrial_injury_insurance'))
    this.housingProvidentFund = JSON.parse(localStorage.getItem('proportion_of_housing_provident_fund'))

    this.sscTotal.e = this.endowmentInsurance.e + this.medicalInsurance.e + this.unemploymentInsurance.e + this.industrialInjuryInsurance.e
    this.sscTotal.p = this.endowmentInsurance.p + this.medicalInsurance.p + this.unemploymentInsurance.p + this.industrialInjuryInsurance.p
    this.handleSscTotal()
  },
  methods: {
    hideToast() {
      this.toastShow = false
      this.$router.push('/settings')
    },
    btwChk(v, min, max) {
      // eslint-disable-next-line
      return v <= min ? min : v >= max ? max : v
    },
    ssBaseChk() {
      const ssb = JSON.parse(localStorage.getItem('ssBase'))
      this.ssBase.min = this.btwChk(this.ssBase.min, ssb.min, ssb.max)
    },
    hpfBaseChk() {
      const hpfb = JSON.parse(localStorage.getItem('hpfBase'))
      this.hpfBase.min = this.btwChk(this.hpfBase.min, hpfb.min, hpfb.max)
    },
    numFilter(value) {
      return parseFloat(value).toFixed(2)
    },
    handleSscTotal() {
      this.sscTotal.eT = this.numFilter(this.sscTotal.e * this.ssBase.min / 100 + this.housingProvidentFund.e * this.hpfBase.min / 100)
      this.sscTotal.pT = this.numFilter(this.sscTotal.p * this.ssBase.min / 100 + this.housingProvidentFund.p * this.hpfBase.min / 100)
      this.taxableSalary = this.salary ? this.salary - this.sscTotal.pT : 0
      this.taxableSalary = this.numFilter(this.taxableSalary <= 0 ? 0 : this.taxableSalary)
    },
    handleIIT() {
      const IIT = JSON.parse(localStorage.getItem('individual_income_tax'))
      const index = IIT.findIndex(item => {
        if (item.levelMax === -1) {
          return true
        }
        if (item.levelMax > this.taxableSalary) {
          return true
        }
      })
      if (IIT[index].levelMax === -1) {
        this.individualIncomeTax = (this.taxableSalary - 5000) * IIT[index].proportion / 100 - IIT[index].deduction
      } else {
        this.individualIncomeTax = index > 0 ? (this.taxableSalary - 5000) * IIT[index].proportion / 100 - IIT[index].deduction : (this.taxableSalary - 5000) * IIT[0].proportion / 100 - IIT[0].deduction
      }
      this.individualIncomeTax = this.numFilter(this.individualIncomeTax)
    }
  },
  watch: {
    'ssBase.min': {
      handler: function() {
        this.handleSscTotal()
        this.handleIIT()
      }
    },
    'hpfBase.min': {
      handler: function() {
        this.handleSscTotal()
        this.handleIIT()
      }
    },
    salary() {
      this.handleSscTotal()
    }
  }
}
</script>
