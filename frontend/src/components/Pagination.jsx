import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostStore } from '../slices/postSlice';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './Pagination.module.css';

const Pagination = ({ page }) => {
  const { postInfo } = useSelector((state) => state?.post);
  const dispatch = useDispatch();
  const { data } = useGetPostsQuery(page);

  useEffect(() => {
    if (data) {
      dispatch(fetchPostStore(data));
    }
  }, [dispatch, data]);

  let active = postInfo?.currentPage;
  let items = [];
  for (let number = 1; number <= postInfo?.numberOfPages; number++) {
    items?.push(
      <Link
        className={`${
          number !== active
            ? classes.paginationItem
            : classes.paginationItemActive
        }`}
        to={`/home?page=${number}`}
        key={number}
      >
        {number}
      </Link>
    );
  }
  return (
    <>
      <div className={classes.paginationContainer} size='lg'>
        {items}
      </div>
    </>
  );
};

export default Pagination;

Pagination.propTypes = {
  page: PropTypes.string,
};
