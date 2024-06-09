import Post from './Post';
import { useContext } from 'react';
import UserInfoContext from '../context/UserInfoContext';

export default function BlogPage() {
  const { username, isAdmin } = useContext(UserInfoContext);

  return (
    <div>
      <h1>Blog</h1>
      <Post username={username} isAdmin={isAdmin} />
    </div>
  );
}
