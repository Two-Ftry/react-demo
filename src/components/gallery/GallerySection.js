import React from 'react';
import ReactDOM from 'react-dom';
import PageBar from '../page-bar/PageBar';
import PropTypes from 'prop-types';
import * as galleryAction from '../../actions/galleryAction';

require('./style.css');

// 图片数据处理
const imageDatas = require('../../data/imageDatas.json');
imageDatas.forEach(item => {
  item.src = '../../images/' + item.fileName;
});

const getRandomData = (low, high) => {
  if (typeof low === 'number' && typeof high === 'number') {
    return Math.floor(Math.random() * (high - low) + low);
  } else {
    return 0;
  }
};

// 获取旋转角度的随机值
const getRandomRotate = (min, max) => {
  min = min ? min : -30;
  max = max ? max : 30;
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * 单个图片组件
 */
class ImgFigure extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const item = this.props.item;
    const status = this.props.status;
    const styleObj = status.pos;
    if (status.rotate) {
      styleObj.transform = `rotate(${status.rotate}deg)`;
    }
    let className = '';
    if (status.isInverse) {
      className += ' is-inverse';
    }
    className += (this.props.index === this.props.selectedIndex ? ' selected-img' : '');
    return (
      <li
        style={styleObj}
        className={className}
        key={item.fileName}
        onClick={() => {
          this.props.onClick(this.props.index);
        }}
      >
        <img src={item.src}/>
        <p>
          {item.title}
        </p>
        <div className="img-back">{item.desc}</div>
      </li>
    );
  }
}


class GallerySection extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      area: { // 区域范围
        center: {
          pos: {
            top: '50%',
            left: '50%'
          }
        },
        leftArea: {
          start: [],
          end: []
        },
        rightArea: {
          start: [],
          end: []
        },
        topArea: {
          start: [],
          end: []
        }
      }
    };

    this.state = {
      selectedIndex: 0,
      imageStateArray: [ // 每张图片的状态数组
        // {
        //   pos: {
        //     top: 0,
        //     left: 0
        //   },
        //   rotate: 20,
        //   isInverse: false
        // }
      ]
    };
  }

  componentDidMount () {
    this.initAreaArrange();
  }

  // 初始化上区域、左区域、右区域的范围
  initAreaArrange () {
    const stage = ReactDOM.findDOMNode(this.refs.stage);
    const width = stage.offsetWidth;
    const height = stage.offsetHeight;
    const imgFigure = ReactDOM.findDOMNode(this.refs.imgFigure0);
    const imgWidth = imgFigure.offsetWidth;
    const imgHeight = imgFigure.offsetHeight;
    // const area = {};
    // 左侧区域
    this.Constant.area.leftArea = {
        start: [0 - imgWidth / 2, 0 - imgHeight / 2],
        end: [width / 2 - 3 / 2 * imgWidth, height - imgHeight / 2]
    };
    // 右侧区域
    this.Constant.area.rightArea = {
        start: [width / 2 + imgWidth, 0 - imgHeight / 2],
        end: [width - imgWidth / 2, height - imgHeight / 2]
    };
    // 上侧区域
    this.Constant.area.topArea = {
        start: [width / 2 - imgWidth, 0 - imgHeight / 2],
        end: [width / 2 + imgWidth, height / 2 - imgHeight * 2 / 3]
      };

    this.setImgsState(this.state.selectedIndex);
  }

  // 设置图片的状态信息
  setImgsState (selectedIndex) {
    const imageStateArray = [];
    Object.assign(imageStateArray, this.state.imageStateArray);
    // const imageStateArray = this.state.imageStateArray;
    const stateArea = this.Constant.area;
    const leftArea = stateArea.leftArea,
          rightArea = stateArea.rightArea,
          topArea = stateArea.topArea;
    // 设置中间图片的位置信息
    const selectedImg = imageStateArray.splice(selectedIndex, 1)[0];
    selectedImg.pos = stateArea.center.pos;
    selectedImg.rotate = 0;

    // 设置顶部图片的位置信息(选取0-1张)
    const topImagesCount = Math.floor(Math.random() * 2);
    let topImg = null;
    const topImgIndex = Math.floor(Math.random() * imageStateArray.length);
    if (topImagesCount) {
      topImg = imageStateArray.splice(topImgIndex, 1)[0];
      if (!topImg.pos) {
        topImg.pos = {};
      }
      topImg = {
        pos: {
          left: getRandomData(topArea.start[0], topArea.end[0]) + 'px',
          top: getRandomData(topArea.start[1], topArea.end[1]) + 'px'
        },
        rotate: getRandomRotate()
      };
      // totest
      // topImg.pos.left = getRandomData(topArea.start[0], topArea.end[0]) + 'px';
      // topImg.pos.top = getRandomData(topArea.start[1], topArea.end[1]) + 'px';
    }

    // 设置左侧区域、右侧区域图片的位置信息
    for (let i = 0, len = imageStateArray.length, k = len / 2; i < len; i++) {
        let areaTemp = null;
        if (i < k) { // 放在左边
          areaTemp = leftArea;
        } else { // 放在右边
          areaTemp = rightArea;
        }
        imageStateArray[i] = {
          pos: {
            top: getRandomData(areaTemp.start[1], areaTemp.end[1]) + 'px',
            left: getRandomData(areaTemp.start[0], areaTemp.end[0]) + 'px'
          },
          rotate: getRandomRotate()
        }
    }
    if (topImg) {
      imageStateArray.splice(topImgIndex, 0, topImg);
    }
    imageStateArray.splice(selectedIndex, 0, selectedImg);

    // 设置状态
    this.setState({
      imageStateArray: imageStateArray
    });

  }

  componentWillMount () {
    // 放到redux中管理
    this.context.store.dispatch(galleryAction.setImageData(imageDatas));
  }

  render() {
    // console.log('@@@render:', this.context.store.getState());
    const imageList = this.context.store.getState().imageData.map((item, index) => {
      if (!this.state.imageStateArray[index]) {
        this.state.imageStateArray[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false
        }
      }
      return (
        <ImgFigure ref={'imgFigure' + index}
                   key={'img-figure' + index}
                   status={this.state.imageStateArray[index]}
                   index={index}
                   item={item}
                   selectedIndex={this.state.selectedIndex}
                   onClick={this.selectNewImage} />
      );
    });
    return (
      <section className="gallery-section" ref="stage">
        <ul className="image-list">
          {imageList}
        </ul>
        <PageBar
          pageLen={imageDatas.length}
          selectedIndex={this.state.selectedIndex}
          selectNewImage={this.selectNewImage}
          inverse={this.inverse}
        />
      </section>
    );
  }

  inverse = (index) => {
    const imageStateArray = this.state.imageStateArray;
    if (imageStateArray[index]) {
      imageStateArray[index].isInverse = !imageStateArray[index].isInverse;
      this.setState({
        imageStateArray: imageStateArray
      });
    }
  }

  selectNewImage = index => {
    if (index === this.state.selectedIndex) {
      // 翻转图片
      this.inverse(index, true);
    } else {
      this.setState({
        selectedIndex: index
      });
      this.setImgsState(index);
    }
  };
}

GallerySection.contextTypes = {
  store: PropTypes.object
};

export default GallerySection;
