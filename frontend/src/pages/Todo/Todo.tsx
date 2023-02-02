import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { TodoInterface } from './TodoInterface';
import { TodoWrapper, ListContainer } from './TodoStyled';
import { useSnackbar } from 'notistack';
import moment from 'moment';

type EditProps = {
  id: number | null;
  title: string | '';
  description: string | '';
  created_date: string | null;
};

type CreateTodo = {
  title: string | null;
  description: string | null;
  created_at: string | null;
};
const intialEditViewState = {
  id: null,
  title: '',
  description: '',
  created_date: null,
};

const initialCreateTodo = {
  title: null,
  description: null,
  created_at: null,
};

function Todo(props: TodoInterface): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { token, userDetails, darkMode } = useAppSelector(
    (state) => state.userDetails
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [todoList, setTodoList] = useState<any>([]);
  const [editView, setEditView] = useState<EditProps>({
    ...intialEditViewState,
  });
  const [createView, setCreateView] = useState<CreateTodo>({
    ...initialCreateTodo,
  });
  const [createNew, setCreateNew] = useState<boolean>(false);

  const editTodo = (value: EditProps) => {
    setEditView({
      ...value,
    });
  };

  const createTodoInput = (e: any) => {
    const { name, value } = e.target;
    setCreateView({
      ...createView,
      [name]: value,
    });
  };

  const cancelCreateTodo = () => {
    setCreateNew(false);
    setCreateView({ ...initialCreateTodo });
    editTodo({ ...intialEditViewState });
  };

  const getAllTodoTask = async () => {
    try {
      const response = await axios.get(
        `/todo/getAllTodoTask/${userDetails.email}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setTodoList([...response.data]);
    } catch (err) {
      enqueueSnackbar('Could not get the task', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
  };

  const createTodo = async () => {
    const data = {
      ...createView,
      user_id: userDetails.user_id,
      email: userDetails.email,
    };
    try {
      await axios.post('/todo/create-todo', data, {
        headers: {
          'x-auth-token': token,
        },
      });
      enqueueSnackbar('Successfully created task', {
        variant: 'success',
        preventDuplicate: true,
      });
      getAllTodoTask();
      cancelCreateTodo();
    } catch (err) {
      enqueueSnackbar('Can not create a task', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
  };

  useEffect(() => {
    getAllTodoTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodoWrapper createNew={createNew} darkMode={darkMode}>
      <div className='header_section'>
        <div className='header_input_section'>
          <input
            value={searchValue}
            type='text'
            placeholder='Search Todo...'
            onChange={(e: any) => setSearchValue(e.target.value)}
            className='input_wrapper'
          />
        </div>
        <Button
          title='Create New'
          onClick={(e) => {
            setEditView({ ...intialEditViewState });
            setCreateNew(!createNew);
          }}
          width={160}
        />
      </div>
      <div className='create_new_container'>
        <div className='todo_create_container'>
          <div className='input_section'>
            <InputField
              title='Title'
              type='text'
              placeholder={'Enter your title'}
              onChange={(e: any) => createTodoInput(e)}
              error={false}
              errorMessage={''}
              required={false}
              name={'title'}
              value={createView.title || ''}
            />
            <span className='input_title_text'>Description</span>
            <textarea
              value={createView.description || ''}
              rows={5}
              name='description'
              placeholder='Enter your description'
              onChange={(e: any) => createTodoInput(e)}
              className='input_wrapper textarea'
            />
            <InputField
              title='Date'
              type='date'
              placeholder={'Select Date '}
              onChange={(e: any) => createTodoInput(e)}
              error={false}
              errorMessage={''}
              required={false}
              name={'created_at'}
              value={createView.created_at || ''}
            />
          </div>
          <div className='create_new_button_group'>
            <Button title='Create' onClick={(e) => createTodo()} />
            <Button title='Cancel' onClick={(e) => cancelCreateTodo()} />
          </div>
        </div>
      </div>
      <div className='todo_list_area'>
        {todoList?.map((todo: any, ind: any) => (
          <ListContainer
            key={ind}
            editView={editView.id}
            keyValue={ind}
            darkMode={darkMode}
          >
            {editView.id === ind ? (
              <div className='todo_edit_container'>
                <div className='input_section'>
                  <InputField
                    title='Title'
                    type='text'
                    placeholder={'Enter your title'}
                    onChange={(e: any) =>
                      setEditView({ ...editView, title: e.target.value })
                    }
                    error={false}
                    errorMessage={''}
                    required={false}
                    name={'title'}
                    value={todo.title}
                  />
                  <span className='input_title_text'>Description</span>
                  <textarea
                    value={todo.description}
                    rows={5}
                    name='description'
                    placeholder='Enter your description'
                    onChange={(e: any) =>
                      setEditView({ ...editView, description: e.target.value })
                    }
                    className='input_wrapper textarea'
                  />
                  <InputField
                    title='Date'
                    type='date'
                    placeholder={'Select Date '}
                    onChange={(e: any) =>
                      setEditView({ ...editView, created_date: e.target.value })
                    }
                    error={false}
                    errorMessage={''}
                    required={false}
                    name={'created_at'}
                    value={moment(todo.created_at).format('yyyy-MM-dd')}
                  />
                </div>
                <div className='todo_button_container'>
                  <Button title='Update' onClick={(e) => alert('update')} />
                  <Button
                    title='Cancel'
                    onClick={(e) => editTodo({ ...intialEditViewState })}
                  />
                  <Button title='Delete' onClick={(e) => alert('random')} />
                </div>
              </div>
            ) : (
              <>
                <div className='todo_title_container'>
                  <span className='todo_title'>{todo.title}</span>
                  <div className='todo_description'>
                    <span>{todo.description}</span>
                  </div>
                  <span className='todo_date'>
                    {moment(todo.created_at).format('MM/DD/YYYY')}
                  </span>
                </div>
                <div className='todo_button_container'>
                  <Button title='Completed' onClick={(e) => alert('random')} />
                  <Button
                    title='Edit'
                    onClick={(e) => {
                      setCreateNew(false);
                      editTodo({
                        id: ind,
                        title: todo.title,
                        description: todo.description,
                        created_date: todo.created_date,
                      });
                    }}
                  />
                  <Button title='Delete' onClick={(e) => alert('random')} />
                </div>
              </>
            )}
          </ListContainer>
        ))}
      </div>
    </TodoWrapper>
  );
}

export default Todo;
