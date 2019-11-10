import React from 'react';
// import moment from 'moment';
import { Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class NewModal extends React.Component {
  state = {
    contractType: [{ key: 1, value: '农业' }, { key: 2, value: '工业' }, { key: 3, value: '金融' }, { key: 4, value: '其他' }],
    accidentType: [{ key: 1, value: '异常' }, { key: 2, value: '一般事件' }, { key: 3, value: '重大事件' }, { key: 4, value: '有限事故' }, { key: 5, value: '较大事故' }, { key: 6, value: '重大事故' }, { key: 7, value: '特大事故' }],
    stageType: [{ key: 1, value: '初期' }, { key: 2, value: '发展期' }, { key: 3, value: '最盛期' }, { key: 4, value: '减弱期' }, { key: 5, value: '熄灭期' }]
  };


  handleSubmit = (e) => {
    const { onSubmit, onDisplay } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const params = {
        contract: values.contract,
        contractType: values.contractType,
        accidentType: values.accidentType,
        stageType: values.stageType,
        accidentStart: values.accidentStart.valueOf(),
        accidentEnd: values.accidentEnd ? values.accidentEnd.valueOf() : 0,
        remarks: values.remarks,
        predict: values.predict
      };
      console.log('=====>>create:', params);
      typeof onSubmit === 'function' && onSubmit(params);
      typeof onDisplay === 'function' && onDisplay();
    });
  }

  handleCancel = () => {
    const { onDisplay } = this.props;
    console.log('Clicked cancel button');
    typeof onDisplay === 'function' && onDisplay();
  };

  render() {
    const { visible } = this.props;
    const { contractType, accidentType, stageType } = this.state;
    const { getFieldDecorator } = this.props.form;
    const contractOptions = contractType.map((elem) => (<Option key={elem.key} value={elem.key}>{elem.value}</Option>));
    const accidentOptions = accidentType.map((elem) => (<Option key={elem.key} value={elem.key}>{elem.value}</Option>));
    const stageOptions = stageType.map((elem) => (<Option key={elem.key} value={elem.key}>{elem.value}</Option>));

    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="合约">
              {getFieldDecorator('contract', {
                rules: [{ required: true, message: 'opening price' }]
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="合约类型">
              {getFieldDecorator('contractType', {
                rules: [{ required: true, message: 'highest price' }]
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {contractOptions}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="严重等级">
              {getFieldDecorator('accidentType', {
                rules: [{ required: true, message: 'lowest price' }]
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {accidentOptions}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="发展阶段">
              {getFieldDecorator('stageType', {
                rules: [{ required: true, message: 'input remarks' }]
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {stageOptions}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="事故开始时间">
              {getFieldDecorator('accidentStart', {
                rules: [{ required: true, message: 'input remarks' }]
              })(
                <DatePicker />
              )}
            </Form.Item>
            <Form.Item label="事故结束时间">
              {getFieldDecorator('accidentEnd', {
                rules: [{ required: false, message: 'input remarks' }]
              })(
                <DatePicker />
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('remarks', {
                rules: [{ required: true, message: 'input remarks' }]
              })(
                <TextArea rows={2} />,
              )}
            </Form.Item>
            <Form.Item label="预计价">
              {getFieldDecorator('predict', {
                rules: [{ required: true, message: 'input remarks' }]
              })(
                <InputNumber />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(NewModal);
