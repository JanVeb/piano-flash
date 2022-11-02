import { useRef, useEffect } from "react";
import jSuites from "jsuites";

import "jsuites/dist/jsuites.css";
import "../App.css";

export default function Dropdown({ options }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    jSuites.dropdown(dropdownRef.current, options);
  }, [options]);

  return <div ref={dropdownRef} />;
}
