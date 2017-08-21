import React from 'react';

import PageBar from '../page-bar/PageBar';

require('./style.css');

// 图片数据处理
const imageDatas = require('../../data/imageDatas.json');
imageDatas.forEach(item => {
  item.src = '../../images/' + item.fileName;
});

// 定义区块
const blockArray = [];
const initBlock = () => {
  const root = document.documentElement || document.body;
  const widthTrisection = root.offsetWidth / 3;
  const heightTrisection = root.offsetHeight / 3;
  for (let i = 0, len = 9; i < len; i++) {
    if (i === 4) {
      continue;
    }
    let startX = 0;
    let startY = 0;
    if (i !== 0) {
      startX = i % 3 * widthTrisection;
      startY = Math.floor(i / 3) * heightTrisection;
    }

    blockArray.push({
      start: [startX, startY],
      end: [startX + widthTrisection, startY + heightTrisection]
    });
  }
};

const root = document.documentElement || document.body;
const width = root.offsetWidth - 240;
const height = root.offsetHeight - 360;
// 随机定位
const getRandomStyle = isSelected => {
  const deg = Math.random() * 90 - 45;
  const sty = {};
  if (!isSelected) {
    sty.top = Math.abs(Math.floor(Math.random() * height)) + 'px';
    sty.left = Math.abs(Math.floor(Math.random() * width)) + 'px';
    sty.opacity = '0.7';
    sty.transform = `rotate(${deg}deg)`;
  } else {
    sty.top = '50%';
    sty.left = '50%';
    sty.transform = 'translate(-50%, -50%)';
    sty.zIndex = 999;
    sty.boxShadow = '0 0 12px #222';
  }
  return sty;
};

class GallerySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: Math.floor(Math.random() * 16)
    };
  }
  render() {
    initBlock();
    const imageList = imageDatas.map((item, index) => {
      const pos = getRandomStyle(this.state.selectedIndex === index);
      return (
        <li
          style={pos}
          key={item.fileName}
          onClick={() => {
            this.selectNewImage(index);
          }}
        >
          <img src={item.src} />
          <p>
            {item.desc}
          </p>
        </li>
      );
    });
    return (
      <section className="gallery-section">
        <ul className="image-list">
          {imageList}
        </ul>
        <PageBar
          pageLen={imageDatas.length}
          selectedIndex={this.state.selectedIndex}
          selectNewImage={this.selectNewImage}
        />
      </section>
    );
  }
  selectNewImage = index => {
    if (index === this.state.selectedIndex) {
      // todo
    } else {
      this.setState({
        selectedIndex: index
      });
    }
  };
}

export default GallerySection;
