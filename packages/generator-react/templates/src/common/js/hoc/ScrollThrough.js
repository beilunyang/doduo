/*
 * @Author: beilunyang
 * @Date: 2019-01-22 10:00:55
 * @Last Modified by: beilunyang
 * @Last Modified time: 2019-09-01 22:37:08
 */
import React from 'react';

const WithFixScrollThrough = Comp => {
  return class extends React.PureComponent {
    static displayName = `${Comp.name}WithFixScrollThrough`;

    componentDidMount() {
      WithFixScrollThrough.fixedBody();
    }

    componentWillUnmount() {
      WithFixScrollThrough.looseBody();
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
};

WithFixScrollThrough.fixedBody = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += `position:fixed;left:0;right:0;top:-${scrollTop}px;`;
};

/* eslint-disable  no-multi-assign */

WithFixScrollThrough.looseBody = () => {
  const { body } = document;
  body.style.position = '';
  const { top } = body.style;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
    top,
    10
  );
  body.style.top = '';
};

export default WithFixScrollThrough;
