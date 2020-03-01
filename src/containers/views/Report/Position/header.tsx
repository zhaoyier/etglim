import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import styles from './index.scss'
import { toJS } from 'mobx'
import { Form, Select, Icon, Input, Button, Divider, Layout, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
// import reportRootStore from '@store/reportStore/rootStore'
import positionRootStore from '@store/positionStore/rootStore'
import { useOnMount } from '@utils/hooks'
import PositionModal from './new'
// import 'antd/dist/antd.css'

const { Option } = Select
interface IProps extends FormComponentProps {}
// const { Header, Footer, Sider, Content } = Layout
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

function SearchForm({ form }: IProps) {
    const { positionStore } = positionRootStore()

    // const [modalVisible, setModalVisible] = React.useState(false)
    const [currentUser] = React.useState<IUserStore.IUser>(null)

    function newOnSubmit() {
        return positionStore.setVisible()
    }

    const { getFieldDecorator, getFieldsError } = form
    return (
        <div>
            <div className={styles.left}>
                <Form layout="inline" onSubmit={null}>
                    <Form.Item>
                        {getFieldDecorator('exchange', {
                            rules: [{ required: true, message: 'Please select your variety!' }]
                        })(
                            <Select
                                style={{ width: 120 }}
                                placeholder="Select a option and change input text above"
                                onChange={null}
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
                                onChange={null}
                                onMouseEnter={null}
                            >
                                {null}
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
            </div>
            <div className={styles.right}>
                <Form layout="inline" onSubmit={() => newOnSubmit()}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            New
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <PositionModal user={currentUser} />
            </div>
        </div>
    )
}
export default Form.create<IProps>()(SearchForm)
