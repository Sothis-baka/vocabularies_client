import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Redirect } from 'react-router-dom';

import { GET_LIST_QUERY } from "./graphql/queries";

const success_sound = new Audio(process.env.PUBLIC_URL + "/audio/finished.wav");
success_sound.volume = 0.2;

const List = () => {
    const { lId } = useParams();

    const [listState, setListState] = useState({
        index: 0,
        done: false,
        redirect: false
    });

    const { loading, error, data } = useQuery(GET_LIST_QUERY, {
        variables: { "getListListId": lId }
    });

    if(loading){
        return <div>Loading</div>;
    }

    if(error){
        return <div>`Error! ${error.message}`</div>;
    }

    const words = data?.getList?.words;
    const len = words.length;

    const handleCheck = () => {
        const index = listState.index;
        if(listState.index < len - 1){
            setListState({ ...listState, index: index+1 });
        }else{
            setListState({ ...listState, done: true })
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleCheck();
        }
    }

    if(listState.redirect){
        return <Redirect to={'/'}/>;
    }

    if(listState.done){
        success_sound.play().catch(e => console.log(e));

        setTimeout(() => setListState({ ...listState, redirect: true }), 2000);

        return(
            <div className='center vCenter'>
                <div id='done'>
                    <p>Good job, Keep going</p>
                    <p>You will be redirect to main page.</p>
                    <small>If not, <Link to='/'>click here</Link></small>
                </div>
            </div>
        );
    }

    const index = listState.index;

    return (
        <div className='center vCenter' tabIndex='0' onKeyPress={handleKeyPress}>
            {
                words &&
                <div id='listWrapper'>
                    <div className='word'>
                        <span>{words[index].content}</span>
                    </div>

                    <div className={'description showLater' + (index % 2 === 0 ? '2' : '')}>
                        <span>{words[index].description}</span>
                    </div>

                    <div id='btnGroup' className={'showLater' + (index % 2 === 0 ? '2' : '')}>
                        <button className="quitBtn">
                            <Link to={'/'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                    <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                            </Link>
                        </button>
                        <button className="questionBtn">
                            <a href={'https://www.vocabulary.com/dictionary/' + words[index].content} target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                            </a>
                        </button>
                        <button className="checkBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={ handleCheck }>
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default List;