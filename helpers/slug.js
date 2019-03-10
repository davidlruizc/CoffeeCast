import slugify from 'slugify'

export default function slug(name){
    // Return the channel name in lowercase and change space with - using Regexp
    return slugify(name, {lower: true}).replace(/[^\w\-]+/g, '')
}