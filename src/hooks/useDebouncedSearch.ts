import { useState, useRef, useEffect } from "react";

import _ from "lodash";

export const useDebouncedSearch = (delay: number = 500) => {
  const [searchText, setSearchText] = useState<string>("");

  const debouncedSetSearchText = useRef(
    _.debounce((value: string) => setSearchText(value), delay)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;

      setSearchText(value);
    } else {
      debouncedSetSearchText((e.target as HTMLInputElement).value);
    }
  };

  const triggerSearch = () => {
    debouncedSetSearchText.flush();
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchText.cancel();
    };
  }, [debouncedSetSearchText]);

  return {
    searchText,
    handleInputChange,
    handleKeyDown,
    triggerSearch,
  };
};
