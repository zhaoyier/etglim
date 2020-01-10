import http from '@services/http'

export default {
    login(data: object): Promise<any> {
        console.log('==>>001:', data)
        return http.post('auth/login', data || {})
    }
}
