import Comment from './Comment';

export default function Post({ username, isAdmin }) {
  return (
    <div>
      <h2>Example Post Title</h2>
      <p>This is an example post content.</p>
      <Comment username={username} />
      {isAdmin && <button>Edit comment</button>}
    </div>
  );
}
