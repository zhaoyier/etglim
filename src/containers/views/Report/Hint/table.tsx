import React from 'react'
import { Table, Divider, Switch } from 'antd'
import { observer } from 'mobx-react'
// import moment from 'moment'
import styles from './index.scss'
import reportRootStore from '@store/reportStore/rootStore'
// import { useOnMount } from '@utils/hooks'
import { useOnMount } from '@utils/hooks'

interface IProps {
    scrollY: number
}

function HintTable({ scrollY }: IProps) {
    const { reportStore } = reportRootStore()

    function handleChangeExchange(value) {
        console.log('===>>11:', value.contract, value.isMain)
        reportStore.setMainContract(value.contract, value.isMain)
    }
    const columns = [
        { title: 'contract', dataIndex: 'contract', key: 'contract' },
        { title: 'closed', dataIndex: 'closed', key: 'closed' },
        {
            title: 'maxD',
            dataIndex: 'maxDiff',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.maxDiff - b.maxDiff
        },
        {
            title: 'maxR',
            dataIndex: 'maxRate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.maxRate - b.maxRate
        },
        { title: 'dayD', dataIndex: 'dayDiff', defaultSortOrder: 'descend', sorter: (a, b) => a.dayDiff - b.dayDiff },
        { title: 'dayR', dataIndex: 'dayRate', defaultSortOrder: 'descend', sorter: (a, b) => a.dayRate - b.dayRate },
        {
            title: 'weekD',
            dataIndex: 'weekDiff',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.weekDiff - b.weekDiff
        },
        {
            title: 'weekR',
            dataIndex: 'weekRate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.weekRate - b.weekRate
        },
        {
            title: 'monthD',
            dataIndex: 'monthDiff',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.monthDiff - b.monthDiff
        },
        {
            title: 'monthR',
            dataIndex: 'monthRate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.monthRate - b.monthRate
        }
    ]

    return (
        <React.Fragment>
            <Table
                columns={columns}
                dataSource={reportStore.hintList}
                scroll={{ x: 1300, y: 380 }}
                pagination={{ pageSize: 100 }}
            />
        </React.Fragment>
    )
}

export default observer(HintTable)
