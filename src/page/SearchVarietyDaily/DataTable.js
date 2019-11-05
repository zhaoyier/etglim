import React from 'react';
import { Table } from 'antd';

class DataTable extends React.Component {
  createColumns() {
    const columns = [{
      title: '品种',
      dataIndex: 'variety',
      key: 'variety'
    }, {
      title: '昨结算',
      dataIndex: 'lastSettlement',
      key: 'lastSettlement'
    }, {
      title: '今开盘',
      dataIndex: 'opening',
      key: 'opening'
    }, {
      title: '最高价',
      dataIndex: 'highest',
      key: 'highest'
    }, {
      title: '最低价',
      dataIndex: 'lowest',
      key: 'lowest'
    }, {
      title: '今收盘',
      dataIndex: 'closed',
      key: 'closed'
    }, {
      title: '今结算',
      dataIndex: 'todaySettlement',
      key: 'todaySettlement'
    }, {
      title: '涨跌1',
      dataIndex: 'changeOne',
      key: 'changeOne'
    }, {
      title: '涨跌2',
      dataIndex: 'changeTwo',
      key: 'changeTwo'
    }, {
      title: '成交量',
      dataIndex: 'volume',
      key: 'volume'
    }, {
      title: '空盘量',
      dataIndex: 'emptyVolume',
      key: 'emptyVolume'
    }, {
      title: '增减量',
      dataIndex: 'changes',
      key: 'changes'
    }, {
      title: '成交额',
      dataIndex: 'turnover',
      key: 'turnover'
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    }];

    return columns;
  }

  render() {
    const { data } = this.props;

    return <Table columns={this.createColumns()} bordered dataSource={data} scroll={{ y: 480 }} rowKey="id" />;
  }
}

export default DataTable;
