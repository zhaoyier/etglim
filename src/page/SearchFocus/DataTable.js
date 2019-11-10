import React from 'react';
import moment from 'moment';
import { Table, Divider, Tag } from 'antd';


class DataTable extends React.Component {
  createColumns() {
    const { onCancel, onEdit } = this.props;


    const columns = [{
      title: '合约',
      width: 100,
      dataIndex: 'contract',
      key: 'contract',
      fixed: 'left'
    }, {
      title: '合约类型',
      width: 100,
      dataIndex: 'contractType',
      key: 'contractType',
      render: (text) => {
        switch (text) {
          case 1:
            return <span>农业</span>;
          case 2:
            return <span>工业</span>;
          case 3:
            return <span>金融</span>;
          case 4:
            return <span>其他</span>;
          default:
            return <span>未知</span>;
        }
      }
    }, {
      title: '严重等级',
      width: 100,
      dataIndex: 'accidentType',
      key: 'accidentType',
      render: (text) => {
        switch (text) {
          case 1:
            return <span>异常</span>;
          case 2:
            return <span>一般事件</span>;
          case 3:
            return <span>重大事件</span>;
          case 4:
            return <span>有限的事故</span>;
          case 5:
            return <span>较大的事故</span>;
          case 6:
            return <span>重大事故</span>;
          case 7:
            return <span>特大事故</span>;
          default:
            return <span>未知</span>;
        }
      }
    }, {
      title: '发展阶段',
      width: 100,
      dataIndex: 'stageType',
      key: 'stageType',
      render: (text) => {
        switch (text) {
          case 1:
            return <span>初期</span>;
          case 2:
            return <span>发展期</span>;
          case 3:
            return <span>最盛期</span>;
          case 4:
            return <span>减弱期</span>;
          case 5:
            return <span>熄灭期</span>;
          default:
            return <span>未知</span>;
        }
      }
    }, {
      title: '开始时间',
      width: 100,
      dataIndex: 'accidentStart',
      key: 'accidentStart',
      render: (text) => {
        return moment(text).format('YYYY-MM-DD');
      }
    }, {
      title: '结束时间',
      width: 100,
      dataIndex: 'accidentEnd',
      key: 'accidentEnd',
      render: (text) => {
        return moment(text).format('YYYY-MM-DD');
      }
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
      title: '备注信息',
      width: 100,
      dataIndex: 'remarks',
      key: 'remarks'
    }, {
      title: '预估价格',
      width: 100,
      dataIndex: 'predict',
      key: 'predict'
    }, {
      title: '状态',
      width: 100,
      dataIndex: 'state',
      key: 'state',
      fixed: 'right',
      render: (text) => (
        <span>
          {[text].map(tag => {
            switch (tag) {
              case 1:
                return (<Tag color={'geekblue'} key={tag}>{'开始'}</Tag>);
              case 2:
                return (<Tag color={'green'} key={tag}>{'进行中...'}</Tag>);
              case 3:
                return (<Tag color={'red'} key={tag}>{'结束'}</Tag>);
              default:
                return (<Tag color={'orange'} key={tag}>{'未知'}</Tag>);
            }
          })}
        </span>
      )
    }, {
      title: 'operation',
      dataIndex: 'operation',
      width: 160,
      fixed: 'right',
      render: (text, record) => (
        <span>
          <a onClick={() => onEdit(record.id)}>编辑 {record.name}</a>
          <Divider type="vertical" />
          <a onClick={() => onCancel(record.id)}>取消</a>
        </span>
      )
    }];

    return columns;
  }

  render() {
    const { data } = this.props;
    console.log('=====>>data:', data);
    return <Table columns={this.createColumns()} bordered dataSource={data} scroll={{ x: 1500, y: 300 }} rowKey="id" />;
  }
}

export default DataTable;
