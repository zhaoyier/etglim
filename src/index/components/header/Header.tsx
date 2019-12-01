import React, {Component} from "react";
import {Icon, Layout, Menu} from "antd";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import AppStore from "../stores/AppStore";
import {inject, observer} from "mobx-react";
import './index.css';

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

interface EmptyProps extends RouteComponentProps {

}

interface HeaderInjectedProps extends EmptyProps {
    location: any
    store: AppStore
}

@inject("store")
@observer
class HeaderComponent extends Component<EmptyProps, {}> {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    get injected() {
        return this.props as HeaderInjectedProps;
    }
    
    render() {
        const {store} = this.injected;

        let selectMenu = window.location.hash.split("/")[1]
            ? window.location.hash.split("/")[1]
            : "aaa";

        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>



                
            </Layout>
        );
    }
}


export default withRouter(HeaderComponent);
