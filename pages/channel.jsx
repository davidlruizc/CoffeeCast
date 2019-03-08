import React, { Component } from 'react'
import Link from 'next/link'

export default class extends Component {
    // fetching the data from a channel
    static async getInitialProps({query}){
        // Getting the id from the channel
        let channelId = query.id 

        // Parallel request
        let [ reqChannel, reqAudio, reqSeries ] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${channelId}`),
            fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
            fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)
        ])
        
        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel

        // audio_clips is going to list the last podcast of the channel        
        let dataAudio = await reqAudio.json()
        let audioClip = dataAudio.body.audio_clips

        // if a channel has subchannels 
        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels

        return { channel, audioClip, series } 
    }

  render() {
    const { channel, audioClip, series } = this.props  
    return (
      <React.Fragment>
          <header>CoffeeCast</header>
          <div 
            className="banner" 
            style={{ backgroundImage: `url(${ channel.urls.banner_image.original })` }}
          />

          <h1>{ channel.title }</h1>
          <React.Fragment>
            {
              series.length > 0 &&
                <div>
                  <h2>Series</h2>
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
          <h2>Ultimos Podcast</h2>
          <React.Fragment>
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
        <style jsx>
          {`
            header {
              color: #fff;
              background: #8756ca;
              padding: 15px;
              text-align: center;
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
              border-radius: 3px;
              box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
              width: 100%;
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

      <style jsx global>
        {`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}
      </style>
      </React.Fragment>
    )
  }
}
