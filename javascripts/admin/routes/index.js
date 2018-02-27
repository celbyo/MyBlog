import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

class Home extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    hahaha
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Blog ©2018 Created by William.guo
                </Footer>
            </Layout>
        );
    }
}

export default Home;