import React, { useState } from 'react';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            // remove post from cache

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                // data.getPosts = data.getPosts.filter((p) => p.id !== postId);
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
                });
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId,
        },
        onError(err) {
            console.log(postId);
            console.log(err);
        },
    });

    return (
        <>
            <Popup
                content={`Delete ${commentId ? 'comment' : 'post'}`}
                inverted
                trigger={
                    <Button
                        as="div"
                        color="red"
                        onClick={() => setConfirmOpen(true)}
                        floated="right"
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                }
            />

            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export default DeleteButton;
