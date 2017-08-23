import React from 'react';

require('./style.css');

class PageBar extends React.Component {
  render() {
    const pageList = [];
    for (let i = 0, len = this.props.pageLen; i < len; i++) {
      const classes = i === this.props.selectedIndex ? 'active' : '';
      pageList.push(
        <span
          className={classes}
          key={i}
          onClick={() => {
            this.handleClick(i);
          }}
        >
          {i + 1}
        </span>
      );
    }
    return (
      <div className="page-bar">
        {pageList}
      </div>
    );
  }
  handleClick(i) {
    if (i === this.props.selectedIndex) {
      // todo
    } else {
      this.props.selectNewImage(i);
    }
  }
}

export default PageBar;
