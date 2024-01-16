"use client";
import React, { useEffect, useRef, useState } from 'react';
import Chip from "./components/Chip";
import { data } from './utils/data';

// Constants
const BACKSPACE_KEY = 'Backspace';
const CHIP_CLASS = "flex items-center m-1";
const INPUT_CLASS = "block px-2.5 pb-2.5 pt-5 text-md text-gray-900 bg-gray-50 border-none w-full focus:outline-none border-0 focus:border-none";

const IndexPage: React.FC = () => {
  // State
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const items = data.map((data) => data?.name);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect to focus input and show dropdown when items are selected
  useEffect(() => {
    if (selectedItems.length > 0 && inputRef.current) {
      inputRef.current.focus();
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [selectedItems]);

  // Effect to handle clicks outside the input for dropdown visibility
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef]);

  // Event handler for input value change
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  // Filter items based on input and selected items
  const filteredItems = items
    .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
    .filter((item) => !selectedItems.includes(item));

  // Event handler for clicking on an item in the dropdown
  const handleItemClick = (item: string) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue('');
    setHighlightedIndex(null);
  };

  // Event handler for removing a chip
  const handleChipRemove = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
  };

  // Event handler for handling backspace key
  const handleBackspace = () => {
    if (inputValue === '' && selectedItems.length > 0) {
      if (highlightedIndex !== null) {
        handleChipRemove(highlightedIndex);
        setHighlightedIndex(null);
      } else {
        const lastIndex = selectedItems.length - 1;
        setHighlightedIndex(lastIndex);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="relative flex flex-wrap block rounded-t-sx px-2 pb-2 pt-2 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <div className="flex flex-wrap w-full relative">
          {selectedItems.map((item, index) => (
            <div id={`chip-${index}`} key={index} className={CHIP_CLASS}>
              <Chip
                label={item}
                highlighted={highlightedIndex === index}
                onRemove={() => handleChipRemove(index)}
              />
            </div>
          ))}
          <div className="flex-grow relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputValueChange}
              onKeyDown={(e) => {
                if (e.key === BACKSPACE_KEY) {
                  handleBackspace();
                }
              }}
              autoFocus={selectedItems.length > 0}
              onClick={() => setIsDropdownVisible(true)}
              className={INPUT_CLASS}
              placeholder=" "
            />
            {isDropdownVisible && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                {filteredItems.length > 0 ? (
                  // Render dropdown items
                  filteredItems.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleItemClick(item)}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  // Display no items found message
                  <div className="p-2 text-gray-500">No items found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
