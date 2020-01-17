import React from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Icon } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import { Link } from 'react-router-dom'

import styles from './index.scss'
import { RootConsumer } from '@shared/App/Provider'
import { arrayToTree, queryArray } from '@utils/index'
import menu, { IMenu, IMenuInTree } from './../menu'

const { SubMenu } = Menu

interface IProps {
    sideBarCollapsed: boolean
    sideBarTheme: IGlobalStore.SideBarTheme
    navOpenKeys: string[]
    setOpenKeys: (openKeys: string[]) => void
    userInfo: IAuthStore.UserInfo
    routerStore: RouterStore
}

@observer
class SiderMenu extends React.Component<IProps> {
    // 打开的菜单层级记录
    private levelMap: NumberObject = {}

    @computed
    get currentRoute() {
        return this.props.routerStore.location.pathname
    }

    @computed
    get menuTree() {
        return arrayToTree<IMenuInTree>(menu, 'id', 'pid')
    }

    @computed
    get menuProps() {
        const { sideBarCollapsed, navOpenKeys } = this.props
        return !sideBarCollapsed
            ? {
                  onOpenChange: this.onOpenChange,
                  openKeys: navOpenKeys
              }
            : {}
    }

    goto = ({ key }: { key: string }) => {
        const { history } = this.props.routerStore
        const selectedMenu = menu.find(item => String(item.id) === key)
        if (selectedMenu && selectedMenu.path && selectedMenu.path !== this.currentRoute) {
            history.push(selectedMenu.path)
        }
    }

    onOpenChange = (openKeys: string[]): void => {
        const { navOpenKeys, setOpenKeys } = this.props
        const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
        const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        setOpenKeys(nextOpenKeys)
    }

    getPathArray = (array: IMenu[], current: IMenu): string[] => {
        const result = [String(current.id)]
        const getPath = (item: IMenu): void => {
            if (item && item.pid) {
                result.unshift(String(item.pid))
                getPath(queryArray(array, String(item.pid), 'id'))
            }
        }
        getPath(current)
        return result
    }

    // 保持选中
    getAncestorKeys = (key: string): string[] => {
        const map = {}
        const getParent = index => {
            const result = [String(this.levelMap[index])]
            if (this.levelMap[result[0]]) {
                result.unshift(getParent(result[0])[0])
            }
            return result
        }
        for (const index in this.levelMap) {
            if ({}.hasOwnProperty.call(this.levelMap, index)) {
                map[index] = getParent(index)
            }
        }
        return map[key] || []
    }

    render() {
        this.levelMap = {}
        const { sideBarTheme } = this.props
        // 寻找选中路由
        let currentMenu: IMenu = null
        for (const item of menu) {
            if (item.path && pathToRegexp(item.path).exec(this.currentRoute)) {
                currentMenu = item
                break
            }
        }
        let selectedKeys: string[] = null
        if (currentMenu) {
            selectedKeys = this.getPathArray(menu, currentMenu)
        }
        if (!selectedKeys) {
            selectedKeys = ['1']
        }
        return (
            <Menu
                className={styles.menu}
                theme={sideBarTheme}
                mode="inline"
                selectedKeys={selectedKeys}
                onClick={this.goto}
                {...this.menuProps}
            >
                <Menu.Item key="">
                    <Link to={'/'}>
                        <Icon type="coffee" />
                        <span>首页</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/users">
                    <Link to={'/users'}>
                        <Icon type="coffee" />
                        <span>用户</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="/report"
                    title={
                        <span>
                            <Icon type="calendar" />
                            <span className="nav-text">报表</span>
                        </span>
                    }
                >
                    <Menu.Item key="/report/daily">
                        <Link to={'/report/daily'}>
                            <Icon type="fire" />
                            每日数据
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/report/line">
                        <Link to={'/report/line'}>
                            <Icon type="fire" />
                            数据折现
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/report/main">
                        <Link to={'/report/main'}>
                            <Icon type="fire" />
                            主力合约
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/report/billboard">
                        <Link to={'/report/billboard'}>
                            <Icon type="fire" />
                            趋势图
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="/accident"
                    title={
                        <span>
                            <Icon type="calendar" />
                            <span className="nav-text">事故</span>
                        </span>
                    }
                >
                    <Menu.Item key="/accident/daily">
                        <Link to={'/accident/daily'}>
                            <Icon type="fire" />
                            每日数据
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/accident/line">
                        <Link to={'/accident/line'}>
                            <Icon type="fire" />
                            数据折现
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

function Wrapper() {
    return (
        <RootConsumer>
            {({ routerStore, authStore, globalStore }) => (
                <SiderMenu
                    routerStore={routerStore}
                    userInfo={authStore.userInfo}
                    sideBarCollapsed={globalStore.sideBarCollapsed}
                    sideBarTheme={globalStore.sideBarTheme}
                    navOpenKeys={globalStore.navOpenKeys}
                    setOpenKeys={globalStore.setOpenKeys}
                />
            )}
        </RootConsumer>
    )
}

export default Wrapper
