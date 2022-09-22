import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
  FaCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link to="/login" aria-disabled>
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login" aria-disabled>
          <FaSignInAlt size={24} />
        </Link>
      )}
      {isLoggedIn && <FaCircle size={20} color="#66ff33" />}
    </Nav>
  );
}
