import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeftIcon } from '@/assets/icons';
import ImagePreview from '@/components/ui/image/image-preview.tsx';

type GalleryImagePreviewProps = {
  imageUrls: string[];
  title: string;
  onClose: () => void;
};

export default function GalleryImagePreview({
  imageUrls,
  title,
  onClose,
}: GalleryImagePreviewProps): ReactNode {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && selectedImageIndex === null) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, selectedImageIndex]);

  const closeImagePreview = (): void => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="gallery-image-preview" role="dialog" aria-modal="true">
      <h2 className="sr-only">{title} 이미지 전체보기</h2>
      <header className="gallery-image-preview-header">
        <button
          className="gallery-image-preview-close-button"
          type="button"
          aria-label="이미지 전체보기 닫기"
          onClick={onClose}
        >
          <ChevronLeftIcon />
        </button>
      </header>

      <div className="gallery-image-preview-scroll-area">
        <div className="gallery-image-preview-grid">
          {imageUrls.map((imageUrl, index) => (
            <button
              className="gallery-image-preview-item"
              type="button"
              aria-label={`${title} 상품 이미지 ${index + 1} 미리보기`}
              key={`${imageUrl}-${index}`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                className="gallery-image-preview-image"
                src={imageUrl}
                alt={`${title} 상품 이미지 ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImagePreview
          imageUrls={imageUrls}
          initialImageIndex={selectedImageIndex}
          title={title}
          onClose={closeImagePreview}
          onImageChange={setSelectedImageIndex}
        />
      )}
    </div>
  );
}
