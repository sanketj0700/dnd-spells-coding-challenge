import React, { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import logger from '../../services/logger';
import { navBarText } from './navBarText';

import './styles.css';

const navLinkClickHandler = (): MouseEventHandler<HTMLAnchorElement> | undefined => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return
}

function NavBar(): JSX.Element {

  const mediaMatch = window.matchMedia('(min-width: 991px)');

  const screenSizeChangeHandler = (e: any) => {
    if (e.matches) {
      setCollapsed(true);
    }
  };


  mediaMatch.addEventListener("change", screenSizeChangeHandler);

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavCollapse = () => {
    setCollapsed(!collapsed);
  }

  try {
    return (
      <div className='NavBar'>
        <div className="navbar-wrapper" data-testid="navbar">
          <div className='navbar-logo'>
            Dungeons & Dragons
          </div>
          <div className='navbar-nav-container'>
            <div className='navbar-nav-links-container'>
              {
                navBarText.map((navLink, index) => {
                  return (
                    <Link key={index.toString()} onClick={navLinkClickHandler()} className="navbar-nav-link" to={navLink.url}> {navLink.linkTitle} </Link>
                  )
                })
              }
            </div>
            <div className='navbar-links-collapse-menu-icon'>
              <img className='navbar-links-collapse-menu-icon-img'
                src="./navMenu.png"
                alt="NavMenu"
                onClick={() => toggleNavCollapse()}
              />
            </div>
            <div className='navbar-links-collapse-menu-container'
              style={{ display: (collapsed ? "none" : "block") }}
            >
              <div className='navbar-links-collapse-menu'>
                {
                  navBarText.map((navLink, index) => {
                    return (
                      <div key={index.toString()} className="navbar-collapse-link">
                        <Link onClick={navLinkClickHandler()} className="navbar-nav-link" to={navLink.url}> {navLink.linkTitle} </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    logger(2, "ListItem", error)
    return <></>
  }
}

export default NavBar;