import React from 'react';
import { Form, Button, Select, Input } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

class FilterForm extends React.Component {
  // componentDidMount() {
  //   // To disabled submit button at the beginning.
  //   // this.props.form.validateFields();
  // }

  state = {

  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('====>>>param: ', !err, values);
      if (!err) {
        // const start = values.date ? values.date[0].format(monthFormat) : 0;
        // const end = values.date ? values.date[1].format(monthFormat) : 0;
        const contract = values.contract ? values.contract : '';
        const state = values.state;

        console.log('Received values of form: ', contract, state);
        // values["start"] = values['date'][0].format(monthFormat);
        // values["end"] = values["date"][1].format(monthFormat);
        typeof onSubmit === 'function' && onSubmit(contract, state, 0, 0);
      }
    });
  }

  handleDisplay = () => {
    console.log('====>>display');
    const { onDisplay } = this.props;
    typeof onDisplay === 'function' && onDisplay();
  }

  render() {
    const { stateOptions } = this.props;
    const options = stateOptions.map((elem) => (<Option key={elem.key} value={elem.key}>{elem.value}</Option>));
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
              { required: false, message: 'Please select date!' }
            ]
          })(
            <Input
              type="text"
              style={{ width: 120, marginLeft: '3%' }}
            />
          )}
        </FormItem>
        <FormItem label="状态">
          {getFieldDecorator('state', {
            initialValue: 0,
            rules: [
              { required: false, message: 'Please select date!' }
            ]
          })(
            <Select
              style={{ width: 120 }}
            >
              {options}
            </Select>
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
        <FormItem>
          <Button
            type="primary"
            onClick={this.handleDisplay}
          >
            新增
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FilterForm);
