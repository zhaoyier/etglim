import { ReportStore as ReportStoreModel } from './index'

export as namespace IReportStore

export interface ReportStore extends ReportStoreModel {}

export interface IDaily {
    _id?: string
    account: string
    password?: string
    category?: string
    createdAt?: string
}

export interface IVariety {
    variety: string
    varietyCN: string
}

export interface IContract {
    variety: string
    varietyCN: string
    contract: string
}
