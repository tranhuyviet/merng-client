import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const { onChange, onSubmit, values } = useForm(registerUser, initialState);

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData } }) {
            // console.log('RESULT', result);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            console.log('ERROR', err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    type="text"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label="Email"
                    type="email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}
                />
                <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />
                <Form.Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => {
                            return <li key={value}>{value}</li>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            token
            createdAt
        }
    }
`;

export default Register;
