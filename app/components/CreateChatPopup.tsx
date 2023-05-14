/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';

interface CreateChatPopupProps {
  visible: boolean;
  phoneNumber: string;
  setPhoneNumber: (e: any) => void;
  toggleCreateChat: () => void;
  handleSumbit: (e: any) => void;
}

const CreateChatPopup: React.FC<CreateChatPopupProps> = ({
  visible,
  phoneNumber,
  toggleCreateChat,
  handleSumbit,
  setPhoneNumber
}) => {
  return (
    <div>
      <div>
        <button className="w-fill p-2 bg-slate-500" onClick={toggleCreateChat}>
          Создать чат
        </button>
      </div>
      <div
        className={`absolute w-min bg-slate-700 z-40 top-[50%] right-[50%] translate-x-2/4 -translate-y-2/4 ${
          visible && 'hidden'
        }`}
      >
        <form className="flex flex-col items-center" onSubmit={(e) => handleSumbit(e)}>
          <label>Номер телефона</label>
          <input
            className="m-4 text-black"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
          <p className="w-auto m-auto text-center">
            Введите номер телефона в формате одной строки, без пробелов, без "+". Пример:
            79995551122
          </p>
          <button
            className="m-3 border-2 border-slate-300 p-2 rounded-md hover:bg-slate-400"
            type="submit"
          >
            Создать чат
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChatPopup;
