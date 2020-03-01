import { PositionStore as PositionStoreModel } from './index'

export as namespace IPositionStore

export interface PositionStore extends PositionStoreModel {}

export interface IPosition {
    _id?: string
    account: string
    password?: string
    category?: string
    createdAt?: string
}
