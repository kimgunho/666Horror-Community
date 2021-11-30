import React from 'react';
import { links } from '../../links';

import {
  FiFileText,
  FiFilm,
  FiMessageCircle,
  // FiLogOut,
  FiLogIn,
} from 'react-icons/fi';

const gnb = [
  {
    title: 'Movies',
    link: links.movies,
    icon: <FiFilm />,
  },
  {
    title: 'Review',
    link: links.review,
    icon: <FiFileText />,
  },
  {
    title: 'Community',
    link: links.community,
    icon: <FiMessageCircle />,
  },
  {
    title: 'Login',
    link: links.login,
    icon: <FiLogIn />,
  },
];

export default gnb;
