import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/layout';
import Profile from './components/Profile/Profile';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchComments } from './redux/slices/commentsSlice';
import { fetchPosts } from './redux/slices/postsSlice';
import { fetchUsers } from './redux/slices/usersSlice';

import "../node_modules/slick-carousel/slick/slick.scss";
import "../node_modules/slick-carousel/slick/slick-theme.scss";
import Users from './components/Users/Users';
import Post from './components/Post/Post';

function App() {
  const dispatch = useAppDispatch();
  const visibilityMode = useAppSelector(state => state.visibilitySlice.visibilityMode);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch])

  return (
    <div className={"App "+(visibilityMode ? "visibility" : "")}>
      <Routes>
        <Route path="" element={<Layout />} >
          <Route path="" element={<Users />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/posts/:post_id" element={<Post />} />
        </Route>

        <Route path="*" element={<h1>404. This page is not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
