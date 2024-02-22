import Button from '@/components/Button';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `HomeHeader`.
 */
export type HomeHeaderProps = SliceComponentProps<Content.HomeHeaderSlice>;

/**
 * Component for "HomeHeader" Slices.
 */
const HomeHeader = ({ slice }: HomeHeaderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='h-screen flex items-center justify-center text-white relative overflow-hidden'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1512'
        height='722'
        fill='none'
        className='absolute top-0 z-0'
      >
        <g filter='url(#a)'>
          <path
            fill='#FF7B00'
            d='M931.053-1025.35c130.717 145.544 129.987 307.775 138.587 503.244 13.23 300.993-126.23 674.391-411.912 578.804-260.473-87.153 49.326-497.638-149.281-687.356-70.683-67.52-162.861-48.743-211.826-133.347-61.773-106.735-38.964-213.609 32.485-314.155 73.596-103.57 170.487-145.56 296.896-133 136.121 13.52 213.654 84.04 305.051 185.81Z'
          />
        </g>
        <defs>
          <filter
            id='a'
            width='2109.71'
            height='2585.26'
            x='-389.208'
            y='-1863.32'
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              result='effect1_foregroundBlur_9_170'
              stdDeviation='325'
            />
          </filter>
        </defs>
      </svg>
      <div className='flex items-center justify-center flex-col w-3/4 text-center'>
        <h1 className='text-5xl md:text-8xl font-bold bg-gradient-to-t from-transparent via-picton-blue to-picton-blue inline-block text-transparent bg-clip-text'>
          {slice.primary.title}
        </h1>
        <p className='text-2xl md:text-7xl font-bold mt-4 text-center text-stone-300'>
          {slice.primary.subtitle}
        </p>
      </div>
      <Button text='See more' className={'absolute bottom-10'} />
    </section>
  );
};

export default HomeHeader;
