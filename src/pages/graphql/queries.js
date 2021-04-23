import { gql } from "@apollo/client";

const GET_BOOKS_QUERY = gql`
    query Query{
        getBooks {
            id
            title
            listIds
        }
    }
`;

const GET_LIST_QUERY = gql`
    query Query($getListListId: String) {
        getList(listId: $getListListId) {
            id
            index
            words {
                content
                description
            }
        }
    }
`;

export { GET_BOOKS_QUERY, GET_LIST_QUERY };