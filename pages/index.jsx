// library to make server rendering fetch
import 'isomorphic-fetch'
import React, { Component } from 'react'
import Layout from '../components/Layout'
import GriidChannels from '../components/GriidChannels'
import Error from 'next/error'

export default class extends Component {
  
    // function to load the main content when is needed to use an API
    static async getInitialProps({res}){
      // Handling errors with status code
      try{
        // bring the data from Audioboom API
        let req = await fetch('https://api.audioboom.com/channels/recommended')
  
        // Bring the channels from body atribute
        let { body: channels } = await req.json()
        return { channels, statusCode: 200 } 
      }
      catch(e){
        // Get the response of the server 
        res.statusCode = 503
        return { channels: null, statusCode: 503 }
      }

    }
    render() {
      const { channels, statusCode } = this.props  

      // Check the status code
      if(statusCode !== 200){
        return (
          <Error
            statusCode={statusCode}
          />
        )
      }

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
