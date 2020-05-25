import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
    const likePost = () => {
        console.log('Like post!!!');
    };

    const commentOnPost = () => {
        console.log('Comment on post!!!');
    };

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
                <Button as="div" labelPosition="right">
                    <Button icon basic onClick={likePost} color="red">
                        <Icon name="heart" />
                    </Button>
                    <Label basic pointing="left" color="red">
                        {likeCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="right">
                    <Button icon basic onClick={commentOnPost} color="blue">
                        <Icon name="comments" />
                    </Button>
                    <Label basic pointing="left" color="blue">
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
};

export default PostCard;
