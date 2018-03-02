import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon, Table, BackTop, Popconfirm } from 'antd';
import TagForm from '../../components/TagForm';

const { Column } = Table;

class Tags extends Component {
    state = {
        isShowModal: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'tags/readList',
        });
    }

    handleShowModal = () => {
        this.setState({
            isShowModal: true,
        });
    }

    handleCloseModal = () => {
        this.setState({
            isShowModal: false,
        });
    }

    handleSave = () => {
        const form = this.form;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }

            const data = await this.props.dispatch({
                type: 'tags/create',
                payload: values,
            });
            if (data && data.id) {
                form.resetFields();
                this.setState({ isShowModal: false });
            }
        });
    }

    handleDelete = id => {
        return this.props.dispatch({
            type: 'tags/delete',
            payload: { id },
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    renderOperation = (id) => {
        return (
            <div>
                <a href="#">编辑</a>
                <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={() => this.handleDelete(id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#">删除</a>
                </Popconfirm>
            </div>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <Button type="primary" onClick={this.handleShowModal}>
                    <Icon type="plus" />
                    新增文章标签
                </Button>
                <Table rowKey='objectId' dataSource={data}>
                    <Column
                        title="id"
                        dataIndex="objectId"
                        width="25%"
                    />
                    <Column
                        title="标签名"
                        dataIndex="name"
                        width="20%"
                    />
                    <Column
                        title="备注"
                        dataIndex="comment"
                        width="20%"
                    />
                    <Column
                        title="操作"
                        dataIndex="objectId"
                        key="operation"
                        width="35%"
                        render={this.renderOperation}
                    />
                </Table>
                <TagForm
                    ref={this.saveFormRef}
                    visible={this.state.isShowModal}
                    onCancel={this.handleCloseModal}
                    onCreate={this.handleSave}
                />
                <BackTop />
            </div>
        );
    }
}

const mapStateToProps = ({ tags }) => ({ ...tags });

export default connect(mapStateToProps)(Tags);