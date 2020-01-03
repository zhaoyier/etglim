import React from 'react'
import Loadable from '@loadable/component'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable(loader, { fallback: <PageLoading /> })

export const asynchronousComponents = {
    SocketDebugger: loadComponent(() => import(/* webpackChunkName: "socket-debugger" */ '@views/SocketDebugger')),
    Users: loadComponent(() => import('@views/Users')),
    Daily: loadComponent(() => import('@views/Report/Daily'))
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
    }
]

export default menu
