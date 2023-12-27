import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "../styles/customModal.css";

export const CustomTokenModal = ({
  onCloseModal,
  tokenList,
  setToken,
  type,
  setTokenName,
}) => {
  const [suggestions, setSugesstions] = useState(tokenList?.map((ele) => ele));
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [convertedValue, setConvertedVal] = useState("");
  const onSelected = (value) => {
    setConvertedVal(value);
  };

  const onChange = (value) => {
    setConvertedVal("");
    // console.log(value);
  };
  const handler = (e) => {
    // setSugesstions(tokenList?.filter((i) => i?.startsWith(e.target.value)));
    setSugesstions(
      tokenList?.filter((i) => {
        // console.log(i?.includes(e.target.value))
        return i?.toLowerCase().includes(e.target.value.toLowerCase());
      }),
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
    <div id="myModal" className="custom_modal ">
      <div className="custom_modal-content rounded-3xl background_popup swap_subheading !z-40">
        <div className="custom_modal_body">
          {type !== "etob" && <div className="fw-bold fs-4">W</div>}
          <input
            // type="search"
            maxLength={"4"}
            value={selectedVal}
            onChange={handleChange}
            onKeyUp={handler}
            style={{ background: "rgba(121, 78, 255, 0.20)" }}
            className="amount_input border-none font-syne text-2xl pl-4 pr-4 rounded-md"
          />
          <div className="close" onClick={onCloseModal}>
            <MdClose style={{ width: "2rem" }} />
          </div>
        </div>
        <div className="custom_modal-header">
          {suggestions?.length > 0 ? (
            suggestions?.map((el, index) => {
              return (
                <div
                  className="token_name font-syne"
                  key={index}
                  onClick={() => {
                    setToken(el);
                    setTokenName(el);
                    onCloseModal();
                  }}
                >
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
                }}
              >
                {selectedVal}
              </div>
              {lengthError && <p>Name should be 4 letters</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
