import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Card } from 'element-react';
import $ from '@/services/Http'
import { encryption } from '@/services/global.common';
import { getUser,login,setCurrentUser } from '@/redux/action';

import './index.scss'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
                authCode: ''
            },
            imgSrc: 'http://scmp.dev.cloudyigou.com/gateway/verifyCode/',
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
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();//阻止默认事件
        let {dispatch,token,clientId}=this.props;
        this.refs.form.validate((valid) => {
            if (valid) {
                $.post('login', { ...this.state.form, password: encryption(this.state.form.password,clientId,token)}).then(result => {
                    if (result.code === 'SUCCESS') {
                        dispatch(setCurrentUser(result.data));
                        this.props.history.push('/index') //this.props.history获取路由信息
                        
                    } else {
                        this.setState({
                            form: Object.assign({}, this.state.form, { authCode: '' }),
                            imgSrc: this.state.imgSrc+'?t=' + Math.round(Math.random() * 1000000)
                        })
                    }
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
            imgSrc: this.state.imgSrc+'?t=' + Math.round(Math.random() * 1000000)
        })
    }
    componentWillMount() {
        let {dispatch}=this.props;
        dispatch(getUser())
    }
    render() {
        console.log(this.props)
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

let mapStateToProps = state => {
    console.log(state)
    return {
        token:state.currentUser.token,
        clientId:state.currentUser.clientId
    }
}



export default connect(mapStateToProps)(Auth)