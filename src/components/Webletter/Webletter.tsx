import { useEffect, useRef } from "react";
import "./Webletter.css";

interface WebletterProps {
  id: string;
  url: string;
  isText: boolean;
  size: number | null;
}

function Webletter({ id, url, isText, size }: WebletterProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  function resizeIFrameToFirContent(iframe: HTMLIFrameElement | null) {
    if (iframe) {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframe.style.height = iframeDoc.body.scrollHeight + "px";
      }
    }
  }

  useEffect(() => {
    if (!isText) {
      resizeIFrameToFirContent(iframeRef.current);
    }
  }, [size]);

  return (
    <section className={`webletter ${isText && 'hide'}`}>
      <iframe
        className="webletter__iframe"
        src={`${url}/webletter/${id}`}
        ref={iframeRef}
        scrolling="no"
        onLoad={() => resizeIFrameToFirContent(iframeRef.current)}
        // onError={() => setIsErrorWebletter(true)}
      />
    </section>
  );
}

export default Webletter;
