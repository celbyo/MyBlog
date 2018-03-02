import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;


const TagForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        };
        return (
            <Modal
                visible={visible}
                title="标签表单"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="标签名称" {...formItemLayout}>
                        {getFieldDecorator('nam1e', {
                            rules: [{ required: true, message: '标签名不能为空!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="备注信息" {...formItemLayout}>
                        {getFieldDecorator('comment')(<Input />)}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
);

export default TagForm;