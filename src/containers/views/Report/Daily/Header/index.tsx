import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import styles from './index.scss'
import { toJS } from 'mobx'
import { Form, Select, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import reportRootStore from '@store/reportStore/rootStore'
import { useOnMount } from '@utils/hooks'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
const { Option } = Select
// interface CreateProps {}
interface IProps extends FormComponentProps {}

function SearchForm({ form }: IProps) {
    let varietyOptions = []
    let contractOptions = []
    const { reportStore } = reportRootStore()
    useOnMount(reportStore.getVarietyList)

    const [loading, setLoading] = React.useState(false)
    function toggleLoading() {
        setLoading(l => !l)
    }

    function handleSubmit(e?: React.FormEvent<any>) {
        if (e) {
            e.preventDefault()
        }
        form.validateFields(
            async (err, values): Promise<any> => {
                console.log('==>>submit:', values)
                if (!err) {
                    toggleLoading()
                    try {
                        reportStore.getDaily(values.contract)
                    } catch (err) {}
                    toggleLoading()
                }
            }
        )
    }
    function handleChangeVariety(value) {
        console.log(value)
        // reportStore.changeVariety(value)
        reportStore.getContract(value)
        // 查询合约
    }
    function handleChangeContract(value) {
        console.log(value)
        // reportStore.changeContract(value)
    }

    function handleSelectVariety(value) {
        console.log('on select:', reportStore.varietyOptions)
        reportStore.varietyOptions.map((item, index) =>
            varietyOptions.push(
                <Option key={index} value={item.variety}>
                    {item.varietyCN}
                </Option>
            )
        )
        varietyOptions = []
    }

    function handleSelectContract() {
        console.log('on select contract:', reportStore.contractOptions)
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
    // console.log('===>>031:', toJS(reportStore.varietyList))
    return (
        <Form layout="inline" onSubmit={handleSubmit}>
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
            <Form.Item label="合约">
                {getFieldDecorator('contract', {
                    rules: [{ required: true, message: 'Please select your contract!' }]
                })(
                    <Select
                        style={{ width: 120 }}
                        placeholder="Select a option and change input text above"
                        onChange={handleChangeContract}
                        onMouseEnter={handleSelectContract}
                    >
                        {contractOptions}
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

// class HorizontalLoginForm extends React.Component {
//     // componentDidMount() {
//     //     // To disable submit button at the beginning.
//     //     this.props.form.validateFields()
//     // }

//     handleSubmit = e => {
//         e.preventDefault()
//         this.props.form.validateFields((err, values) => {
//             console.log('===>>param:', err, values)
//             if (!err) {
//                 console.log('Received values of form: ', values)
//             }
//         })
//     }

//     handleSelectVariety = value => {
//         console.log(value)
//     }

//     handleSelectContract = value => {
//         console.log(value)
//     }

//     render() {
//         const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

//         return (
//             <div className={styles.header}>
//                 <Form layout="inline" onSubmit={this.handleSubmit}>
//                     <Form.Item>
//                         {getFieldDecorator('variety', {
//                             rules: [{ required: true, message: 'Please select your variety!' }]
//                         })(
//                             <Select
//                                 style={{ width: 120 }}
//                                 placeholder="Select a option and change input text above"
//                                 onChange={this.handleSelectVariety}
//                             >
//                                 <Option value="male">male</Option>
//                                 <Option value="female">female</Option>
//                             </Select>
//                         )}
//                     </Form.Item>
//                     <Form.Item>
//                         {getFieldDecorator('contract', {
//                             rules: [{ required: true, message: 'Please select your contract!' }]
//                         })(
//                             <Select
//                                 style={{ width: 120 }}
//                                 placeholder="Select a option and change input text above"
//                                 onChange={this.handleSelectVariety}
//                             >
//                                 <Option value="male">male</Option>
//                                 <Option value="female">female</Option>
//                             </Select>
//                         )}
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
//                             Log in
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         )
//     }
// }

// const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm)
export default Form.create<IProps>()(SearchForm)
