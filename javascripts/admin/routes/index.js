import React, { Component } from 'react';
import { connect } from 'dva';
import { Switch, Route, Redirect, Link, routerRedux } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.css';

import ArticleForm from './article';
import NotFound from './notfound';

const { Header, Content, Footer } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.initMenu = props.location.pathname;
    }

    render() {
        const { match } = this.props;
        return (
            <Layout>
                <Header className={styles.header}>
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={[this.initMenu]}
                        style={{ lineHeight: '56px' }}
                    >
                        <Menu.Item key="/admin">
                            <Link to="/admin/articles">
                                <Icon type="file-markdown" />
                                博客
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/tags">
                            <Link to="/admin/tags">
                                <Icon type="tags-o" />
                                标签
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/setting">
                            <Link to="/admin/setting">
                                <Icon type="setting" />其他
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className={styles.content}>
                    <Switch>
                        <Redirect exact from='/admin' to='/admin/article' />
                        <Route path='/admin/articles' component={ArticleForm} />
                        <Route component={NotFound} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Blog ©2018 Created by William.guo
                </Footer>
            </Layout>
        );
    }
}

export default connect()(Home);