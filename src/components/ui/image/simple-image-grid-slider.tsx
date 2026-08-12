import type { ReactNode } from 'react';

type SimpleImageGridSliderProps = {
  imageUrls: string[];
  title: string;
};

// 가로 스크롤 이미지만 보여주는 슬라이더
export default function SimpleImageGridSlider({
  imageUrls,
  title,
}: SimpleImageGridSliderProps): ReactNode {
  return (
    <div className="simple-image-grid-slider-wrapper">
      <div className="simple-image-grid-slider">
        {imageUrls.map((imageUrl, index) => (
          <div
            className="simple-image-grid-slider-item"
            key={`${imageUrl}-${index}`}
          >
            <img src={imageUrl} alt={`${title} 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
