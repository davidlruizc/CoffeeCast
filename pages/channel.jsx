import 'isomorphic-fetch'
import React, { Component } from 'react'
import Layout from '../components/Layout'
import ChannelPlaylist from '../components/ChannelPlaylist'
import Error from 'next/error'

export default class extends Component {
  // fetching the data from a channel
  static async getInitialProps({query, res}){
    try {
      // Getting the id from the channel
      let channelId = query.id 

      // Parallel request
      let [ reqChannel, reqAudio, reqSeries ] = await Promise.all([
          fetch(`https://api.audioboom.com/channels/${channelId}`),
          fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
          fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)
      ])
      
      // Handling status 404
      if(reqChannel.status >= 400){
        res.statusCode = reqChannel.status
        return{ channel: null, audioClip: null, series: null, statusCode: reqChannel.status }
      }

      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel

      // audio_clips is going to list the last podcast of the channel        
      let dataAudio = await reqAudio.json()
      let audioClip = dataAudio.body.audio_clips

      // if a channel has subchannels 
      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels

      return { channel, audioClip, series, statusCode: 200 } 
    }
    catch(e){
      // Set the status code the get from the server
      res.statusCode = 503
      return{ channel: null, audioClip: null, series: null, statusCode: 503 }
    }
  }

  render() {
    const { channel, audioClip, series, statusCode } = this.props  

    if(statusCode !== 200) {
      return(
        <Error
          statusCode={statusCode}
        />
      )
    }

    return (
      <Layout
        title={channel.title}
      >
        <ChannelPlaylist
          channel={channel}
          audioClip={audioClip}
          series={series}
        /> 
      </Layout>
    )
  }
}