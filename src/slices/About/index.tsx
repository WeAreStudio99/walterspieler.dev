import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <section
      className='flex justify-center'
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <svg
        className='absolute bottom-0 z-0 w-screen h-full'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>Shadow</title>
        <g filter='url(#a)'>
          <path
            d='M919.425 1003.19c81.765 78.52 48.298 224.85 160.315 242.02 22.91 3.51 36.5 3.92 59.34 0 133.1-22.85 66.78-228.56 0-346.001-35.06-61.669-64.41-89.592-118.83-135.08-48.87-40.852-79.48-73.274-139.357-94.978-48.919-17.732-85.872-27.144-135.142-10.412-44.648 15.162-76.239 36.199-89.017 81.61-13.556 48.173-6.403 81.716 19.266 124.668 52.817 88.381 169.172 66.872 243.425 138.173Z'
            fill='#00A3FF'
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='1898'
            id='a'
            width='1866'
            x='0'
            y='0'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              result='effect1_foregroundBlur_47_3'
              stdDeviation='325'
            />
          </filter>
        </defs>
      </svg>
      <div className='flex flex-col items-center justify-center w-3/4'>
        <PrismicNextImage className='rounded-lg' field={slice.primary.image} />
        <h2 className='text-5xl md:text-6xl font-bold my-10 text-center'>
          {slice.primary.title}
        </h2>
        <div className='text-lg md:text-xl text-center'>
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
    </section>
  );
};

export default About;
