import React, { useEffect, useState } from "react";
import {
  BsFillClipboard2Fill,
  BsFillClipboard2CheckFill,
} from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [randomPassword, setRandomPassword] = useState("");
  const [store, setStore] = useState([]);
  const [prepassword, setPrepassword] = useState("");
  const [copytext, setCopytext] = useState(false);
  const [alpha, setAlpha] = useState(false);
  const [num, setNum] = useState(false);
  const [symbol, setSymbol] = useState(false);

  //////////To generate Random password//////////////
  const genratePassword = (length) => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+!/~";
    let charset = "";

    if (num) {
      charset += numbers;
    }
    if (alpha) {
      charset += alphabets;
    }
    if (symbol) {
      charset += specialChars;
    }
    if (charset === "") {
      return toast.warn("Select any one of the field below", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      setRandomPassword((password += charset[randomIndex]));
    }
    setStore(
      randomPassword === "" ? store.slice(1) : (pre) => [...pre, randomPassword]
    );

    ///////////To store the previous passwords in local storage/////////////////
    localStorage.setItem("previousPassword", store);
  };

  console.log(store);

  //////////To copy text to clipboard////////////////
  const handleCopy = () => {
    if (randomPassword === "") {
      setCopytext(false);
      toast.warn("Generate password to copy", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setCopytext(true);
      navigator.clipboard.writeText(randomPassword);
      toast.success("Copied to clipboard!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        setCopytext(false);
      }, 3000);
    }
  };

  ///////////To Get the previous passwords from local storage/////////////////
  useEffect(() => {
    setPrepassword(localStorage.getItem("previousPassword"));
  }, [store]);

  return (
    <div className="">
      <ToastContainer autoClose={3000} />
      <div className="text-3xl text-center font-semibold underline text-[#00afb9] py-3 underline-offset-8">
        Random Password Genrator
      </div>

      <div className="grid grid-cols-1  mt-10 bg-white lg:max-w-xl md:max-w-xl sm:max-w-xl max-w-xl  mx-auto gap-y-5 box-shadow px-6 py-8 rounded-md">
        <div className="col-span-1 flex items-center gap-x-3">
          <input
            type="text"
            value={randomPassword}
            placeholder="Password Genrator"
            readOnly
            className="border-2 border-[#adb5bd] outline-none px-2 py-4 rounded-lg w-full"
          />

          <div
            onClick={() => handleCopy()}
            className="bg-[#00ACEE] text-lg font-bold text-white px-2 py-3 rounded-md"
          >
            {copytext ? (
              <BsFillClipboard2CheckFill size={22} />
            ) : (
              <BsFillClipboard2Fill size={22} />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[#6c757d] font-medium">
            Select Below Fields to Generate Password
          </div>
          <div className="flex justify-between">
            <label
              htmlFor="numbers"
              className="text-base font-bold text-[#0c7489]"
            >
              Numbers
            </label>
            <input
              type="checkbox"
              id="numbers"
              checked={num}
              onChange={() => setNum(!num)}
              className="h-4 w-4"
            />
          </div>
          <div className="flex justify-between">
            <label
              htmlFor="symbols"
              className="text-base font-bold text-[#0c7489]"
            >
              Symbols
            </label>
            <input
              type="checkbox"
              id="symbols"
              checked={symbol}
              onChange={() => setSymbol(!symbol)}
              className="h-4 w-4"
            />
          </div>
          <div className="flex justify-between">
            <label
              htmlFor="alphabets"
              className="text-base font-bold text-[#0c7489]"
            >
              Alphabets
            </label>
            <input
              type="checkbox"
              id="alphabets"
              checked={alpha}
              onChange={() => setAlpha(!alpha)}
              className="h-4 w-4"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => genratePassword(12)}
            className="bg-[#00ACEE] text-white py-2 rounded-lg font-semibold  w-full"
          >
            Genrate Password
          </button>
        </div>
      </div>
      <div className="grid  bg-slate-300 mt-8 lg:max-w-xl md:max-w-xl sm:max-w-xl max-w-xl mx-auto rounded-md">
        {store[0] ? (
          <>
            <div className="text-[#ffffff] text-center bg-[#00ACEE] font-semibold w-full rounded-t-md py-2 overflow-y-auto">
              Previous Generated Password
            </div>
            {store.slice(-5).map((item, index) => {
              return (
                <div key={index}>
                  <div className="text-center py-2 text-base font-medium">
                    {item}
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>

      {/* ////////////To display previously stored passwords from localStorage///////// */}
      {/* <div className="grid justify-center">
          <div className="text-center">Previous Password</div>
          <div className="break-all">{prepassword}</div>
        </div> */}
    </div>
  );
}

export default App;
