/**
 * Created by jfhuang on 17/6/18.
 */

import React from 'react';
// // import ReactDOM from 'react-dom';
//
// class Square extends Component {
//
//     render () {
//         return (
//             <div className="square-box" onClick={() => {
//                 this.props.onClick();
//             }}>
//                 {this.props.value}
//             </div>
//         );
//     }
// }

// Functional Components
function Square (props) {
        return (
            <div className="square-box" onClick={() => {
                props.onClick();
            }}>
                {props.value}
            </div>
        );
}

export default Square;
