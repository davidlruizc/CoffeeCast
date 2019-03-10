import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class Layout extends Component {
  render() {
    const { title, children } = this.props
    return (
      <div>
        <Head>
          <title>{ title }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        </Head>
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
              font-size: 30px;
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
