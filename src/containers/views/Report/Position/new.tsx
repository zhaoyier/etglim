import React from 'react'
import { observer } from 'mobx-react'
import { Modal, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import positionRootStore from '@store/positionStore/rootStore'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
    }
}

// const positionStatus = ['start', 'underway', 'finish']
const positionStatus = [
    { key: 1, value: 'start' },
    { key: 2, value: 'underway' },
    { key: 3, value: 'finish' }
]

interface IProps extends FormComponentProps {
    // visible: boolean
    // onCancel: () => void
    user?: IUserStore.IUser
}

function PositionModal({ user, form }: IProps) {
    console.log('====>>modal 01:', 'visible')
    const { positionStore } = positionRootStore()

    const [loading, setLoading] = React.useState(false)

    // const typeIsAdd = user === undefined

    function toggleLoading() {
        setLoading(l => !l)
    }

    function submit(e?: React.FormEvent<any>) {
        if (e) {
            e.preventDefault()
        }
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    toggleLoading()
                    try {
                        console.log('====>>>new: ', values)
                        // if (typeIsAdd) {
                        //     await userStore.createUser(values)
                        //     userStore.changePageIndex(1)
                        // } else {
                        //     await userStore.modifyUser({ ...values, _id: user._id })
                        //     userStore.getUsers()
                        // }
                        // onCancel()
                        positionStore.setVisible()
                    } catch (err) {}
                    toggleLoading()
                }
            }
        )
    }

    function onCancel() {
        positionStore.setVisible()
    }

    const { getFieldDecorator } = form
    return (
        <Modal
            title={'新头寸'}
            visible={positionStore.newPositionVisible}
            onOk={submit}
            onCancel={onCancel}
            okButtonProps={{ loading }}
        >
            <Form onSubmit={submit}>
                <FormItem {...formItemLayout} label="title">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="variety">
                    {getFieldDecorator('variety', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(
                        <Select>
                            <Option key={1} value="zhengzhou">
                                zhengzhou
                            </Option>
                            <Option key={2} value="dalian">
                                dalian
                            </Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="contract">
                    {getFieldDecorator('contract', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="status">
                    {getFieldDecorator('status', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(
                        <Select>
                            {positionStatus.map(c => (
                                <Select.Option key={c.key} value={c.value}>
                                    {c.value}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="risk">
                    {getFieldDecorator('risk', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="plan">
                    {getFieldDecorator('plan', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="detail">
                    {getFieldDecorator('detail', {
                        initialValue: '无',
                        rules: [{ required: true }]
                    })(<TextArea rows={4} />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create<IProps>()(observer(PositionModal))
