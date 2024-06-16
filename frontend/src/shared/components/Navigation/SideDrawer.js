import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from 'src/shared/components/UIElements/Backdrop.js';  // Import the Backdrop component
import './SideDrawer.css';

const SideDrawer = props => {
  const content = (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onClick} />}  {/* Add the Backdrop component */}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
      </CSSTransition>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
