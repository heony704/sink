import { useCallback, useRef, useState } from 'react';
import { IoMdArrowDown } from 'react-icons/io';
import './MemoInsert.scss';

const MemoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');
  const memoTextarea = useRef(null);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    memoTextarea.current.style.height = '0';
    memoTextarea.current.style.height =
      memoTextarea.current.scrollHeight + 'px';
  }, []);

  const onClick = useCallback(
    (e) => {
      const trimValue = value.trim();

      if (trimValue === '') {
        alert('내용을 입력해주세요.');
      } else {
        onInsert(trimValue);
      }

      setValue('');
      memoTextarea.current.style.height = '1.6875rem';

      e.preventDefault();
      memoTextarea.current.focus();
    },
    [onInsert, value],
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey && !e.ctrlKey) {
          onClick(e);
        }
      }
    },
    [onClick],
  );

  return (
    <form className="MemoInsert">
      <textarea
        placeholder="Memo about your own"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
        ref={memoTextarea}
        spellCheck="false"
      />
      <button type="submit" onClick={onClick}>
        <IoMdArrowDown />
      </button>
    </form>
  );
};

export default MemoInsert;
