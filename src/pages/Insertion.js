import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_WORD_MUTATION, ADD_LIST_MUTATION } from "./graphql/mutations";

const Insertion = () => {
    const [showing, setShowing] = useState(0);

    const [form1State, setForm1State] = useState({
        content: '',
        description: '',
        bookTitle: '',
        listIndex: 0
    });

    const [form2State, setForm2State] = useState({

    });

    const [successState, setSuccessState] = useState(0);

    const [addWord, { loading: mutation1Loading, error: mutation1Error }] = useMutation(ADD_WORD_MUTATION);
    const [addList, { loading: mutation2Loading, error: mutation2Error }] = useMutation(ADD_LIST_MUTATION);

    const form1HandleChange = (e) => {
        const form1StateCpy = { ...form1State };

        switch (e.target.name){
            case 'content':
                form1StateCpy.content = e.target.value;
                break;
            case 'description':
                form1StateCpy.description = e.target.value;
                break;
            case 'bookTitle':
                form1StateCpy.bookTitle = e.target.value;
                break;
            case 'listIndex':
                const value = Number(e.target.value);

                form1StateCpy.listIndex = value || 0;
                break;
            default:
                break;
        }

        setForm1State(form1StateCpy);
    }

    const form1HandleSubmit = async (e) => {
        e.preventDefault();

        if(form1State.listIndex === 0){
            setSuccessState(2);
            return;
        }

        setSuccessState(0);

        const { data } = await addWord({
            variables: {
                "addWordWordInput": {
                    ...form1State
                }
            }
        })

        if(data?.addWord?.success){
            setSuccessState(1);
        }else{
            console.log(data?.addWord?.message)
            setSuccessState(2);
        }
    }

    const form2HandleChange = (e) => {
        e.target.name === 'bookTitle'
            ? setForm2State({ ...form2State, bookTitle: e.target.value })
            : setForm2State({ ...form2State, content: e.target.value })
    }

    const form2HandleSubmit= async (e) => {
        e.preventDefault();

        const content = form2State.content;
        const match = content.match(/([\w\s-]*,[\w\s-]*;\s*)*/);
        if(match && content === match[0]){
            setSuccessState(0);

            const { data } = await addList({
                variables: {
                    "addListListInput": {
                        ...form2State
                    }
                }
            })

            if(data?.addList){
                setSuccessState(1);
            }else{
                console.log('Failed')
                setSuccessState(2);
            }
        }else {
            console.log('Wrong input format.')
            setSuccessState(2);
        }
    }

    const handleChangeShowing = () => {
        setShowing(showing ? 0 : 1);
    }

    return (
        <div className='center vCenter'>
            <div id='formWrapper' >
                <button id='switch' onClick={ handleChangeShowing }>Switch</button>
                {
                    showing === 0
                        ?
                        <form id='inputForm1' onSubmit={form1HandleSubmit}>
                            <div className='inputLine'>
                                <label>Content</label>
                                <input type='text' name='content' value={form1State.content} onChange={form1HandleChange} required={true} autoFocus={true}/>
                            </div>
                            <div className='inputLine'>
                                <label>Description</label>
                                <input type='text' name='description' value={form1State.description} onChange={form1HandleChange} required={true} />
                            </div>
                            <div className='inputLine'>
                                <label>Book title</label>
                                <input type='text' name='bookTitle' value={form1State.bookTitle} onChange={form1HandleChange} required={true} />
                            </div>
                            <div className='inputLine'>
                                <label>List Index</label>
                                <input type='tel' name='listIndex' value={Number(form1State.listIndex)} onChange={form1HandleChange} required={true} />
                            </div>
                            <div className='inputLine'>
                                <input type='submit' value='Add word'/>
                            </div>
                        </form>
                        :
                        <form id='inputForm2' onSubmit={form2HandleSubmit}>
                            <div className='inputLine'>
                                <label>Book title</label>
                                <input type='text' name='bookTitle' value={form2State.bookTitle} onChange={form2HandleChange} required={true} autoFocus={true}/>
                            </div>
                            <div className='inputLine'>
                                <label>Content</label>
                                <textarea name='content' onChange={form2HandleChange} placeholder=
                                    {`Format:\r\n(word),(description);\r\nExample input:\r\nhello, an expression of greeting;\r\nworld, the planet we live on;`} required={true}/>
                            </div>
                            <div className='inputLine'>
                                <input type='submit' value='Add word'/>
                            </div>
                        </form>
                }
                { (mutation1Loading || mutation2Loading) && <p>Loading...</p> }
                { (mutation1Error || mutation2Error) && <p>Error :( Please try again</p> }
                { successState === 1 && <p>Success</p> }
                { successState === 2 && <p>Failed</p> }
            </div>
        </div>
    );
};

export default Insertion;