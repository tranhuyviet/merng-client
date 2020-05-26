import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';

const PostForm = () => {
    const { onSubmit, onChange, values } = useForm(createPostCallback, { body: '' });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });

                // data.getPosts = [result.data.createPost, ...data.getPosts];
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: [result.data.createPost, ...data.getPosts] },
                });
                values.body = '';
            } catch (err) {
                console.log(err);
            }
        },
        onError(err) {
            console.log(err);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button color="blue" type="submit">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default PostForm;
