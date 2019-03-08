import React, { Component } from 'react'
import Link from 'next/link'

export default class Layout extends Component {
  render() {
    const { title, children } = this.props
    return (
      <div>
        <header>
          <Link
            href="/"
          >
            <a>
              {title}
            </a>
          </Link>
        </header>
        <React.Fragment>
          {
            children
          }
        </React.Fragment>
        
        <style jsx>
          {`
            header{
              font-size: 40px;
              font-weight: 700;
              color: #FFF;
              padding: 15px;
              background-color: #1E1E1E;
            }
            header a
             {
              color: #fff;
              text-decoration: none;
            }
          `}
        </style>

        <style jsx global>
              {`
                body{
                  margin: 0;
                  background: #F6F6F8;
                  font-family: system-ui;
                }
              `}
          </style>
      </div>
    )
  }
}
