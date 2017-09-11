import React, { Component } from 'react';
import { Form, Input,Button } from 'element-react';
import './index.scss'
export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{}
        }
    }
    onChange(){

    }
    render() {
        return (
            <div className="auth_box">
                <div className="auth_title">XXXXX--XXX</div>
                <div className="auth_form">
                    <Form labelPosition={this.state.labelPosition} labelWidth="100" model={this.state.form} className="demo-form-stacked">
                        <Form.Item >
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        </Form.Item>
                        <Form.Item >
                            <Input value={this.state.form.region} onChange={this.onChange.bind(this, 'region')}></Input>
                        </Form.Item>
                        <Form.Item >
                            <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
                        </Form.Item>
                         <Form.Item>
                            <Button type="primary" nativeType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}