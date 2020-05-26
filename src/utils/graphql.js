import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
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

export const FETCH_POSTS_QUERY = gql`
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
