import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/react-hooks';

const PostForm = () => {
    const { onSubmit, onChange, values } = useForm(createPostCallback, { body: '' });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result) {
            console.log(result);
            values.body = '';
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button color="blue" type="submit">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            username
            createdAt
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                id
                createdAt
                username
            }
            likeCount
            commentCount
        }
    }
`;

export default PostForm;
