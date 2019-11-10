import React from 'react';
// import moment from 'moment';
import { Modal, Form, Input, InputNumber } from 'antd';

const { TextArea } = Input;

class EditModal extends React.Component {
  state = {
  };

  handleCancel = () => {
    const { onDisplay } = this.props;
    console.log('Clicked cancel button');
    typeof onDisplay === 'function' && onDisplay();
  };

  handleSubmit = (e) => {
    const { focusId, onSubmit, onDisplay } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const params = {
        id: focusId,
        detail: {
          opening: values.opening,
          highest: values.highest,
          lowest: values.lowest,
          remarks: values.remarks
        }
      };

      typeof onSubmit === 'function' && onSubmit(params);
      typeof onDisplay === 'function' && onDisplay();
    });
  }

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="开盘价">
              {getFieldDecorator('opening', {
                rules: [{ required: true, message: 'opening price' }]
              })(
                <InputNumber min={1} />,
              )}
            </Form.Item>
            <Form.Item label="最高价">
              {getFieldDecorator('highest', {
                rules: [{ required: true, message: 'highest price' }]
              })(
                <InputNumber min={1} />,
              )}
            </Form.Item>
            <Form.Item label="最低价">
              {getFieldDecorator('lowest', {
                rules: [{ required: true, message: 'lowest price' }]
              })(
                <InputNumber min={1} />,
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('remarks', {
                rules: [{ required: true, message: 'input remarks' }]
              })(
                <TextArea rows={2} />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(EditModal);
