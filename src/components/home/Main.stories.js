import React from 'react';
import Main from './Main';

import TEMP_DATA from '../../assets/data/homeTemp';

export default {
  title: 'Components/Main',
  component: Main,
};

const Template = () => <Main data={TEMP_DATA} />;

export const 기본 = Template.bind({});
