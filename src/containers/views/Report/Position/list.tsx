import React from 'react'
// import { Table, Divider, Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import moment from 'moment'
import positionRootStore from '@store/positionStore/rootStore'
import { useOnMount } from '@utils/hooks'
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from 'bizcharts'
import DataSet from '@antv/data-set'

import { List, Avatar, Button, Skeleton } from 'antd'

interface IProps {
    scrollY: number
}

function PositionList({ scrollY }: IProps) {
    const { positionStore } = positionRootStore()

    useOnMount(positionStore.getInitPosition)

    // const data = [
    //     {
    //         title: 'Ant Design Title 1'
    //     },
    //     {
    //         title: 'Ant Design Title 2'
    //     },
    //     {
    //         title: 'Ant Design Title 3'
    //     },
    //     {
    //         title: 'Ant Design Title 4'
    //     }
    // ]

    return (
        <List
            itemLayout="horizontal"
            loading={positionStore.getPositionloading}
            dataSource={positionStore.positions}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    )
}

export default observer(PositionList)
