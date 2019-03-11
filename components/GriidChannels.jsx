import React, { Component } from 'react'
import {Link} from '../routes'
import slug from '../helpers/slug'

export default class GriidChannels extends Component {
  render() {
    const { channels } = this.props
    return (
        <React.Fragment>
            <div 
                className="channels" 
            >
                {
                    channels.map(channel => (
                    <Link 
                        prefetch
                        route="channel"
                        params={{
                            slug: slug(channel.title),
                            id: channel.id
                        }}
                        key={channel.id}
                    >
                        <a className="channel">
                        <img src={channel.urls.logo_image.original} alt="Podcast image"/>
                        <h2>{ channel.title }</h2>
                        </a>
                    </Link>
                    ))
                }
            </div>
            
            <style jsx>
                {`
                    /* Styled JSX*/
                    .channels {
                    max-width: 968px;
                    margin: auto;
                    display: grid;
                    grid-gap: 15px;
                    padding: 15px;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                    a.channel{
                    display: block;
                    margin-bottom: 0.5em;
                    color: #333;  
                    text-decoration: none;
                    }
                    .channel img:hover {
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 24px;
                    transform: translateY(-3px);
                    transition: all 0.2s ease-in-out 0s;  
                    }
                    .channel img{
                    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;
                    border-radius: 8px;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                    width: 100%;
                    }
                    h2 {
                    padding: 5px;
                    font-size: 0.9em;
                    font-weight: 600;
                    margin: 0;
                    text-align: center;
                    }
                `}
            </style>
        </React.Fragment>
    )
  }
}
