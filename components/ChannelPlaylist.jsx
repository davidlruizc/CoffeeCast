import React, { Component } from 'react'
import Link from 'next/link'

 export default class ChannelPlaylist extends Component {
     render() {
        const { channel, audioClip, series } = this.props
          return(
              <React.Fragment>
                  <div 
                    className="banner" 
                    style={{ backgroundImage: `url(${ channel.urls.banner_image.original })` }}
                  />
                    <React.Fragment>
                    {
                        series.length > 0 &&
                        <div>
                            <h2 className="subtitles">Series</h2>
                            <div className="channels">
                            {
                              series.map(chapter => (
                                <div>
                                  <Link
                                      href={`/channel?id=${ chapter.id }`}
                                      prefetch
                                  >
                                    <a className="channel">
                                        <img 
                                        src={ chapter.urls.logo_image.original } 
                                        alt="logo image"
                                        />
                                        <h2>
                                        {
                                            chapter.title
                                        }
                                        </h2>
                                    </a>
                                  </Link>
                                </div>
                              ))
                            }
                            </div>
                      </div>
                    }
                    </React.Fragment>
                    <React.Fragment>
                      {
                        audioClip.length > 0 &&
                          <React.Fragment>
                            <h2 className="subtitles">Ultimos Podcast</h2>
                            {
                              audioClip.map(clip => (
                                <Link
                                prefetch
                                href={`/podcast?id=${ clip.id }`}
                                key={clip.id}
                                >
                                  <a className="podcast">
                                      <h3>
                                        { clip.title }
                                      </h3>
                                      <div className="meta">
                                        {
                                            // Returns the smallest integer greater than or equal to its numeric argument.
                                            Math.ceil( clip.duration / 60)
                                        } minutos
                                      </div>
                                  </a>
                                </Link>
                              ))
                            }
                          </React.Fragment>
                      }
                    </React.Fragment>
                <style jsx>
                  {`
                    header {
                        font-size: 40px;
                        font-weight: 700;
                        color: #FFF;
                        padding: 15px;
                        background-color: #1E1E1E;
                    }

                    .banner {
                        width: 100%;
                        padding-bottom: 25%;
                        background-position: 50% 50%;
                        background-size: cover;
                        background-color: #aaa;
                    }

                    .channels {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                    a.channel {
                        display: block;
                        margin-bottom: 0.5em;
                        color: #333;
                        text-decoration: none;
                    }
                    .channel img {
                        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;
                        border-radius: 8px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                        width: 100%;
                    }
                    .channel img:hover {
                        box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 24px;
                        transform: translateY(-3px);
                        transition: all 0.2s ease-in-out 0s;  
                    }
                    h1 {
                        font-weight: 600;
                        padding: 15px;
                    }
                    h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        margin: 0;
                        text-align: center;
                    }
                    .subtitles {
                        padding: 5px;
                        font-size: 22px;
                        font-weight: 400;
                        color: rgb(92, 97, 102);
                        line-height: 1.4;
                        margin: 0;
                        text-align: center;
                    }

                    .podcast {
                        display: block;
                        text-decoration: none;
                        color: #333;
                        padding: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.2);
                        cursor: pointer;
                    }
                    .podcast:hover {
                        color: #000;
                    }
                    .podcast h3 {
                        margin: 0;
                    }
                    .podcast .meta {
                        color: #666;
                        margin-top: 0.5em;
                        font-size: 0.8em;
                    }
                  `}
                </style>
              </React.Fragment>
          )
     }
 }