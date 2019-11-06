import React from 'react';
import { Table } from 'antd';

class DataTable extends React.Component {
  createColumns() {
    const columns = [{
      title: '品种',
      width: 100,
      dataIndex: 'variety',
      key: 'variety',
      fixed: 'left'
    }, {
      title: '昨结算',
      width: 100,
      dataIndex: 'lastSettlement',
      key: 'lastSettlement',
      fixed: 'left'
    }, {
      title: '今开盘',
      width: 100,
      dataIndex: 'opening',
      key: 'opening'
    }, {
      title: '最高价',
      width: 100,
      dataIndex: 'highest',
      key: 'highest'
    }, {
      title: '最低价',
      width: 100,
      dataIndex: 'lowest',
      key: 'lowest'
    }, {
      title: '今收盘',
      width: 100,
      dataIndex: 'closed',
      key: 'closed'
    }, {
      title: '今结算',
      width: 100,
      dataIndex: 'todaySettlement',
      key: 'todaySettlement'
    }, {
      title: '涨跌1',
      width: 100,
      dataIndex: 'changeOne',
      key: 'changeOne'
    }, {
      title: '涨跌2',
      width: 100,
      dataIndex: 'changeTwo',
      key: 'changeTwo'
    }, {
      title: '成交量',
      width: 100,
      dataIndex: 'volume',
      key: 'volume'
    }, {
      title: '空盘量',
      width: 100,
      dataIndex: 'emptyVolume',
      key: 'emptyVolume'
    }, {
      title: '增减量',
      width: 100,
      dataIndex: 'changes',
      key: 'changes'
    }, {
      title: '成交额',
      width: 100,
      dataIndex: 'turnover',
      key: 'turnover',
      fixed: 'right'
    }, {
      title: '日期',
      width: 100,
      dataIndex: 'date',
      key: 'date',
      fixed: 'right'

    }];

    return columns;
  }

  render() {
    const { data } = this.props;

    return <Table columns={this.createColumns()} bordered dataSource={data} scroll={{ y: 480 }} rowKey="id" />;
  }
}

export default DataTable;
