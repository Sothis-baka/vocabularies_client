const BookCover = ({ title, listIds, handleBcClick }) => {
    return (
        <div className='bookCover' onClick={ () => handleBcClick(listIds) }>
            <p>{ title }</p>
            <small>{ listIds.length } List{ listIds.length>1 && 's' }</small>
        </div>
    );
};

export default BookCover;