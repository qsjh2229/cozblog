import React, { useState, useEffect , useCallback} from "react";
import axios from "axios";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import propTypes from "prop-types";
import Pagenation from "./Pagenation";

const BlogList = ({ isAdmin }) => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCost, setNumberOfCost] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText,setSearchText]= useState('')
  const location = useLocation();

  const onSearchInput=()=>{
    getPost(1)

  }


  const params = new URLSearchParams(location.search);
  const pageParm = params.get("page");
  const limit = 3;
  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`);
    getPost(page);
  };
  const deleteHandler = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfCost / limit));
  }, [numberOfCost]);

  const getPost = useCallback((page = 1) => {
   let params = {
     _page: page,
     _limit: 3,
     _sort: "id",
     _order: "desc",
   };
   if (!isAdmin) {
     params = { ...params, publish: true };
   }
   axios
     .get(`http://localhost:3001/posts`, {
       params,
     })
     .then((res) => {
       setNumberOfCost(res.headers["x-total-count"]);
       setPost(res.data);
       setLoading(false);
     });
 },[isAdmin]) 

  useEffect(() => {
    setCurrentPage(parseInt(pageParm) || 1);
    getPost(parseInt(pageParm) || 1);
  }, [pageParm]);

  const renderblogList = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    if (post.length === 0) {
      return "글을 입력해 주세요";
    }

    return post.map((item) => (
      <Card
        key={item.id}
        title={item.title}
        item={item}
        onClick={() => {
          navigate(`/blog/${item.id}`);
        }}
      >
        <div>
          {" "}
          {isAdmin ? (
            <button
              className="btn btn-danger"
              onClick={(e) => {
                deleteHandler(e, item.id);
              }}
            >
              삭제
            </button>
          ) : null}
        </div>
      </Card>
    ));
  };
  return (
    <div>
      <input type="text" className="form-control" placeholder="search" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} onKeyUp={onSearchInput} />
      <hr />
      {renderblogList()}
      {numberOfPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={onClickPageButton}
        />
      )}
    </div>
  );
};
BlogList.prototype = {
  isAdmin: propTypes.bool
};
BlogList.defaultProps = {
  isAdmin: false,
};
export default BlogList;
