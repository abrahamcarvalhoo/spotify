import SpotifyWebApi from 'spotify-web-api-node'

const scopes: string = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
  'user-library-modify',
].join(',')

const params = {
  scope: scopes,
}

const queryParamsString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  //redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
})
