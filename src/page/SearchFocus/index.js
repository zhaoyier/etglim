import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cssModules from 'react-css-modules';
import { Spin, Card, Divider } from 'antd';
// import { PageHeader } from 'ant-design-pro';
import FilterForm from './FilterForm';
import DataTable from './DataTable';
import EditModal from './EditModal';
import NewModal from './NewModal';

import styles from './style.less';
import { string } from 'prop-types';

@inject('getFucusStore')
@observer
@cssModules(styles)
class SearchList extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.getFucusStore;
  }

  state = {
    // visible: false
    newVisible: false,
    editVisible: false,
    editFocusId: ""
  };

  async componentWillMount() {
    const { location, match, history } = this.props;

    await this.store.onWillMount(location, match, history);

    window.dplus.track('page_load', {
      name: '列表页',
      url: this.props.location.pathname
    });
  }

  handleNewDisplay = () => {
    this.setState({
      newVisible: !this.state.newVisible
    });
  }

  handleEditDisplay = () => {
    this.setState({
      editVisible: !this.state.editVisible
    });
  }

  handleEdit = (e) => {
    this.setState({
      editVisible: !this.state.editVisible
    });
    const { setFocusId } = this.store;
    typeof setFocusId === 'function' && setFocusId(e);
  }

  // handleCancel = (e) => {
  //   console.log('====>>cancel', e);
  //   const { setFocusId } = this.store;
  //   typeof setFocusId === 'function' && setFocusId('');
  // }

  render() {
    const { focusId } = this.store;
    const { newVisible, editVisible } = this.state;


    const { loading, search, create, update, cancel, focusList, stateOptions } = this.store;
    console.log('===>>state display:', focusList);
    return (
      <div>
        <Spin spinning={loading}>
          <Card>
            <FilterForm stateOptions={stateOptions} onSubmit={search} onDisplay={this.handleNewDisplay} />
            <Divider />
            <DataTable data={focusList} onCancel={cancel} onEdit={this.handleEdit} />
            <NewModal onDisplay={this.handleNewDisplay} onSubmit={create} visible={newVisible} />
            <EditModal focusId={focusId} onDisplay={this.handleEditDisplay} onSubmit={update} visible={editVisible} />
          </Card>
        </Spin>
      </div>
    );
  }
}

export default SearchList;
