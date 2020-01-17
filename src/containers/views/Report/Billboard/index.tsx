import React from 'react'

import { Divider } from 'antd'
import styles from './index.scss'
import AutoSizer from '@components/AutoSizer'
import BillboardTable from './table'
import SearchForm from './header'
// import ContractDaily from '@components/Report/Contract'

export default function Report() {
    return (
        <div className={styles.container}>
            <SearchForm />
            <Divider></Divider>
            <AutoSizer className={styles.tableBox}>
                {({ height }) => <BillboardTable scrollY={height - 120} />}
            </AutoSizer>
        </div>
    )
}
