import {Link} from "react-router-dom";

const ListCover = ({ lId, index }) => {
    return(
        <Link to={ `/list/${lId}` } className='listCover'>
            <p>List { index + 1 }</p>
        </Link>
    );
}

export default ListCover;