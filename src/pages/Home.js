import { useState } from "react";
import { useQuery } from "@apollo/client";

import Header from "./components/Header";
import BookCover from "./components/BookCover";

import { GET_BOOKS_QUERY } from "./graphql/queries";
import ListCover from "./components/ListCover";

const BackBtn = ({ handleBackClick }) => {
    return (
        <div className='backBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={handleBackClick}>
                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
        </div>
    );
}

const SearchBar = ({ handleFilter }) => {
    return (
        <div id='searchBar'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input type='text' placeholder='Book title' onChange={handleFilter}/>
        </div>
    );
}

const Home =  () => {
    const [ homeState, setHomeState ] = useState({
        selected: false,
        listIds: []
    })

    const [ filterState, setFilterState ] = useState('');

    // Book cover click function
    const handleBcClick = (lIds) => {
        setHomeState({
            selected: true,
            listIds: lIds.slice(0)
        });
    }

    const handleBackClick = () => {
        setHomeState({
            selected: false,
            listIds: []
        });
    }

    const handleFilter = (e) => {
        setFilterState(e.target.value);
    }

    const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

    if(loading){
        return <div>Loading ...</div>;
    }
    if(error){
        return <div>`Error! ${error.message}`</div>;
    }

    return (
        <div className='center'>
            <Header/>
            {
                homeState.selected
                    ?
                    <div id='listCovers'>
                        <BackBtn handleBackClick={ handleBackClick }/>
                        <div id='lists'>
                            { homeState.listIds.map((lId, index) => <ListCover lId={ lId } index={ index } key={ lId }/>) }
                        </div>
                    </div>
                    :
                    <div id='bookCovers'>
                        <SearchBar handleFilter={handleFilter}/>
                        <div id='books'>
                            { data?.getBooks.filter(b => b.title.includes(filterState)).map(b => <BookCover title={ b.title } listIds={ b.listIds } key={ b.id } handleBcClick={ handleBcClick }/>) }
                        </div>
                    </div>
            }
        </div>
    );

};

export default Home;