import { useState, type ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import GalleryImagePreview from '@/components/ui/gallery-image-preview';
import ImagePreview from '@/components/ui/image-preview';

type ImageSliderProps = {
  imageUrls: string[];
  title: string;
  isShowImageGallery?: boolean;
};

type ImageSlideDirection = 'previous' | 'next';

export default function ImageSlider({
  imageUrls,
  title,
  isShowImageGallery = false,
}: ImageSliderProps): ReactNode {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [slideDirection, setSlideDirection] =
    useState<ImageSlideDirection>('next');
  const hasPreviousImage = currentImageIndex > 0;
  const hasNextImage = currentImageIndex < imageUrls.length - 1;

  const handlePreviousImage = (): void => {
    setSlideDirection('previous');
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex((currentIndex) => currentIndex - 1);
  };

  const handleNextImage = (): void => {
    setSlideDirection('next');
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex((currentIndex) => currentIndex + 1);
  };

  const openPreview = (): void => {
    setIsPreviewOpen(true);
  };

  const closePreview = (): void => {
    setIsPreviewOpen(false);
  };

  const openGallery = (): void => {
    setIsGalleryOpen(true);
  };

  const closeGallery = (): void => {
    setIsGalleryOpen(false);
  };

  const handlePreviewImageChange = (imageIndex: number): void => {
    setPreviousImageIndex(null);
    setCurrentImageIndex(imageIndex);
  };

  const sliderImages =
    previousImageIndex === null
      ? [currentImageIndex]
      : slideDirection === 'next'
        ? [previousImageIndex, currentImageIndex]
        : [currentImageIndex, previousImageIndex];

  return (
    <>
      <div className="image-slider">
        <button
          className="image-slider-preview-button"
          type="button"
          aria-label="이미지 미리보기 열기"
          onClick={openPreview}
        >
          <span
            className={`image-slider-track ${
              previousImageIndex !== null
                ? `image-slider-track--pair image-slider-track--${slideDirection}`
                : ''
            }`}
            key={`${previousImageIndex ?? 'initial'}-${currentImageIndex}-${slideDirection}`}
          >
            {sliderImages.map((imageIndex) => (
              <img
                className="image-slider-image"
                key={`${imageUrls[imageIndex]}-${imageIndex}`}
                src={imageUrls[imageIndex]}
                alt={`${title} 상품 이미지 ${imageIndex + 1}`}
              />
            ))}
          </span>
        </button>
        {hasPreviousImage && (
          <button
            className="image-slider-nav-button image-slider-nav-button--previous"
            type="button"
            aria-label="이전 상품 이미지"
            onClick={handlePreviousImage}
          >
            <ChevronLeftIcon />
          </button>
        )}
        {hasNextImage && (
          <button
            className="image-slider-nav-button image-slider-nav-button--next"
            type="button"
            aria-label="다음 상품 이미지"
            onClick={handleNextImage}
          >
            <ChevronRightIcon />
          </button>
        )}
        {!isShowImageGallery && (
          <div
            className="image-slider-dots"
            aria-label={`이미지 ${imageUrls.length}개 중 ${currentImageIndex + 1}번째`}
          >
            {imageUrls.map((imageUrl, index) => (
              <span
                className={index === currentImageIndex ? 'is-active' : ''}
                key={imageUrl}
              />
            ))}
          </div>
        )}
        {isShowImageGallery && (
          <button
            className="image-slider-gallery-button"
            type="button"
            onClick={openGallery}
          >
            {currentImageIndex + 1}/{imageUrls.length}
            <span className="image-slider-gallery-divider" aria-hidden="true" />
            전체보기
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
      {isGalleryOpen && (
        <GalleryImagePreview
          imageUrls={imageUrls}
          title={title}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
