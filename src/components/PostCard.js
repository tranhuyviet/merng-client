import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

import { AuthContext } from '../context/auth';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{ id, likes, likeCount }} user={user} />
                <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                    <Button icon basic color="blue">
                        <Icon name="comments" />
                    </Button>
                    <Label basic pointing="left" color="blue">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button
                        as="div"
                        color="red"
                        onClick={() => console.log('Delete post ', id)}
                        floated="right"
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
