import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import ReactMarkdown from 'react-markdown';

const { TextArea } = Input;

class Create extends Component {

    state = {
        value: '',
    }

    handleChange = e => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <TextArea
                            onChange={this.handleChange}
                            rows={20} />
                    </Col>
                    <Col span={12}>
                        <ReactMarkdown source={this.state.value} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Create;