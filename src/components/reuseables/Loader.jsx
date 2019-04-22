import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
import style from '../../styles/loader.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function Loader(props) {
  const { isLoading } = props;
  return (
    <div className={style.loader_div}>
      <BounceLoader
        css={override}
        sizeUnit="px"
        size={200}
        loading={isLoading}
        color={'#117d5a'}
      />
    </div>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;
