import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import styles from './index.scss'
import { toJS } from 'mobx'
import { Form, Select, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

const { Option } = Select
interface IProps extends FormComponentProps {}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

function SearchForm({ form }: IProps) {
    let varietyOptions = []
    const { reportStore } = reportRootStore()
    // useOnMount(reportStore.getVarietyList)

    // function handleChangeExchange(value) {
    //     reportStore.changeExchange(value)
    // }
    function handleChangeExchange(value) {
        //查询品种
        reportStore.changeExchange(value)
        reportStore.getVarietyList(value)
    }
    function handleChangeVariety(value) {
        reportStore.changeVariety(value)
    }
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
    function handleSubmit(e?: React.FormEvent<any>) {
        if (e) {
            e.preventDefault()
        }
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    try {
                        // console.log('====>>0099:', values)
                        const isMain = values.isMain === 'true' ? true : false
                        reportStore.getMainContract(values.exchange, values.variety, isMain)
                    } catch (err) {}
                }
            }
        )
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
            <Form.Item>
                {getFieldDecorator('isMain', {
                    initialValue: 'all',
                    rules: [{ required: true, message: 'Please select your variety!' }]
                })(
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        placeholder="Select a option and change input text above"
                        onChange={null}
                    >
                        <Option key={1} value="all">
                            all
                        </Option>
                        <Option key={2} value="true">
                            true
                        </Option>
                    </Select>
                )}
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
