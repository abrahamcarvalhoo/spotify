import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'

import { SimplifiedPlaylistCard } from 'components'
import { useSpotify } from 'hooks'

export const RecommendsSection = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()

  const [title, setTitle] = useState<string>()
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // setIsLoading(true)
      spotifyApi
        .getFeaturedPlaylists({ limit: 5 })
        .then((data) => {
          setPlaylists(data.body.playlists?.items)
          setTitle(data.body.message)
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          // setIsLoading(false)
        })
    }
  }, [session, spotifyApi])

  return (
    <section className='flex flex-col gap-3 sm:gap-6'>
      <h2 className='text-base sm:text-3xl font-extrabold'>{title ?? 'Hello!'}</h2>
      <div className='grid grid-cols-2 xl:grid-cols-3 w-full gap-2 sm:gap-4'>
        <SimplifiedPlaylistCard
          uri={`spotify:user:${session?.user?.id as string}:collection`}
          imageUrl={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'}
          name={'Liked songs'}
          url={`/playlist/liked`}
        />
        {playlists?.map(({ uri, id, images, name }) => (
          <SimplifiedPlaylistCard
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            url={`/playlist/${id}`}
          />
        ))}
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
