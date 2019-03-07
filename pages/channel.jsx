import React, { Component } from 'react'

export default class extends Component {
    // fetching the data from a channel
    static async getInitialProps({query}){
        // Getting the id from the channel
        let channelId = query.id 

        let reqChannel = await fetch(`https://api.audioboom.com/channels/${channelId}`)

        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel

        // audio_clips is going to list the last podcast of the channel
        let reqAudio = await fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`)

        let dataAudio = await reqAudio.json()
        let audioClip = dataAudio.body.audio_clips

        // if a channel has subchannels 
        let reqSeries = await fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)

        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels

        return { channel, audioClip, series } 
    }

  render() {
    const { channel, audioClip, series } = this.props  
    return (
      <React.Fragment>
          <header>CoffeeCast</header>
          <h1>{ channel.title }</h1>
          {
              audioClip.map(clip => (
                  <div>{clip.title}</div>
              ))
          }
          <h1>Series</h1>
          {
              series.map(chapter => (
                  <div>
                      {chapter.title}
                  </div>
              ))
          }
      </React.Fragment>
    )
  }
}
