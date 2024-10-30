import { useEffect, useRef } from 'react';
import './Webletter.css';

interface WebletterProps {
  id: string;
  url: string;
  isText: boolean;
  size: number | null;
  isDark: boolean;
}

function Webletter({ id, url, isText, size, isDark }: WebletterProps) {
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

      const scriptDarkMode = iframeDoc.createElement('script');
      scriptDarkMode.type = "module"
      
      if (isDark) {
        scriptDarkMode.id = 'enebled-dark-mode'

        const scriptDisableDarkMode = iframeDoc.getElementById('disabled-dark-mode');

        console.log('ВКЛ', scriptDisableDarkMode);

        scriptDarkMode.text = `
          import 'https://cdn.jsdelivr.net/npm/darkreader@4.9.96/darkreader.min.js';

          DarkReader.enable({
            brightness: 90,
            contrast: 100,
            sepia: 0,
            grayscale: 0,
          });
        `;
    
      } else {
        scriptDarkMode.id = 'disabled-dark-mode'

        const scriptEnebleDarkMode = iframeDoc.getElementById('enebled-dark-mode');

        scriptEnebleDarkMode?.remove()
        
        scriptDarkMode.text = `
          import 'https://cdn.jsdelivr.net/npm/darkreader@4.9.96/darkreader.min.js';

          DarkReader.disable();
        `;
      }

      iframeDoc.body.appendChild(scriptDarkMode);
  }

  useEffect(() => {
    if (!isText) {
      resizeIFrameToFirContent(iframeRef.current);
    }
  }, [size]);

  useEffect(() => {
      addDarkMode(iframeRef.current);
  }, [isDark]);

  return (
    <section className={`webletter ${isText && 'hide'}`}>
      <iframe
        className="webletter__iframe"
        src={`${url}/webletter/${id}`}
        ref={iframeRef}
        scrolling="no"
        onLoad={() => resizeIFrameToFirContent(iframeRef.current)}
      />
    </section>
  );
}

export default Webletter;
