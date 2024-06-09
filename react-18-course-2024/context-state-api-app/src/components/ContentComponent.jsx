import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';

export default function ContentComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      Current Theme {theme}
      <div>
        <button id="toggle-theme" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
