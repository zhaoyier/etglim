import React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

interface IProps {
    scrollY: number
}

function DailyTable({ scrollY }: IProps) {
    const { reportStore } = reportRootStore()

    // useOnMount(reportStore.getDaily)
    console.log('==>>0323:', reportStore.marketes)

    return (
        <React.Fragment>
            <Table<IUserStore.IUser>
                className="center-table"
                style={{ width: '100%' }}
                bordered
                rowKey="_id"
                loading={reportStore.getDailyloading}
                dataSource={reportStore.marketes}
                scroll={{ y: scrollY }}
                pagination={{
                    current: reportStore.pageIndex,
                    showSizeChanger: true,
                    pageSize: reportStore.pageSize,
                    pageSizeOptions: ['30', '20', '10'],
                    total: reportStore.total
                }}
            >
                <Table.Column<IReportStore.IDaily>
                    key="variety"
                    title="Variety"
                    dataIndex="variety"
                    width={200}
                    fixed="left"
                />
                <Table.Column<IReportStore.IDaily>
                    key="lastSettlement"
                    title="LastSettlement"
                    dataIndex="lastSettlement"
                    width={200}
                />
                <Table.Column<IReportStore.IDaily> key="opening" title="Opening" dataIndex="opening" width={200} />
                <Table.Column<IReportStore.IDaily> key="highest" title="Highest" dataIndex="highest" width={200} />
                <Table.Column<IReportStore.IDaily> key="lowest" title="Lowest" dataIndex="lowest" width={200} />
                <Table.Column<IReportStore.IDaily> key="closed" title="Closed" dataIndex="closed" width={200} />
                <Table.Column<IReportStore.IDaily>
                    key="todaySettlement"
                    title="TodaySettlement"
                    dataIndex="todaySettlement"
                    width={200}
                />
                <Table.Column<IReportStore.IDaily>
                    key="changeOne"
                    title="ChangeOne"
                    dataIndex="changeOne"
                    width={200}
                />
            </Table>
        </React.Fragment>
    )
}

export default observer(DailyTable)
