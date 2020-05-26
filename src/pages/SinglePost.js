import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

import { AuthContext } from '../context/auth';

const SinglePost = (props) => {
    const postId = props.match.params.postId;

    const { user } = useContext(AuthContext);

    const { data } = useQuery(FETCH_POSTS_QUERY, {
        variables: { postId },
        onError(err) {
            console.log(err);
        },
    });

    // if (data) {
    //     console.log(data.getPost);
    // }

    function deletePostCallback() {
        props.history.push('/');
    }

    let postMarkup;
    if (!data) {
        postMarkup = <p>Loading post...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                            size="small"
                            floated="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('Comment')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>

                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
};

const FETCH_POSTS_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likes {
                username
            }
            likeCount
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

export default SinglePost;
