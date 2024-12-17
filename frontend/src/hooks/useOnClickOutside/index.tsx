import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (Array.isArray(refs)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const refEl of refs) {
          const el = refEl?.current
          if (!el || el.contains((event?.target as Node) || null)) {
            return
          }
        }
      } else {
        const el = refs?.current
        if (!el || el.contains((event?.target as Node) || null)) {
          return
        }
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
