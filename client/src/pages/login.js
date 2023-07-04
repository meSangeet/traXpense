import React from 'react'
import {Form, Input} from 'antd'
const Login = () => {
    //from submit
    const submitHandler = (values) =>{
        console.log(values);
    }
return (

    <>
    <div className = "register-page">
        <Form layout="vertical" onFinish={submitHandler}> 
        <h1>Login Form</h1>
            <Form.Item label="Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type="email"/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password"/>
            </Form.Item>
            <div className="d-flex justify-content-between">
                <a href="/register">New Here ? Register</a>
                <button className="btn btn-primary">Login</button>
            </div>
        </Form>
    </div>
    </>
)
}

export default Login