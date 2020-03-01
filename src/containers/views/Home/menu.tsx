import React from 'react'
import Loadable from '@loadable/component'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable(loader, { fallback: <PageLoading /> })

export const asynchronousComponents = {
    SocketDebugger: loadComponent(() => import(/* webpackChunkName: "socket-debugger" */ '@views/SocketDebugger')),
    Users: loadComponent(() => import('@views/Users')),
    Daily: loadComponent(() => import('@views/Report/Daily')),
    Line: loadComponent(() => import('@views/Report/Line')),
    Main: loadComponent(() => import('@views/Report/Main')),
    Billboard: loadComponent(() => import('@views/Report/Billboard')),
    Position: loadComponent(() => import('@views/Report/Position')),
    Hint: loadComponent(() => import('@views/Report/Hint'))
}

// all routers key
export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: string
    component?: AsynchronousComponentKeys
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}

export const menu: IMenu[] = [
    {
        id: 1,
        path: '/',
        title: 'SocketDebugger',
        icon: 'coffee',
        component: 'SocketDebugger',
        exact: true
    },
    {
        id: 2,
        path: '/users',
        title: 'Users',
        icon: 'user',
        component: 'Users',
        exact: true
    },
    {
        id: 4,
        path: '/report/daily',
        title: '每日报表',
        icon: 'fire',
        component: 'Daily',
        exact: true
    },
    {
        id: 5,
        path: '/report/line',
        title: '每日折线',
        icon: 'fire',
        component: 'Line',
        exact: true
    },
    {
        id: 6,
        path: '/report/billboard',
        title: '龙虎榜',
        icon: 'fire',
        component: 'Billboard',
        exact: true
    },
    {
        id: 7,
        path: '/report/main',
        title: '主力合约',
        icon: 'fire',
        component: 'Main',
        exact: true
    },
    {
        id: 8,
        path: '/users/position',
        title: '头寸列表',
        icon: 'fire',
        component: 'Position',
        exact: true
    },
    {
        id: 8,
        path: '/report/hint',
        title: '合约提示',
        icon: 'fire',
        component: 'Hint',
        exact: true
    }
]

export default menu
