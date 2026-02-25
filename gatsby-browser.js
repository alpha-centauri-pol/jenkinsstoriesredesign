import React from 'react';
import { Agentation } from 'agentation';

export const wrapRootElement = ({ element }) => (
  <>
    {element}
    {process.env.NODE_ENV === 'development' && <Agentation />}
  </>
);