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
        { title: 'Date', dataIndex: 'date', key: 'date', fixed: 'left' },
        { title: 'Weekday', dataIndex: 'weekday', key: 'weekday', fixed: 'left' },
        { title: 'opening', dataIndex: 'opening', key: 'opening' },
        { title: 'highest', dataIndex: 'highest', key: 'highest' },
        { title: 'lowest', dataIndex: 'lowest', key: 'lowest' },
        { title: 'closed', dataIndex: 'closed', key: 'closed' },
        { title: 'volume', dataIndex: 'volume', key: 'volume' },
        { title: 'emptyVolume', dataIndex: 'emptyVolume', key: 'emptyVolume' },
        { title: 'changes', dataIndex: 'changes', key: 'changes' },
        { title: 'todaySettlement', dataIndex: 'todaySettlement', key: 'todaySettlement' }
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
