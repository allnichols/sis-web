// this is the begining of the signup page, it will get the work email, school name, state, and number of students, 
// and then create an account for the user, 
// and then redirect them to the onboarding page where they can fill out more information about their institution and themselves.
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

type FieldType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
}

export default function SignupPage() {
  const navigate = useNavigate({ from: '/' });
  


    return (    
    <Form 
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '0 auto', marginTop: '50px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Sign Up
            </Button>
            <span style={{ marginLeft: '10px' }}>
                Already have an account? <Link to="/login">Log in</Link>
            </span>
        </Form.Item>

        </Form>
  );

}