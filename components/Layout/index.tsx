import { Player, Preloader } from 'components'
import { useDimensions } from 'hooks'
import { Sidebar } from './components/Sidebar'
import { Content } from './components/Content'
import { GradientBackground } from './components/GradientBackground'
import { Header } from './components/Header'

interface LayoutProps {
  isLoading?: boolean
  gradientBrightness?: number
  headerOpacityOffset?: number
  headerOpacityDistance?: number
  children: React.ReactNode
  Controller?: React.FC<{ headerOpacity: number }>
}

export const Layout: React.FC<LayoutProps> = ({
  isLoading = false,
  gradientBrightness,
  headerOpacityOffset,
  headerOpacityDistance,
  children,
  Controller,
}) => {
  const { height } = useDimensions()

  return (
    <div className='bg-dragonstone' style={{ height: height + 'px' }}>
      <main className='flex flex-col-reverse md:flex-row'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <GradientBackground brightness={gradientBrightness} />
          <Header
            Controller={Controller}
            opacityDistance={headerOpacityDistance}
            opacityOffset={headerOpacityOffset}
          />
          <Content>
            {!isLoading ? (
              children
            ) : (
              <div className='h-3/4 w-full flex items-center justify-center'>
                <Preloader />
              </div>
            )}
          </Content>
        </div>
      </main>

      <Player />
    </div>
  )
}
