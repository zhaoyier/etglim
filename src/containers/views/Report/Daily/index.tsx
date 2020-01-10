import React from 'react'

import { Divider } from 'antd'
import styles from './index.scss'
import AutoSizer from '@components/AutoSizer'
import DailyTable from './DailyTable'
import SearchForm from './Header'
// import ContractDaily from '@components/Report/Contract'

export default function Report() {
    return (
        <div className={styles.container}>
            <SearchForm />
            <Divider></Divider>
            <AutoSizer className={styles.tableBox}>{({ height }) => <DailyTable scrollY={height - 120} />}</AutoSizer>
        </div>
    )
}
