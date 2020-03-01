import { observable, action, runInAction } from 'mobx'
import { PaginationConfig } from 'antd/lib/pagination'

import { StoreExt } from '@utils/reactExt'

export class PositionStore extends StoreExt {
    /**
     * 加载用户列表时的loading
     *
     * @memberof UserStore
     */
    @observable
    getPositionloading = false
    @observable
    newPositionVisible = false
    /**
     * 用户列表
     *
     * @type {IPositionStore.IPosition[]}
     * @memberof PositionStore
     */
    @observable
    positions: IPositionStore.IPosition[] = []
    /**
     * users total
     *
     * @memberof PositionStore
     */
    @observable
    total = 0
    /**
     * 加载头寸列表
     *
     * @memberof PositionStore
     */
    @action
    getPosition = async () => {
        this.getPositionloading = true
        try {
            const res = await this.api.position.getPosition({ pageIndex: 0, pageSize: 10 })
            runInAction('SET_POSITION_LIST', () => {
                this.positions = res.positions
                this.total = res.total
            })
        } catch (err) {}
        runInAction('SET_POSITION_LIST', () => {
            console.log('=====>>1111:')
            this.getPositionloading = false
        })
    }
    @action
    getInitPosition = async () => {
        this.getPositionloading = true
        try {
            const res = await this.api.position.getPosition({ pageIndex: 0, pageSize: 10 })
            runInAction('INIT_POSITION_LIST', () => {
                this.positions = res.positions
                this.total = res.total
            })
        } catch (err) {}
        runInAction('INIT_POSITION_LIST', () => {
            console.log('=====>>1112:')
            this.getPositionloading = false
        })
    }
    @action
    setVisible = () => {
        console.log('===>>change visible:', this.newPositionVisible)
        this.newPositionVisible = !this.newPositionVisible
    }
}

export default new PositionStore()
