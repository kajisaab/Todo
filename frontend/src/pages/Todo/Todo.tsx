import { useState } from 'react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { TodoInterface } from './TodoInterface';
import { TodoWrapper } from './TodoStyled';

function Todo(props: TodoInterface): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <TodoWrapper>
      <div className='header_section'>
        <InputField
          title={''}
          type={'text'}
          placeholder={'Search Todo'}
          onChange={(e: any) => setSearchValue(e.target.value)}
          error={false}
          errorMessage={''}
          required={undefined}
          name={'query'}
          value={searchValue}
        />
      </div>
      <div className='todo_list_area'>
        <div className='list_container'>
          <span>aman</span>
          <Button title='Delete' onClick={(e) => alert('random')} />
        </div>
      </div>
    </TodoWrapper>
  );
}

export default Todo;
