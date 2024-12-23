import React, { useState, useEffect, useRef } from "react";

type LazyImageWithFallbackProps = {
    src: string; // URL основного изображения
    defaultSrc: string; // URL изображения по умолчанию
    alt: string; // Альтернативный текст
    className?: string; // Кастомный класс CSS
    style?: React.CSSProperties; // Inline-стили
};

const LazyImageWithFallback: React.FC<LazyImageWithFallbackProps> = ({
                                                                         src,
                                                                         defaultSrc,
                                                                         alt,
                                                                         className,
                                                                         style,
                                                                     }) => {
    const [currentSrc, setCurrentSrc] = useState<string>(defaultSrc);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const img = new Image();
        img.src = src;

        img.onload = () => setCurrentSrc(src);
        img.onerror = () => setCurrentSrc(defaultSrc);
    }, [isVisible, src, defaultSrc]);

    return (
        <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            className={className}
            style={style}
        />
    );
};

export default LazyImageWithFallback;

// Пример использования
// <LazyImageWithFallback
//   src="https://example.com/image.jpg"
//   defaultSrc="/path/to/default-image.jpg"
//   alt="Example Image"
//   className="custom-class"
//   style={{ width: 300, height: 200 }}
// />
