import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

// import style from './style.less';

@withRouter
class SiderMenu extends Component {
  handleMenuClick = ({ key }) => {
    const { history } = this.props;

    if (key === '/project') {
      history.push(key);
    }
  }

  render() {
    const { collapsed, location } = this.props;

    return (
      <Menu
        defaultSelectedKeys={['/project']}
        selectedKeys={[location.pathname]}
        // defaultOpenKeys={['exchangemgr']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="/project">
          <Icon type="pie-chart" />
          {/* <Link to="/project">首页</Link> */}
          <span>首页</span>
        </Menu.Item>
        <SubMenu key="list" title={<span><Icon type="mail" /><span>列表页</span></span>}>
          <Menu.Item key="/project/list/search"><Link to="/project/list/search">查询列表</Link></Menu.Item>
        </SubMenu>
        {/*
          <Menu.Item key="/project/mediamgr/createmp">
            <Link to="/project/mediamgr/createmp">创建小程序</Link>
          </Menu.Item>
          <Menu.Item key="/project/mediamgr/createadp">
            <Link to="/project/mediamgr/createadp">创建广告位</Link>
          </Menu.Item>
          <Menu.Item key="financialmgr">
          <Link to="/project/financialmgr"><Icon type="pie-chart" />财务管理</Link>
          </Menu.Item>
          */}
        <SubMenu key="usercenter" title={<span><Icon type="user" /><span>个人中心</span></span>}>
          <Menu.Item key="/project/usercenter/account"><Link to="/project/usercenter/account">修改密码</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SiderMenu;
