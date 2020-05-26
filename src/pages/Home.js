import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { AuthContext } from '../context/auth';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    // if (data) {
    //     console.log(data.getPosts);
    // }

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading post...</h1>
                ) : (
                    data.getPosts &&
                    data.getPosts.map((post) => {
                        return (
                            <Grid.Column key={post.id} style={{ marginBottom: 25 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        );
                    })
                )}
            </Grid.Row>
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
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

export default Home;
