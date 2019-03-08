// library to make server rendering fetch
import 'isomorphic-fetch'
import React, { Component } from 'react'
import Layout from '../components/Layout'
import GriidChannels from '../components/GriidChannels'

export default class extends Component {
    // function to load the main content when is needed to use an API
    static async getInitialProps(){
        // bring the data from Audioboom API
        let req = await fetch('https://api.audioboom.com/channels/recommended')

        // Bring the channels from body atribute
        let { body: channels } = await req.json()
        return { channels } 
    }
    render() {
      const { channels } = this.props  

      return (
        <Layout
          title="CoffeeCast"
        >
          <GriidChannels
            channels={channels}
          />
        </Layout>
      )
    }
}
