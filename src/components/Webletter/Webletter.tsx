import { forwardRef } from 'react';
import './Webletter.css';
import { Link } from 'react-router-dom';

interface WebletterProps {
  id: string;
  isText: boolean;
  resizeIFrameToFirContent: () => void;
}

const Webletter = forwardRef<HTMLIFrameElement, WebletterProps>(
  ({ id, isText, resizeIFrameToFirContent }, ref) => {
    const webletterUrl =
      process.env.NODE_ENV === 'development'
        ? '../../../test/index.html'
        : `${import.meta.env.VITE_APP_WEBLETTER_URL}/${id}`;

    return (
      <section className={`webletter ${isText && 'hide'}`}>
        <iframe
          className="webletter__iframe"
          src={webletterUrl}
          ref={ref}
          scrolling="no"
          onLoad={() => resizeIFrameToFirContent()}
        />
        <p className="webletter__unsubscribe">
          Чтобы отписаться от этой рассылки, перейдите по <Link to="" className="webletter__link">ссылке</Link>
        </p>
      </section>
    );
  }
);

export default Webletter;
