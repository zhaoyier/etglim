import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import styles from './index.scss'
import { toJS } from 'mobx'
import moment from 'moment'
import { Form, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

// const { Option } = Select
interface IProps extends FormComponentProps {}
// function hasErrors(fieldsError) {
//     return Object.keys(fieldsError).some(field => fieldsError[field])
// }

function SearchForm({ form }: IProps) {
    const { reportStore } = reportRootStore()

    function onChangeDate(val) {
        const date = moment(val).format('YYYYMMDD')
        console.log('====>>change date: ', date)
        reportStore.getHintList(parseInt(date))
    }

    const { getFieldDecorator, getFieldsError } = form
    return (
        <Form layout="inline">
            <Form.Item>
                {getFieldDecorator('exchange', {
                    rules: [{ required: true, message: 'Please select your variety!' }]
                })(<DatePicker onChange={onChangeDate} />)}
            </Form.Item>
        </Form>
    )
}
export default Form.create<IProps>()(SearchForm)
