import http from '@services/http'

export default {
    getPosition(data: object): Promise<any> {
        return http.post('position/list', data || {})
    }
}
