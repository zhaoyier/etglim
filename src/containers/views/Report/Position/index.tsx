import React from 'react'

import { Divider } from 'antd'
import styles from './index.scss'
import AutoSizer from '@components/AutoSizer'
import PositionList from './list'
import SearchForm from './header'
// import ContractDaily from '@components/Report/Contract'

export default function Position() {
    return (
        <div className={styles.container}>
            <SearchForm />
            <Divider></Divider>
            <AutoSizer className={styles.tableBox}>{({ height }) => <PositionList scrollY={height - 120} />}</AutoSizer>
        </div>
    )
}
