import "./Preview.css";

interface PreviewProps {
  size: number | null;
  exhibition: string;
  upload_date: string;
  title: string;
  preheader: string;
}

function Preview({
  size,
  exhibition,
  upload_date,
  title,
  preheader
}: PreviewProps) {
  function createMonthAndDay(uploadDate: string): string {
    const shortMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(uploadDate);

    const month = shortMonth[date.getMonth()];

    const day = date.getDate();

    return `${month} ${day}`;
  }

  return (
    <section className="preview">
      {size ? (
        <div className={`preview__container preview__container_mobile`}>
          <div className="preview__wrapper">
            <p className="preview__name preview__name_mobile">{exhibition}</p>
            <p className="preview__date preview__date_mobile">
              {createMonthAndDay(upload_date)}
            </p>
          </div>
          <p>
            <span className="preview__title preview__title_mobile">
              {title}
            </span>
          </p>
          <p className="preview__preheader preview__preheader_mobile">
            {preheader}
          </p>
        </div>
      ) : (
        <div className="preview__container">
          <p className="preview__name">{exhibition}</p>
          <p>
            <span className="preview__title">{title}</span>{" "}
            <span className="preview__preheader">- {preheader}</span>
          </p>
          <p className="preview__date">
            {createMonthAndDay(upload_date)}
          </p>
        </div>
      )}
    </section>
  );
}

export default Preview;
