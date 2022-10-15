import './styles.css';
import { useThree, useFrame } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useTransform, useScroll, useTime } from 'framer-motion';
import { degreesToRadians } from 'popmotion';

const color = '#111111';

function Scene({ numStars = 100 }) {
  const gl = useThree(state => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(0.3));

  return (
    <>
      <h1>Dare Goodness</h1>
    </>
  );
}

export default function App() {
  return (
    <div className='container'>
      <Scene />
    </div>
  );
}
