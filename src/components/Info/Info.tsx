import { useEffect, useState } from "react";
import { Badge } from "@chakra-ui/react";

import "./Info.css";


interface InfoProps {
  uploadDate: string;
  size: number;
}

function Info({ uploadDate, size }: InfoProps) {
  const [Info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(uploadDate);

    const localTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const localDate = date.toLocaleDateString();

    setInfo(`${localTime} ${localDate}`);
  }, [uploadDate]);

  return (
    <section className="info">
      <p className="info__last-update">Last update: {Info}</p>
      <p className="info__size">
        Size:{" "}
        <Badge colorScheme={size > 1e6 ? "red" : "green"}>
          {(size / 1e6).toFixed(2)}MB
        </Badge>
      </p>
    </section>
  );
}

export default Info;
