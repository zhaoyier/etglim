import React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import moment from 'moment'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

interface IProps {
    scrollY: number
}

function DailyTable({ scrollY }: IProps) {
    const { reportStore } = reportRootStore()

    const columns = [
        { title: 'Variety', dataIndex: 'variety', key: 'variety', fixed: 'left' },
        { title: 'Date', dataIndex: 'date', key: 'date', fixed: 'left' },
        { title: 'Weekday', dataIndex: 'date', key: 'date', fixed: 'left' },
        { title: 'opening', dataIndex: 'opening', key: 'opening' },
        { title: 'highest', dataIndex: 'highest', key: 'highest' },
        { title: 'lowest', dataIndex: 'lowest', key: 'lowest' },
        { title: 'closed', dataIndex: 'closed', key: 'closed' },
        { title: 'todaySettlement', dataIndex: 'todaySettlement', key: 'todaySettlement' },
        { title: 'volume', dataIndex: 'volume', key: 'volume' },
        { title: 'emptyVolume', dataIndex: 'emptyVolume', key: 'emptyVolume' },
        { title: 'changes', dataIndex: 'changes', key: 'changes' },
        { title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (_, record) => {} }
    ]

    return (
        <React.Fragment>
            <Table
                columns={columns}
                dataSource={reportStore.marketes}
                scroll={{ x: 1300, y: 380 }}
                pagination={{ pageSize: 100 }}
            />
        </React.Fragment>
    )
}

export default observer(DailyTable)
