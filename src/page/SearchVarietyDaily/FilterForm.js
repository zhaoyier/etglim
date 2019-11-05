import React from 'react';
// import moment from 'moment';
import { Form, Icon, Input, Button, DatePicker, Cascader } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const monthFormat = 'YYYYMMDD';

class FilterForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('====>>>param: ', !err, values);
      if (!err) {
        const start = values.date[0].format(monthFormat);
        const end = values.date[1].format(monthFormat);
        const contract = values.contract.join('');

        console.log('Received values of form: ', contract, start, end);
        // values["start"] = values['date'][0].format(monthFormat);
        // values["end"] = values["date"][1].format(monthFormat);
        typeof onSubmit === 'function' && onSubmit(contract, start, end);
      }
    });
  }

  render() {
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        style={{ marginLeft: 0 }}
        layout="inline"
        onSubmit={this.handleSubmit}
      >
        <FormItem label="合约">
          {getFieldDecorator('contract', {
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' }
            ]
          })(<Cascader options={data} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('date', {
            rules: [
              { required: true, message: 'Please select date!' }
            ]
          })(
            <RangePicker />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FilterForm);
