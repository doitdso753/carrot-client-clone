import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import ImagePreview from '@/components/ui/image-preview';

type ImageGridSliderProps = {
  imageUrls: string[];
  title: string;
};

type ImageGridSliderDirection = 'previous' | 'next';

const SLIDER_ANIMATION_DURATION = 420;

export default function ImageGridSlider({
  imageUrls,
  title,
}: ImageGridSliderProps): ReactNode {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [canSlidePrevious, setCanSlidePrevious] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);
  const [slideDirection, setSlideDirection] =
    useState<ImageGridSliderDirection | null>(null);

  const updateSlideState = useCallback((): void => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    setCanSlidePrevious(slider.scrollLeft > 0);
    setCanSlideNext(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    updateSlideState();

    window.addEventListener('resize', updateSlideState);

    return () => {
      window.removeEventListener('resize', updateSlideState);
    };
  }, [imageUrls.length, updateSlideState]);

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  const getSlideDistance = (): number => {
    const slider = sliderRef.current;
    const firstImage = slider?.querySelector<HTMLButtonElement>(
      '.image-grid-slider-item',
    );

    if (!slider || !firstImage) {
      return 0;
    }

    const sliderStyle = window.getComputedStyle(slider);
    const parsedColumnGap = Number.parseFloat(sliderStyle.columnGap || '0');
    const columnGap = Number.isNaN(parsedColumnGap) ? 0 : parsedColumnGap;

    return firstImage.offsetWidth + columnGap;
  };

  const handleSlide = (direction: ImageGridSliderDirection): void => {
    const slider = sliderRef.current;
    const slideDistance = getSlideDistance();

    if (!slider || slideDistance === 0) {
      return;
    }

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    setSlideDirection(direction);
    slider.scrollBy({
      left: direction === 'next' ? slideDistance : -slideDistance,
      behavior: 'smooth',
    });
    animationTimerRef.current = setTimeout(() => {
      setSlideDirection(null);
    }, SLIDER_ANIMATION_DURATION);
  };

  const openPreview = (imageIndex: number): void => {
    setCurrentImageIndex(imageIndex);
    setIsPreviewOpen(true);
  };

  const closePreview = (): void => {
    setIsPreviewOpen(false);
  };

  const handlePreviewImageChange = (imageIndex: number): void => {
    setCurrentImageIndex(imageIndex);
  };

  const sliderStyle = {
    '--image-grid-slider-count': imageUrls.length,
  } as CSSProperties;

  return (
    <>
      <div className="image-grid-slider-wrapper">
        <div
          className={`image-grid-slider ${
            slideDirection ? `image-grid-slider--${slideDirection}` : ''
          }`}
          ref={sliderRef}
          style={sliderStyle}
          onScroll={updateSlideState}
        >
          {imageUrls.map((imageUrl, index) => (
            <button
              className="image-grid-slider-item"
              key={`${imageUrl}-${index}`}
              type="button"
              aria-label={`${title} 이미지 ${index + 1} 미리보기`}
              onClick={() => openPreview(index)}
            >
              <img src={imageUrl} alt={`${title} 이미지 ${index + 1}`} />
            </button>
          ))}
        </div>

        {canSlidePrevious && (
          <button
            className="image-grid-slider-nav-button image-grid-slider-nav-button--previous"
            type="button"
            aria-label="이전 이미지"
            onClick={() => handleSlide('previous')}
          >
            <ChevronLeftIcon />
          </button>
        )}
        {canSlideNext && (
          <button
            className="image-grid-slider-nav-button image-grid-slider-nav-button--next"
            type="button"
            aria-label="다음 이미지"
            onClick={() => handleSlide('next')}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>

      {isPreviewOpen && (
        <ImagePreview
          imageUrls={imageUrls}
          initialImageIndex={currentImageIndex}
          title={title}
          onClose={closePreview}
          onImageChange={handlePreviewImageChange}
        />
      )}
    </>
  );
}
