import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import propTypes from "prop-types";
import Pagenation from "./Pagenation";
import Toast from "./Toast";
import {v4 as uuidv4} from 'uuid'

const BlogList = ({ isAdmin }) => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCost, setNumberOfCost] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [toasts, setToasts] = useState([]);
  const location = useLocation();

  const [searchText, setSearchText] = useState("");

  const params = new URLSearchParams(location.search);
  const pageParm = params.get("page");
  const limit = 3;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfCost / limit));
  }, [numberOfCost]);

  const getPost = useCallback(
    (page = 1) => {
      let params = {
        _page: page,
        _limit: 5,
        _sort: "id",
        _order: "desc",
        title_like: searchText,
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
    },
    [isAdmin, searchText]
  );
  console.log(searchText);

  useEffect(() => {
    setCurrentPage(parseInt(pageParm) || 1);
    getPost(getPost(parseInt(pageParm) || 1));
  }, []);

  const renderblogList = () => {
    if (loading) {
      return <LoadingSpinner />;
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
  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPost(page);
  };
  const deleteToast=(id)=>{
    const filterdeToasts = toasts.filter(toast =>{
     return toast.id !==id
    })
    setToasts(filterdeToasts)
    }
  const addToast=(toast)=>{
    const id=uuidv4()
    const toastWithId ={
      ...toast, id
    }
    setToasts(prev=>[...prev, toastWithId])
    setTimeout(()=>{
      deleteToast()
    },5000)
  }


  const deleteHandler = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
      addToast({
        text: '성공적으로 삭제 되었습니다',
        type: 'success'
      })
    });
  };

  const onSearchInput = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      getPost(1);
      navigate(`${location.pathname}?page=1`);
    }
  };
  return (
    <div>
      <Toast 
      toasts={toasts} deleteToast={deleteToast}></Toast>
      <input
        type="text"
        className="form-control"
        placeholder="search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyUp={onSearchInput}
      />
      <hr />
      {post.length === 0 ? (
        <div> 글을 입력해 주세요</div>
      ) : (
        <>
          {renderblogList()}
          {numberOfPages > 1 && (
            <Pagenation
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onClick={onClickPageButton}
            />
          )}
        </>
      )}
    </div>
  );
};
BlogList.prototype = {
  isAdmin: propTypes.bool,
};
BlogList.defaultProps = {
  isAdmin: false,
};
export default BlogList;
