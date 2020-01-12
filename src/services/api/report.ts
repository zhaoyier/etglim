import http from '@services/http'

export default {
    getDaily(data: object): Promise<any> {
        return http.post('report/daily', data || {})
    },
    getVarietyList(data: object): Promise<any> {
        return http.post('variety/list', data || {})
    },
    getContractList(data: object): Promise<any> {
        return http.post('contract/list', data || {})
    }
}