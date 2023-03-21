import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import { BaseButton, Layout } from 'components'
import { useDimensions } from 'hooks'

const config = {
  buttons: [
    { id: 'library-playlists', title: 'Playlists', url: '/library/playlists' },
    { id: 'library-artists', title: 'Artists', url: '/library/artists' },
    { id: 'library-albums', title: 'Albums', url: '/library/albums' },
  ],
}

const NavButtons = () => {
  const router = useRouter()
  return (
    <div className='flex items-center md:gap-4'>
      {config.buttons.map(({ id, title, url }) => (
        <BaseButton
          key={id}
          to={url}
          className={`btn-base rounded ${router.pathname === url && 'text-white bg-carbon'}`}
        >
          {title}
        </BaseButton>
      ))}
    </div>
  )
}

export const LibraryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { width } = useDimensions()

  return (
    <Layout
      headerOpacityOffset={0}
      headerOpacityDistance={150}
      Controller={() => (width >= 1080 ? <NavButtons /> : null)}
      gradientBrightness={0}
    >
      <div className='mx-3 md:mx-8 h-full'>
        {width < 1080 && <NavButtons />}
        <div className='mt-4 md:mt-6 mb-4 h-full'>{children}</div>
      </div>
    </Layout>
  )
}
