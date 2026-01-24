import { Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive'
import AnimatedHeader, {
  type AnimatedHeaderProps,
} from '../components/animated-header'
import Planet from '../components/planet'

// NOTE:
// 1. the line break is needed and will be used to animate with <AnimatedTextLines/>
// 2. the 3D object movement is animated in <Planet/>

const HEADER: AnimatedHeaderProps = {
  title: 'noidilin',
  subTitle: '3D artist based in Taipei',
  brief: `I specialize in building realistic virtual scenes
    prefecting vritual user interaction experiences
    through different 3D package solutions`,
  textColor: 'text-foreground',
}

function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 })

  return (
    <section id="home" className="flex min-h-screen flex-col justify-end">
      <AnimatedHeader {...HEADER} />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          {/* HACK: this is where the float animation comes from */}
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            {/* NOTE: WebGL use radians not degrees
             * 1. Math.PI = 180 degrees
             * 2. Math.PI / 2 = 90 degrees
             * the number '4', and '1' were found through trial and error
             */}
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={'circle'}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  )
}

export default Hero
