import { useEffect, useState } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTable, setIsTable] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
      setIsTable(false)
    } else if (window && window.innerWidth < 1200 && window.innerWidth > 767) {
      setIsTable(true)
      setIsMobile(false)
    } else {
      setIsMobile(false)
      setIsTable(false)
    }
  }, []);

  return { isMobile, isTable };
}
