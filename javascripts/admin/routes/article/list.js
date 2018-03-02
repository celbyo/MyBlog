import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const { Column } = Table;

class List extends Component {

    componentDidMount() {
        const { dispatch, articles: { ipp, page } } = this.props;
        dispatch({
            type: 'articles/readList',
            payload: { page: page + 1, ipp },
        });
    }

    render() {
        const { articles: { data } } = this.props;
        return (
            <Table dataSource={data}>
                <Column
                    title="标题"
                    dataIndex="title"
                    key="title"
                    width="30%"
                />
                <Column
                    title="作者"
                    dataIndex="author"
                    key="author"
                    width="10%"
                />
                <Column
                    title="分类"
                    dataIndex="tag"
                    key="tag"
                    width="15%"
                />
                <Column
                    title="更新时间"
                    dataIndex="updated_date"
                    key="updated_date"
                    width="15%"
                />
                <Column
                    title="状态"
                    dataIndex="publish_state"
                    key="publish_state"
                    width="10%"
                />
                <Column
                    title="操作"
                    dataIndex="id"
                    key="id"
                    width="20%"
                />
            </Table>
        )
    }
}

const mapStateToProps = ({ articles }) => ({
    articles,
});

export default connect(mapStateToProps)(List);