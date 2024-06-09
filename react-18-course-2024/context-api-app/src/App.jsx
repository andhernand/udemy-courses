import './App.css';
import BlogPage from './components/BlogPage';
import UserInfoContext from './context/UserInfoContext';

export default function App() {
  const userInfo = {
    username: 'Admin',
    isAdmin: true,
  };

  return (
    <UserInfoContext.Provider value={userInfo}>
      <BlogPage />
    </UserInfoContext.Provider>
  );
}
