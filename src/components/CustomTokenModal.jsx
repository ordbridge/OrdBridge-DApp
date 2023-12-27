import React, { useState } from 'react';
import '../styles/customModal.css';
import { MdClose } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { FaCircle } from 'react-icons/fa';

export const CustomTokenModal = ({
  onCloseModal,
  tokenList,
  setToken,
  type,
  setTokenName,
  showModal
}) => {
  const [suggestions, setSugesstions] = useState(tokenList?.map((ele) => ele));
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState('');
  const [lengthError, setLengthError] = useState(false);
  const [convertedValue, setConvertedVal] = useState('');
  const onSelected = (value) => {
    setConvertedVal(value);
  };

  const onChange = (value) => {
    setConvertedVal('');
    // console.log(value);
  };
  const handler = (e) => {
    // setSugesstions(tokenList?.filter((i) => i?.startsWith(e.target.value)));
    setSugesstions(
      tokenList?.filter((i) => {
        // console.log(i?.includes(e.target.value))
        return i?.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    onChange(input);
  };

  const hideSuggs = (value) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  };
  return (
    <Modal
      onClose={onCloseModal}
      open={showModal}
      id="myModal"
      classNames={{
        overlay: 'custom-token-modal-overlay',
        modal: 'custom-token-modal-container'
      }}
      closeIcon={<MdClose className="text-white position-relative  right-[-25px] text-[40px] " />}>
      <div className="w-[400px] position-relative m-auto">
        <div className="custom-token-modal">
          <div className="custom_modal_body ">
            {type !== 'etob' && <div className="fw-bold fs-4">W</div>}
            <FiSearch className="text-gray-400 position-absolute left-[50px]" />
            <input
              // type="search"
              placeholder="Search Token"
              maxLength={'4'}
              value={selectedVal}
              onChange={handleChange}
              onKeyUp={handler}
              className="custom-token-modal-input "
            />
          </div>
          <div className="my-3 max-h-[300px] overflow-scroll">
            {suggestions?.length > 0 ? (
              suggestions?.map((el, index) => {
                return (
                  <div
                    className="token_name font-syne my-2"
                    key={index}
                    onClick={() => {
                      setToken(el);
                      setTokenName(el);
                      onCloseModal();
                    }}>
                    <FaCircle />
                    &nbsp;
                    {el}
                  </div>
                );
              })
            ) : (
              <div>
                <div
                  className="token_name font-syne"
                  onClick={() => {
                    if (selectedVal.length < 4) {
                      setLengthError(true);
                    } else {
                      setToken(selectedVal);
                      setTokenName(selectedVal);
                      onCloseModal();
                    }
                  }}>
                  {selectedVal}
                </div>
                {lengthError && <p>Name should be 4 letters</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
