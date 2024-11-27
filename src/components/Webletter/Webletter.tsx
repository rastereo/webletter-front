import { forwardRef } from 'react';
import './Webletter.css';

interface WebletterProps {
  id: string;
  isText: boolean;
  resizeIFrameToFirContent: () => void;
}

const Webletter = forwardRef<HTMLIFrameElement, WebletterProps>(
  ({ id, isText, resizeIFrameToFirContent }, ref) => {
    const webletterUrl = `${import.meta.env.VITE_APP_WEBLETTER_URL}/${id}`;

    return (
      <section className={`webletter ${isText && 'hide'}`}>
        <iframe
          className="webletter__iframe"
          src={webletterUrl}
          ref={ref}
          scrolling="no"
          onLoad={() => resizeIFrameToFirContent()}
        />
      </section>
    );
  }
);

export default Webletter;
