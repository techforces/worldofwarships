import { useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const LazyImage = ({ className, ...otherProps }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className={`${className ?? ""} ${
        loaded ? "opacity-100" : "opacity-0"
      } duration-200`}
      loading="lazy"
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      {...otherProps}
    />
  );
};

export default LazyImage;
