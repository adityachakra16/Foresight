import Input from "@/components/atoms/Input";
import { use, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { MdOutlineSearch } from "react-icons/md";

interface SearchProps {
  items: any[];
  onSearchComplete: (items: any[]) => void;
  initSearchValue?: string;
}

export const Search = ({
  items,
  onSearchComplete,
  initSearchValue = "",
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState(initSearchValue);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) {
      onSearchComplete(items);
      return;
    }

    const fuse = new Fuse(items, {
      keys: ["label", "value", "category"],
      threshold: 0.4,
    });

    const filteredItems = fuse.search(searchValue).map((result) => result.item);

    onSearchComplete(filteredItems);
  }, [searchValue]);

  return (
    <Input
      type="text"
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search Markets..."
      endcomponent={<MdOutlineSearch size={24} />}
    />
  );
};
