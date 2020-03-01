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
    @observable
    getHintloading = false
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
    @observable hintTotal = 0
    @observable contractTotal = 0
    @observable currentExchange = ''
    @observable currentVariety = ''
    @observable billboardList = []
    @observable billboardPrice = []
    @observable varietyList: IReportStore.IVariety[] = []
    @observable contractList: IReportStore.IContract[] = []
    @observable hintList: IReportStore.IContract[] = []

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
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    getBillboard = async (contract: string, start: number, end: number) => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getBillboardList({
                contract: contract,
                billboardStart: start,
                billboardEnd: end
            })
            runInAction('SET_DAILY_MARKET', () => {
                this.billboardList = JSON.parse(res.position)
                this.billboardPrice = JSON.parse(res.price)
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    getVarietyList = async (exchange: string) => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getVarietyList({ exchange: exchange })
            runInAction('SET_DAILY_MARKET', () => {
                this.varietyList = res
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    getContract = async (exchange: string, variety: string) => {
        this.getDailyloading = true
        try {
            const res = await this.api.report.getContractList({ exchange: exchange, variety: variety })
            runInAction('SET_DAILY_MARKET', () => {
                this.contractList = res
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }

    @action
    getHintList = async (date: number) => {
        this.getHintloading = true
        try {
            const res = await this.api.report.getHintList({ date: date })
            runInAction('SET_DAILY_MARKET', () => {
                this.hintList = res.hints
                this.hintTotal = res.total
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getHintloading = false
        })
    }

    @action
    getMainContract = async (exchange: string, variety: string, isMain: boolean) => {
        this.getDailyloading = true
        try {
            // console.log('===>>01:', exchange, isMain)
            const res = await this.api.report.getContractList({
                variety: variety,
                exchange: exchange,
                isMain: isMain
            })
            runInAction('SET_DAILY_MARKET', () => {
                this.contractList = res
                this.contractTotal = res ? res.length : 0
                // console.log('===>>02:', res, this.contractTotal)
            })
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }

    @action
    setMainContract = async (contract: string, isMain: boolean) => {
        try {
            console.log('===>>01:', contract, isMain)
            await this.api.report.setMainContract({
                contract: contract,
                isMain: isMain
            })
            this.getMainContract(this.currentExchange, this.currentVariety, isMain)
        } catch (err) {}
        runInAction('HIDE_DAILY_MARKET_LOADING', () => {
            this.getDailyloading = false
        })
    }
    @action
    changeExchange = (exchange: string) => {
        this.currentExchange = exchange
    }

    @action
    changeVariety = (variety: string) => {
        this.currentVariety = variety
    }

    @computed get varietyOptions() {
        return this.varietyList.map(x => ({ variety: x.variety, varietyCN: x.varietyCN }))
    }
    @computed get contractOptions() {
        return this.contractList.map(x => ({ variety: x.variety, varietyCN: x.varietyCN, contract: x.contract }))
    }
    @computed get getBillboardData() {
        return toJS(this.billboardList)
    }
    @computed get getBillboardPrice() {
        console.log('====>>price:', toJS(this.billboardPrice))
        return toJS(this.billboardPrice)
    }
}
export default new ReportStore()
