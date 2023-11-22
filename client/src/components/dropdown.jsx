import React, { useState } from 'react';
import axios from 'axios';
export const DropdownButton = ({ items, setSelectedItem, selectedItem, setIsDropdownOpen, isDropdownOpen }) => {
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setIsDropdownOpen(false);
    };
  
    return (
      <div className="mr-5" style={{ marginLeft: '60vw' }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-400 block whitespace-no-wrap"
        >
          {selectedItem || 'Select'}
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 bg-white border border-gray-300 p-2 w-48 h-48 overflow-y-auto shadow-md">
            <ul>
              {items.map((item) => (
                <li
                  key={item}
                  className="hover:bg-gray-100 p-2 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

