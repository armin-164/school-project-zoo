import { Link } from 'react-router-dom';
import '../styles/Header.css';

export const Header = () => {
  return (
    <>
      <header>
        <h1>ZOO</h1>
        <Link to="/" className="home-btn">Home</Link>
      </header>
    </>
  );
};
