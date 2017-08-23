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
const imgWidth = 347;
const imgHeight = 386;
const initBlock = () => {
  const root = document.documentElement || document.body;
  const width = root.offsetWidth;
  const height = root.offsetHeight;
  // 左侧区域
  blockArray.push({
    start: [0 - imgWidth / 2, 0 - imgHeight / 2],
    end: [width / 2 - 2 / 3 * imgWidth, height + imgHeight / 2]
  });
  // 右侧区域
  blockArray.push({
    start: [width / 2 + 2 / 3 * imgWidth, 0 - imgHeight / 2],
    end: [width + imgWidth / 2, height + imgHeight / 2]
  });
  // 上侧区域
  blockArray.push({
    start: [width / 2 - imgWidth, 0 - imgHeight / 2],
    end: [width / 2 + imgWidth, height / 2 - imgHeight * 2 / 3]
  });
  console.log('blockArray', blockArray);
};

const root = document.documentElement || document.body;
const width = root.offsetWidth - 240;
const height = root.offsetHeight - 360;
// 随机定位
const getRandomStyle = isSelected => {
  const deg = Math.random() * 90 - 45;
  const sty = {};
  if (!isSelected) {
    // 图片应该落到哪个区域
    const areaIndex = Math.abs(Math.floor(Math.random() * 3));
    const area = blockArray[areaIndex];
    console.log('areaIndex:', areaIndex);
    if (!area) {
      return {};
    }
    const startX = area.start[0];
    const startY = area.start[1];
    const endX = area.end[0];
    const endY = area.end[1];
    sty.left = Math.floor(Math.random() * endX + startX) + 'px';
    sty.top = Math.floor(Math.random() * endY + startY) + 'px';
    console.log('left %s, top %s', sty.left, sty.top);
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
          <img src={item.src}/>
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
