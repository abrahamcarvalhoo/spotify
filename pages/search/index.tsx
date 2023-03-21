import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Card, SearchLayout, Song } from 'components'
import { NextPageWithLayout } from 'pages/_app'

interface SearchProps {
  data: SpotifyApi.SearchResponse
}

const Search: NextPageWithLayout<SearchProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-3 md:gap-6'>
      <div className='flex flex-wrap gap-3 sm:gap-6'>
        <section className='flex flex-col gap-3 sm:gap-6'>
          <h2 className='text-base sm:text-3xl font-extrabold'>Top result</h2>
          <div className='min-w-min md:min-w-[24rem] max-w-lg'>
            {data.playlists?.items[0] && (
              <Card
                variant='large'
                uri={data.playlists.items[0].uri}
                imageUrl={data.playlists.items[0].images[0].url}
                name={data.playlists.items[0].name}
                caption={
                  <div className='flex items-center gap-2 mr-8'>
                    By {data.playlists.items[0].owner.display_name}
                    <div className='bg-dragonstone text-white font-semibold rounded-full uppercase px-3 py-1 w-min'>
                      Playlist
                    </div>
                  </div>
                }
                url={`/playlist/${data.playlists.items[0].id}`}
              />
            )}
          </div>
        </section>
        <section className='flex flex-col gap-3 sm:gap-6 flex-1'>
          <h2 className='text-base sm:text-3xl font-extrabold'>Songs</h2>
          <div className=''>
            {data?.tracks?.items.slice(0, 5).map((song) => (
              <Song key={song.id} {...song} />
            ))}
          </div>
        </section>
      </div>
      <section className='flex flex-col gap-3 sm:gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base sm:text-2xl font-extrabold'>Artists</h2>
        </div>
        <div className='max-md:card-grid-carousel md:card-grid-row'>
          {data.artists?.items.map(({ uri, id, images, name }) => (
            <Card
              key={id}
              uri={uri}
              imageUrl={images[0]?.url}
              name={name}
              caption={'Artist'}
              url={`/artist/${id}`}
              roundedImage
            />
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-3 sm:gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base sm:text-2xl font-extrabold'>Albums</h2>
        </div>
        <div className='max-md:card-grid-carousel md:card-grid-row'>
          {data.albums?.items.map(({ uri, id, images, name, artists }) => (
            <Card
              key={id}
              uri={uri}
              imageUrl={images[0]?.url}
              name={name}
              caption={artists[0].name}
              url={`/album/${id}`}
            />
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-3 sm:gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base sm:text-2xl font-extrabold'>Playlists</h2>
        </div>
        <div className='max-md:card-grid-carousel md:card-grid-row'>
          {data.playlists?.items.map(({ uri, id, images, name, description }) => (
            <Card
              key={id}
              uri={uri}
              imageUrl={images[0]?.url}
              name={name}
              caption={description}
              url={`/playlist/${id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Search
