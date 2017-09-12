import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'element-react';
import $ from '@/services/Http'
import { encryption } from '@/services/global.common';
import './index.scss'
export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
                authCode: ''
            },
            imgSrc: 'http://scmp.dev.cloudyigou.com/gateway/verifyCode/?t=' + Math.round(Math.random() * 1000000),
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
                authCode: [
                    { required: true, message: '请输入验证码', trigger: 'change' }
                ]
            },
            current: {}
        }
    }
    handleSubmit(e) {
        e.preventDefault();//阻止默认事件
        this.refs.form.validate((valid) => {
            if (valid) {
                $.post('login', { ...this.state.form, password: encryption(this.state.form.password, this.state.current.clientId, this.state.current.token), token: this.state.current.token }).then(result => {
                    if (result.code === 'SUCCESS') {

                        this.props.history.push('/index') //this.props.history获取路由信息
                    } else {
                        this.setState({
                            form: Object.assign({}, this.state.form, { authCode: '' }),
                            imgSrc: 'http://scmp.dev.cloudyigou.com/gateway/verifyCode/?t=' + Math.round(Math.random() * 1000000)
                        })
                    }
                }, err => {

                });
            } else {
                return
            }
        });

    }
    //input value change
    //react中的value不能直接修改,必须通过函数来改变,或者用defaultValue,
    //element不支持defaultValue
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        })
    }
    //切换验证码图片
    changeAuthImg(e) {
        e.preventDefault();
        this.setState({
            imgSrc: 'http://scmp.dev.cloudyigou.com/gateway/verifyCode/?t=' + Math.round(Math.random() * 1000000)
        })
    }
    componentWillMount() {
        $.post('currentUser', {}).then(res => {
            console.log(res.data.token)
            this.setState({
                current: res.data
            })
        })
    }
    render() {
        return (
            <div className="auth_box">
                <div className="auth_title">demo</div>
                <div className="auth_form">
                    <Card className="box-card">
                        <Form ref="form" rules={this.state.rules} model={this.state.form}>
                            <Form.Item prop="username">
                                <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} placeholder="username"></Input>
                            </Form.Item>
                            <Form.Item prop="password">
                                <Input value={this.state.form.password} type="password" onChange={this.onChange.bind(this, 'password')} placeholder="password"></Input>
                            </Form.Item>
                            <Form.Item prop="authCode">
                                <ul>
                                    <li>
                                        <Input value={this.state.form.authCode} maxLength={4} onChange={this.onChange.bind(this, 'authCode')} placeholder="验证码" className="authCode"></Input>
                                    </li>
                                    <li>
                                        <img src={this.state.imgSrc} alt="点击刷新" onClick={this.changeAuthImg.bind(this)} />
                                        <a onClick={this.changeAuthImg.bind(this)}>换一张?</a>
                                    </li>
                                </ul>
                            </Form.Item>
                            <Form.Item>
                                <div>
                                    <Button type="primary" nativeType="submit" onClick={this.handleSubmit.bind(this)}>登录</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}