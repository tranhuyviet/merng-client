import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';
const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const initialState = {
        username: '',
        password: '',
    };

    const { onChange, onSubmit, values } = useForm(login, initialState);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData } }) {
            // console.log('RESULT', result);
            // context.login(result.data.login);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            console.log('ERROR', err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function login() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    type="password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />

                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            token
            createdAt
        }
    }
`;

export default Login;
