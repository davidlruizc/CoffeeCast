import React, { Component } from 'react'
import Layout from '../components/Layout'

export default class  extends Component {
    static async getInitialProps({ query }){
        let podcastId = query.id 

        // Request of the clip with format .mp3
        let reqClip = await fetch(`https://api.audioboom.com/audio_clips/${ podcastId }.mp3`)
        let dataPodcast = await reqClip.json()
        let podcastClip = dataPodcast.body.audio_clip

        return { podcastClip }
    }
  render() {
    const { podcastClip } = this.props
    return (
        <Layout title="CoffeeCast">
            <PodcastLayout
                podcastClip={podcastClip}
            />
        </Layout>
    )
  }
}
