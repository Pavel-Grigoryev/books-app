import React from 'react';
import { SmallContainer } from 'common/components/SmallContainer';
import { smallContainerSX } from 'common/styles/sx/sx_styles';

export const NotFound = () => {
  return (
    <SmallContainer sx={smallContainerSX}>
      <h1>PAGE NOT FOUND</h1>
    </SmallContainer>
  );
};
