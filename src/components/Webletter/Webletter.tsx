import { useEffect, useRef } from 'react';
import './Webletter.css';

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
        iframe.style.height = iframeDoc.body.scrollHeight + 'px';
      }
    }
  }

  function addDarkMode(iframe: HTMLIFrameElement | null) {
    if (!iframe) return console.error('iframe is null');

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return console.error('iframeDoc is null');

    const scriptElement = iframeDoc.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.text = `
        (${function () {
    DarkReader.enable({
      brightness: 90,
      contrast: 100,
      sepia: 0,
      grayscale: 0,
    });
  }.toString()})();
    `;

    console.log(scriptElement);
    console.log(scriptElement.text);

    iframeDoc.body.appendChild(scriptElement);
  }

  useEffect(() => {
    if (!isText) {
      resizeIFrameToFirContent(iframeRef.current);
    }
  }, [size]);

  useEffect(() => {
    addDarkMode(iframeRef.current);
  }, []);

  return (
    <section className={`webletter ${isText && 'hide'}`}>
      <iframe
        className="webletter__iframe"
        src={`${url}/webletter/${id}`}
        ref={iframeRef}
        scrolling="no"
        onLoad={() => resizeIFrameToFirContent(iframeRef.current)}
        // style={{ filter: 'invert(1)'}}
      />
    </section>
  );
}

export default Webletter;
