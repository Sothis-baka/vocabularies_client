import { gql } from '@apollo/client';

const ADD_WORD_MUTATION = gql`
    mutation Mutation($addWordWordInput: WordInput!) {
        addWord(wordInput: $addWordWordInput) {
            success
            message
        }
    }
`;

const ADD_LIST_MUTATION = gql`
    mutation Mutation($addListListInput: ListInput!) {
        addList(listInput: $addListListInput)
    }
`;

export { ADD_WORD_MUTATION, ADD_LIST_MUTATION };