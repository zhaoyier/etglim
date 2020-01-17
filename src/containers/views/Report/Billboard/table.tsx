import React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import moment from 'moment'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from 'bizcharts'
import DataSet from '@antv/data-set'

interface IProps {
    scrollY: number
}

function BillboardTable({ scrollY }: IProps) {
    const { reportStore } = reportRootStore()

    const dv = new DataSet.View().source(reportStore.getBillboardData)
    dv.transform({
        type: 'fold',
        fields: ['long', 'short'],
        key: 'type',
        value: 'value'
    })
    const scale = {
        value: {
            alias: 'The Share Price in Dollars',
            formatter: function(val) {
                return val
            }
        },
        date: {
            range: [0, 1]
        }
    }

    const data = [
        {
            year: '1991',
            value: 3
        },
        {
            year: '1992',
            value: 4
        },
        {
            year: '1993',
            value: 3.5
        },
        {
            year: '1994',
            value: 5
        },
        {
            year: '1995',
            value: 4.9
        },
        {
            year: '1996',
            value: 6
        },
        {
            year: '1997',
            value: 7
        },
        {
            year: '1998',
            value: 9
        },
        {
            year: '1999',
            value: 13
        }
    ]

    const cols = {
        value: {
            min: 0
        },
        year: {
            range: [0, 1]
        }
    }

    return (
        <div>
            <Chart height={250} data={dv} padding={'auto'} scale={scale} forceFit>
                <Tooltip crosshairs />
                <Axis />
                <Legend />
                <Geom type="area" position="date*value" color="type" shape="smooth" />
                <Geom type="line" position="date*value" color="type" shape="smooth" size={2} />
            </Chart>
            <Divider></Divider>
            <Chart height={250} data={reportStore.getBillboardPrice} scale={cols} forceFit>
                <Axis name="date" />
                <Axis name="price" />
                <Tooltip
                    crosshairs={{
                        type: 'y'
                    }}
                />
                <Geom type="line" position="date*price" size={2} />
                <Geom
                    type="point"
                    position="date*price"
                    size={4}
                    shape={'circle'}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1
                    }}
                />
            </Chart>
        </div>
    )
}

export default observer(BillboardTable)
