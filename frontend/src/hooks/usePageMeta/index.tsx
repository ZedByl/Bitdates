import { useEffect } from "react";

type Props = {
    title?: string;
    description?: string;
    favicon?: string;
}

const usePageMeta = ({
  title,
  description,
  favicon
}: Props) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaTag = document.querySelector("meta[name='description']");
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "description");
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", description);
    }

    if (favicon) {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [title, description, favicon]);
};

export default usePageMeta;
