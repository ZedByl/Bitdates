import { MutableRefObject, useEffect } from 'react';
import 'intersection-observer';

type UseObserverProps = {
  elem: MutableRefObject<Element | HTMLDivElement | undefined | null>,
  threshold?: number,
  func?: () => void
}

export const useObserver = ({
  elem,
  threshold = 0.2,
  func = () => {}
}: UseObserverProps) => {
  useEffect(() => {
    const viewObserver = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        const { target } = entry[0];
        viewObserver.unobserve(target);
        viewObserver.disconnect();
        func();
      }
    }, {
      threshold,
    });

    if (elem?.current) {
      viewObserver.observe(elem.current);
    }

    return () => {
      viewObserver.disconnect();
    };
  }, [threshold]);
};
