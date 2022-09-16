import "./SearchIcon.css";
import {Search} from '@mui/icons-material'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import {searchUsers} from '../../Actions/userAction'

const SearchIcon = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    dispatch(searchUsers(query));
  }
  useEffect(() => {
    if (query.length > 1) {
      dispatch(searchUsers(query));
    }
  }, [dispatch, query]);
  return (
    <div className="SearchIcon">
      <div className="search">
        <input type="text" placeholder="Search Users" onChange={(e)=>setQuery(e.target.value)}/>
        <div className="sIcon" onClick={handleSearch}>
          <Search/>
        </div>
      </div>
    </div>
  );
};

export default SearchIcon;
