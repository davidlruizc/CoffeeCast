import React, { Component } from 'react'
import Layout from '../components/Layout'
import PodcastLayout from '../components/PodcastLayout'
import Error from 'next/error'

export default class  extends Component {
    static async getInitialProps({ query, res }){
        try{
            let podcastId = query.id 
    
            // Request of the clip with format .mp3
            let reqClip = await fetch(`https://api.audioboom.com/audio_clips/${ podcastId }.mp3`)
            let dataPodcast = await reqClip.json()
            let podcastClip = dataPodcast.body.audio_clip
    
            // Handling status 404
            if(reqClip.status >= 400){
                res.statusCode = reqClip.status
                return{ channel: null, audioClip: null, series: null, statusCode: reqClip.status }
            }

            return { podcastClip, statusCode: 200 }
        }
        catch(e){
            res.statusCode = 503
            return { podcastClip: null, statusCode: 503}
        }
    }
  render() {
    const { podcastClip, statusCode } = this.props

    if(statusCode !== 200){
        return(
            <Error
                statusCode={statusCode}
            />
        )
    }

    return (
        <Layout title="CoffeeCast">
            <PodcastLayout
                podcastClip={podcastClip}
            />
        </Layout>
    )
  }
}
