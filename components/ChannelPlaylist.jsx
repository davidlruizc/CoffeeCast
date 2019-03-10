import React, { Component } from 'react'
import GriidChannels from './GriidChannels';
import PodcastListWithPlayer from './PodcastListWithPlayer';
import PodcastLayout from './PodcastLayout';

 export default class ChannelPlaylist extends Component {
  constructor(props){
    super(props)
    // State for the podcast modal
    this.state = { openPodcast: null }
  }

  openPodcast = (event, podcast) => {
    // Remove all the native states
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render() {
    const { channel, audioClip, series } = this.props
    const { openPodcast } = this.state

    return(
      <React.Fragment>
        { openPodcast && 
          <div className="modal">
            <PodcastLayout
              podcastClip={openPodcast}
              onClose={this.closePodcast}
            />
          </div> 
        }
        <div 
          className="banner" 
          style={{ backgroundImage: `url(${ channel.urls.banner_image.original })` }}
        />
        <React.Fragment>
        {
          series.length > 0 &&
          <div>
              <h2 className="subtitles">Series</h2>
              <GriidChannels
                channels={series}
              />
          </div>
        }
        </React.Fragment>
        <React.Fragment>
          {
            audioClip.length > 0 &&
              <React.Fragment>
                <h2 className="subtitles">Ultimos Podcast</h2>
                <PodcastListWithPlayer
                  podcasts={audioClip}
                  onClickPodcast={this.openPodcast}
                />
              </React.Fragment>
          }
        </React.Fragment>
        <style jsx>
          {`
            .banner {
                width: 100%;
                padding-bottom: 25%;
                background-position: 50% 50%;
                background-size: cover;
                background-color: #aaa;
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
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 99999;
            }
          `}
        </style>
      </React.Fragment>
    )
  }
 }