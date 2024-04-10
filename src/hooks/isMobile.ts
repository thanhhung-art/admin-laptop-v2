import { useEffect, useState } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTable, setIsTable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window && window.innerWidth < 768) {
        setIsMobile(true);
        setIsTable(false);
      } else if (
        window &&
        window.innerWidth < 1200 &&
        window.innerWidth > 767
      ) {
        setIsTable(true);
        setIsMobile(false);
      } else {
        setIsMobile(false);
        setIsTable(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTable };
}
