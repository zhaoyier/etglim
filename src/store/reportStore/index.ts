import { observable, action, runInAction, toJS, computed } from 'mobx'
import { StoreExt } from '@utils/reactExt'

export class ReportStore extends StoreExt {
    /**
     * 加载用户列表时的loading
     *
     * @memberof UserStore
     */
    @observable
    getDailyloading = false
    /**
     * table pageIndex
     *
     * @memberof UserStore
     */
    @observable
    pageIndex = 1
    /**
     * table pageSize
     *
     * @memberof UserStore
     */
    @observable
    pageSize = 30
    /**
     * 每日行情
     *
     * @type {IUserStore.IUser[]}
     * @memberof UserStore
     */
    @observable
    marketes: IReportStore.IDaily[] = []
    /**
     * users total
     *
     * @memberof UserStore
     */
    @observable total = 0
    @observable varietyList: IReportStore.IVariety[] = []
    @observable contractList: IReportStore.IContract[] = []
    @observable currentVariety = ''
    @observable currentContract = ''

    // constructor() {
    //     getVarietyList()
    // }

    @action
    getDaily = async (contract: string) => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getDaily({
                name: contract,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
            runInAction('SET_DAILY_MARKET', () => {
                this.marketes = res.markets
                this.total = res.total
                console.log('====>>024:', this.marketes, this.total)
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    getVarietyList = async () => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getVarietyList({})
            runInAction('SET_DAILY_MARKET', () => {
                this.varietyList = res
                console.log('====>>022:', toJS(this.varietyList), res)
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    changeVariety = (variety: string) => {
        this.currentVariety = variety
    }
    @action
    getContract = async (variety: string) => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getContractList({ variety: variety })
            runInAction('SET_DAILY_MARKET', () => {
                this.contractList = res
                console.log('====>>025:', toJS(this.contractList), res)
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }

    @computed get varietyOptions() {
        return this.varietyList.map(x => ({ variety: x.variety, varietyCN: x.varietyCN }))
    }
    @computed get contractOptions() {
        return this.contractList.map(x => ({ variety: x.variety, varietyCN: x.varietyCN, contract: x.contract }))
    }
}
export default new ReportStore()
