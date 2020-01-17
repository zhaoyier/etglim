import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import styles from './index.scss'
import { toJS } from 'mobx'
import moment from 'moment'
import { Form, Select, Icon, Input, Button, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
const { Option } = Select
const { RangePicker } = DatePicker
// interface CreateProps {}
interface IProps extends FormComponentProps {}

function SearchForm({ form }: IProps) {
    let varietyOptions = []
    let contractOptions = []
    const dateFormat = 'YYYY/MM/DD'
    const { reportStore } = reportRootStore()
    // useOnMount(reportStore.getVarietyList)

    // const [loading, setLoading] = React.useState(false)
    // function toggleLoading() {
    //     setLoading(l => !l)
    // }

    function handleSubmit(e?: React.FormEvent<any>) {
        if (e) {
            e.preventDefault()
        }
        form.validateFields(
            async (err, val): Promise<any> => {
                const start = moment(val.rangeDate[0]).unix()
                const end = moment(val.rangeDate[1]).unix()
                console.log('==>>submit:', val, start, end)
                if (!err) {
                    // toggleLoading()
                    try {
                        reportStore.getBillboard(val.contract, start, end)
                    } catch (err) {}
                    // toggleLoading()
                }
            }
        )
    }
    function handleChangeVariety(value) {
        reportStore.getContract(reportStore.currentExchange, value)
    }
    // function handleChangeContract(value) {
    //     reportStore.getDaily(value)
    // }
    function handleChangeExchange(value) {
        //查询品种
        reportStore.changeExchange(value)
        reportStore.getVarietyList(value)
    }

    // function handleSelectExchange() {

    // }

    function handleSelectVariety() {
        reportStore.varietyList.map((item, index) =>
            varietyOptions.push(
                <Option key={index} value={item.variety}>
                    {item.varietyCN}
                </Option>
            )
        )
        varietyOptions = []
    }

    function handleSelectContract() {
        reportStore.contractOptions.map((item, index) =>
            contractOptions.push(
                <Option key={index} value={item.contract}>
                    {item.contract}
                </Option>
            )
        )
        contractOptions = []
    }

    const { getFieldDecorator, getFieldsError } = form
    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator('exchange', {
                    rules: [{ required: true, message: 'Please select your variety!' }]
                })(
                    <Select
                        style={{ width: 120 }}
                        placeholder="Select a option and change input text above"
                        onChange={handleChangeExchange}
                    >
                        <Option key={1} value="zhengzhou">
                            zhengzhou
                        </Option>
                        <Option key={2} value="dalian">
                            dalian
                        </Option>
                        <Option key={3} value="shanghai">
                            shanghai
                        </Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('variety', {
                    rules: [{ required: true, message: 'Please select your variety!' }]
                })(
                    <Select
                        style={{ width: 120 }}
                        placeholder="Select a option and change input text above"
                        onChange={handleChangeVariety}
                        onMouseEnter={handleSelectVariety}
                    >
                        {varietyOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="">
                {getFieldDecorator('contract', {
                    rules: [{ required: true, message: 'Please select your contract!' }]
                })(
                    <Select
                        style={{ width: 120 }}
                        placeholder="Select a option and change input text above"
                        onMouseEnter={handleSelectContract}
                    >
                        {contractOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('rangeDate', {
                    rules: [{ type: 'array', required: true, message: 'Please select time!' }]
                })(<RangePicker format={dateFormat} />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Search
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Form.create<IProps>()(SearchForm)
