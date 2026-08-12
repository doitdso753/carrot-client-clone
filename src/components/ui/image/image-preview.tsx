import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/assets/icons';

type ImagePreviewProps = {
  imageUrls: string[];
  initialImageIndex: number;
  title: string;
  onClose: () => void;
  onImageChange: (imageIndex: number) => void;
};

const MIN_ZOOM_SCALE = 1;
const MAX_ZOOM_SCALE = 2;
const ZOOM_SCALE_STEP = 0.25;

type ImagePreviewOffset = {
  x: number;
  y: number;
};

type ImagePreviewDirection = 'previous' | 'next';

export default function ImagePreview({
  imageUrls,
  initialImageIndex,
  title,
  onClose,
  onImageChange,
}: ImagePreviewProps): ReactNode {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [zoomScale, setZoomScale] = useState(MIN_ZOOM_SCALE);
  const [imageOffset, setImageOffset] = useState<ImagePreviewOffset>({
    x: 0,
    y: 0,
  });
  const [previewDirection, setPreviewDirection] =
    useState<ImagePreviewDirection | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const dragStartPointRef = useRef<ImagePreviewOffset>({ x: 0, y: 0 });
  const dragStartOffsetRef = useRef<ImagePreviewOffset>({ x: 0, y: 0 });
  const hasPreviousImage = currentImageIndex > 0;
  const hasNextImage = currentImageIndex < imageUrls.length - 1;
  const canZoomIn = zoomScale < MAX_ZOOM_SCALE;
  const canZoomOut = zoomScale > MIN_ZOOM_SCALE;
  const canDragImage = zoomScale > MIN_ZOOM_SCALE;

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  useEffect(() => {
    onImageChange(currentImageIndex);
  }, [currentImageIndex, onImageChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft' && hasPreviousImage) {
        setPreviewDirection('previous');
        setCurrentImageIndex((imageIndex) => imageIndex - 1);
        setZoomScale(MIN_ZOOM_SCALE);
        setImageOffset({ x: 0, y: 0 });
      }

      if (event.key === 'ArrowRight' && hasNextImage) {
        setPreviewDirection('next');
        setCurrentImageIndex((imageIndex) => imageIndex + 1);
        setZoomScale(MIN_ZOOM_SCALE);
        setImageOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasNextImage, hasPreviousImage, onClose]);

  const handleZoomIn = (): void => {
    setZoomScale((currentScale) =>
      Math.min(MAX_ZOOM_SCALE, currentScale + ZOOM_SCALE_STEP),
    );
  };

  const handleZoomOut = (): void => {
    setZoomScale((currentScale) => {
      const nextScale = Math.max(
        MIN_ZOOM_SCALE,
        currentScale - ZOOM_SCALE_STEP,
      );

      if (nextScale === MIN_ZOOM_SCALE) {
        setImageOffset({ x: 0, y: 0 });
      }

      return nextScale;
    });
  };

  const handlePreviousImage = (): void => {
    setPreviewDirection('previous');
    setCurrentImageIndex((imageIndex) => imageIndex - 1);
    setZoomScale(MIN_ZOOM_SCALE);
    setImageOffset({ x: 0, y: 0 });
  };

  const handleNextImage = (): void => {
    setPreviewDirection('next');
    setCurrentImageIndex((imageIndex) => imageIndex + 1);
    setZoomScale(MIN_ZOOM_SCALE);
    setImageOffset({ x: 0, y: 0 });
  };

  const handleImagePointerDown = (
    event: PointerEvent<HTMLImageElement>,
  ): void => {
    if (!canDragImage) {
      return;
    }

    setIsDraggingImage(true);
    dragStartPointRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    dragStartOffsetRef.current = imageOffset;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleImagePointerMove = (
    event: PointerEvent<HTMLImageElement>,
  ): void => {
    if (!isDraggingImage || !canDragImage) {
      return;
    }

    setImageOffset({
      x:
        dragStartOffsetRef.current.x +
        event.clientX -
        dragStartPointRef.current.x,
      y:
        dragStartOffsetRef.current.y +
        event.clientY -
        dragStartPointRef.current.y,
    });
  };

  const handleImagePointerEnd = (
    event: PointerEvent<HTMLImageElement>,
  ): void => {
    setIsDraggingImage(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const imageStyle = {
    '--image-preview-offset-x': `${imageOffset.x}px`,
    '--image-preview-offset-y': `${imageOffset.y}px`,
    '--image-preview-scale': zoomScale,
  } as CSSProperties;

  return (
    <div className="image-preview" role="dialog" aria-modal="true">
      <div className="image-preview-controls" aria-label="이미지 미리보기 조작">
        <button
          className="image-preview-button image-preview-button--zoom"
          type="button"
          aria-label="이미지 확대"
          disabled={!canZoomIn}
          onClick={handleZoomIn}
        >
          <ZoomInIcon />
        </button>
        <button
          className="image-preview-button image-preview-button--zoom"
          type="button"
          aria-label="이미지 축소"
          disabled={!canZoomOut}
          onClick={handleZoomOut}
        >
          <ZoomOutIcon />
        </button>
        <button
          className="image-preview-button image-preview-button--close"
          type="button"
          aria-label="이미지 미리보기 닫기"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="image-preview-viewport">
        <img
          className={`image-preview-image ${
            canDragImage ? 'is-draggable' : ''
          } ${isDraggingImage ? 'is-dragging' : ''} ${
            previewDirection ? `image-preview-image--${previewDirection}` : ''
          }`}
          key={`${currentImageIndex}-${previewDirection ?? 'initial'}`}
          src={imageUrls[currentImageIndex]}
          alt={`${title} 상품 이미지 ${currentImageIndex + 1} 미리보기`}
          draggable={false}
          style={imageStyle}
          onPointerDown={handleImagePointerDown}
          onPointerMove={handleImagePointerMove}
          onPointerCancel={handleImagePointerEnd}
          onPointerUp={handleImagePointerEnd}
        />
      </div>

      {hasPreviousImage && (
        <button
          className="image-preview-button image-preview-button--previous"
          type="button"
          aria-label="이전 이미지"
          onClick={handlePreviousImage}
        >
          <ChevronLeftIcon />
        </button>
      )}
      {hasNextImage && (
        <button
          className="image-preview-button image-preview-button--next"
          type="button"
          aria-label="다음 이미지"
          onClick={handleNextImage}
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}
