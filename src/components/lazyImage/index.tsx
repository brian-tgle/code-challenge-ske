import { FC, useEffect, useRef, useState } from 'react'
import { LazyImageProps } from 'intefaces'
import './style.scss'

const elementInViewport = (element: HTMLImageElement | null) => {
  const rect = element?.getBoundingClientRect()
  if (rect) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (
        window.innerHeight || document.documentElement.clientHeight
      )
    )
  }
  return 0
}

const LazyImage: FC<LazyImageProps> = ({ src, placeHolder, width, height, alt, keepRatio }) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (!loaded && elementInViewport(imgRef.current)) {
      // Load real image
      const imgLoader = new Image()
      imgLoader.src = src
      imgLoader.onload = () => {
        const ratioWH = imgLoader.width / imgLoader.height

        imgRef.current?.setAttribute(
          'src',
          `${src}`
        )

        keepRatio && imgRef.current?.setAttribute(
          'height',
          `${width / ratioWH}`
        )

        imgRef.current?.classList.add('opacity')

        setLoaded(true)
      }
    }
  }

  return (
    <img
      src={placeHolder}
      width={width}
      height={height}
      ref={imgRef}
      className="lazy-image"
      alt={alt}
    />
  )
}

export default LazyImage
