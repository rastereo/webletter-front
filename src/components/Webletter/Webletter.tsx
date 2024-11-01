import { forwardRef } from 'react';
import './Webletter.css';

interface WebletterProps {
  id: string;
  url: string;
  isText: boolean;
  resizeIFrameToFirContent: () => void;
}

const Webletter = forwardRef<HTMLIFrameElement, WebletterProps>(
  ({ id, url, isText, resizeIFrameToFirContent }, ref) => {
    return (
      <section className={`webletter ${isText && 'hide'}`}>
        <iframe
          className="webletter__iframe"
          src={`${url}/webletter/${id}`}
          ref={ref}
          scrolling="no"
          onLoad={() => resizeIFrameToFirContent()}
        />
      </section>
    );
  }
);

export default Webletter;
