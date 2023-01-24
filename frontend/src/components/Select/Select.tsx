import React, { useState } from 'react';
import { SelectInterface } from './SelectInterface';
import { SelectWrapper } from './SelectStyled';
import useOutSideClick from '../../hooks/useOutSideClick';

function Select(props: SelectInterface): JSX.Element {
  const { withText, onClick, data, placeholder } = props;
  const [optionsView, setOptionsView] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(`${placeholder}`);

  const handleClickOutside = () => {
    setOptionsView(() => false);
  };
  const ref = useOutSideClick(handleClickOutside);

  const selectValue = (value: string | number) => {
    setValue(value);
    onClick(value);
    setOptionsView(() => false);
  };
  return (
    <>
      <SelectWrapper
        ref={ref}
        onClick={() => {
          setOptionsView(() => !optionsView);
          onClick && onClick();
        }}
      >
        {withText ? (
          <>
            <div className='select_container_withoutFilter'>
              search dropdown{' '}
            </div>
          </>
        ) : (
          <div className='select_container_withoutFilter'>{value}</div>
        )}
        {optionsView && (
          <div className='select_options'>
            {data?.map((optionData, id) => (
              <div
                key={id}
                className='options'
                onClick={() => selectValue(optionData.value)}
              >
                {optionData.label}
              </div>
            ))}
          </div>
        )}
      </SelectWrapper>
    </>
  );
}

export default Select;
