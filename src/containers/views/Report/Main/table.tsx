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

function MainTable({ scrollY }: IProps) {
    const { reportStore } = reportRootStore()

    function handleChangeExchange(value) {
        console.log('===>>11:', value.contract, value.isMain)
        reportStore.setMainContract(value.contract, value.isMain)
    }

    return (
        <React.Fragment>
            <Table<IReportStore.IContract>
                className="center-table"
                style={{ width: '100%' }}
                bordered
                rowKey="contract"
                dataSource={reportStore.contractList}
                scroll={{ y: scrollY }}
                pagination={{ pageSize: 100 }}
            >
                <Table.Column<IReportStore.IContract>
                    key="contract"
                    title="Contract"
                    dataIndex="contract"
                    width={200}
                />
                <Table.Column<IReportStore.IContract>
                    key="varietyCN"
                    title="VarietyCN"
                    dataIndex="varietyCN"
                    width={100}
                />
                <Table.Column<IReportStore.IContract>
                    key="exchange"
                    title="Exchange"
                    dataIndex="exchange"
                    width={200}
                />
                <Table.Column<IReportStore.IContract>
                    key="isMain"
                    title="IsMain"
                    width={120}
                    render={(_, record) => (
                        <span>
                            <Switch
                                checkedChildren="开"
                                unCheckedChildren="关"
                                checked={record.isMain}
                                onChange={() => handleChangeExchange(record)}
                            />
                        </span>
                    )}
                />
            </Table>
        </React.Fragment>
    )
}

export default observer(MainTable)
