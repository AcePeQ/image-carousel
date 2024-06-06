import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import styles from "./ImageCarousel.module.css";

const initImages = [
  {
    id: 0,
    imageURL: `https://picsum.photos/id/77/750/500`,
    alt: "Photo 1",
  },
  {
    id: 1,
    imageURL: `https://picsum.photos/id/152/750/500`,
    alt: "Photo 2",
  },
  {
    id: 2,
    imageURL: `https://picsum.photos/id/11/750/500`,
    alt: "Photo 3",
  },
];

const imgLength = initImages.length;

function ImageCarousel() {
  const [imageIndex, setImageIndex] = useState(0);

  function handleNextImage() {
    setImageIndex((index) => {
      if (index === imgLength - 1) return 0;
      return index + 1;
    });
  }

  function handlePrevImage() {
    setImageIndex((index) => {
      if (index === 0) return imgLength - 1;
      return index - 1;
    });
  }

  function handleDotClick(index) {
    setImageIndex(index);
  }

  return (
    <div className={styles.imageBox}>
      <Button onClick={handlePrevImage} type="left">
        <ArrowBigLeft size={32} />
      </Button>
      <Button onClick={handleNextImage} type="right">
        <ArrowBigRight size={32} />
      </Button>
      <Dots
        images={initImages}
        onDotClick={handleDotClick}
        imageIndex={imageIndex}
      />
      {initImages.map((img) => (
        <Image image={img} key={img.id} imageIndex={imageIndex} />
      ))}
    </div>
  );
}

function Image({ image, imageIndex }) {
  return (
    <img
      className={styles.img}
      style={{ translate: `${-100 * imageIndex}%` }}
      src={image.imageURL}
      alt={image.alt}
    />
  );
}

function Dots({ images, onDotClick, imageIndex }) {
  return (
    <div className={styles.dots}>
      {images.map((_, index) => (
        <Dot
          onDotClick={onDotClick}
          key={index}
          index={index}
          imageIndex={imageIndex}
        />
      ))}
    </div>
  );
}

function Dot({ onDotClick, index, imageIndex }) {
  return (
    <button
      onClick={() => {
        onDotClick(index);
      }}
      className={`${styles.dot} ${index === imageIndex ? styles.active : ""}`}
    ></button>
  );
}

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btnSlider} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default ImageCarousel;
