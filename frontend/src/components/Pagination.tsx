import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostStore } from '../slices/postSlice';
import { Link } from 'react-router-dom';
import classes from './Pagination.module.css';
import { CurrentPagePosts } from 'src/types/post.types';

interface PaginationProps {
  page: string;
}

const Pagination: React.FC<PaginationProps> = ({ page }) => {
  const { postInfo } = useSelector(
    (state: { post?: { postInfo?: CurrentPagePosts } }) => state?.post || {}
  );
  const dispatch = useDispatch();
  const { data } = useGetPostsQuery({ page: page });

  useEffect(() => {
    if (data) {
      const postInfo: CurrentPagePosts = data;
      dispatch(fetchPostStore(postInfo));
    }
  }, [dispatch, data]);

  let active = postInfo?.currentPage as number;
  let items = [];

  if (postInfo && postInfo.numberOfPages) {
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
  }

  return (
    <>
      <div className={classes.paginationContainer}>{items}</div>
    </>
  );
};

export default Pagination;
