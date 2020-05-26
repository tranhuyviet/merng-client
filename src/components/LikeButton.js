import React, { useEffect, useState } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LikeButton = ({ post: { likeCount, likes, id }, user }) => {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeBtn = user ? (
        liked ? (
            <Button icon color="red">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button icon basic color="red">
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button icon basic color="red" as={Link} to="/login">
            <Icon name="heart" />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeBtn}
            <Label basic pointing="left" color="red">
                {likeCount}
            </Label>
        </Button>
    );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
                createdAt
            }
            likeCount
        }
    }
`;

export default LikeButton;
