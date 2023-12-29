import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const CustomDropdown = ({ Chain, appChains, setChain, type }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

  return (
    <section className={`dropdown`}>
      <button onClick={handleDropdownClick} className="dropdown-btn">
        <p className="flex items-center justify-end text-center bg-black border-none text-white rounded-full cursor-pointer !mb-0 py-[12px] sm:!w-auto sm:!px-3 px-3 w-max">
          <p className="flex items-center justify-end gap-1 !mb-0">
            <span className="font-syne text-white font-light text-xs normal-case pt-0.5">
              {type}
            </span>
            <span className="flex items-center sm:text-sm w-max gap-1">
              <img src={Chain?.icon} style={{ width: '20px' }} /> {Chain?.tag}
            </span>
            {!dropdownState ? (
              <IoIosArrowDown className="font-white" />
            ) : (
              <IoIosArrowUp className="font-white" />
            )}
          </p>
        </p>
      </button>

      <span
        className={`dropdownItems p-3 ${dropdownState ? 'isVisible' : 'isHidden'}`}
        onClick={() => {
          handleDropdownClick();
        }}>
        {appChains.map((chain, index) => (
          <span
            className="dropdownItem hover:bg-[#120A33] hover:outline-none hover:rounded-md py-2 px-2"
            onClick={setChain(type === 'To' ? false : true, chain)}>
            <span className="dropdown__link !w-max flex justify-start text-white gap-2 items-center">
              {' '}
              <img src={chain.icon} style={{ width: '20px' }} /> {chain.tag}
            </span>
          </span>
        ))}
      </span>
    </section>
  );
};
