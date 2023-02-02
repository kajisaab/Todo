import styled from 'styled-components';

type Props = {
  editView?: number | null;
  keyValue?: number | null;
  createNew?: boolean;
  darkMode?: boolean;
};

const TodoWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;

  .header_section {
    width: 60vw;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .todo_list_area {
    background-color: #cccaca;
    width: 80vw;
    height: 80vh;
    border-radius: 6px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }

  .header_input_section {
    width: 100%;
  }
  .input_wrapper {
    padding: 12px 24px;
    border: none;
    outline: 0;
    width: 92%;
    background-color: #e8e8e8;
    border-radius: 5px;
    border: 1px solid whitesmoke;
    &:focus {
      outline: 1px solid gray;
    }
  }

  .create_new_container {
    position: absolute;
    background-color: ${(props) =>
      props.darkMode ? props.theme.dark.primary : props.theme.light.primary};
    top: 2rem;
    height: 56vh;
    width: 80vw;
    left: ${(props) => (props.createNew ? '8.5rem' : '-100%')};
    transition: all 0.5s ease-in-out;
    box-shadow: 0px 4px 12px -4px rgb(0 0 0 / 28%);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .todo_create_container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 80px;
    width: 30rem;
  }

  .input_section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .create_new_button_group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .input_title_text {
    padding-left: 24px;
  }

  .textarea {
    width: 89%;
  }
`;

const ListContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.darkMode ? props.theme.dark.primary : props.theme.light.primary};
  border-radius: 6px;
  padding: 10px;
  box-shadow: -1px 6px 26px -4px rgba(0, 0, 0, 0.67);
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.editView === props.keyValue &&
    `
    position:absolute; 
    transform: scale(1.2);
    box-shadow: 0px 4px 12px -4px rgb(0 0 0 / 28%);
    height: 50vh;
    display:flex; 
    align-items: flex-start;
    `};

  .todo_edit_container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0 22rem;
    width: 31vw;
  }

  .input_section {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .todo_title_container {
    display: flex;
    flex-direction: column;
  }

  .todo_title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .todo_description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50vw;
    padding: 10px 0;
  }

  .todo_button_container {
    display: flex;
    align-items: center;
    gap: 10px;

    ${(props) =>
      props.editView === props.keyValue &&
      `
      justify-content : flex-end
    `};
  }

  .todo_date {
    font-size: 0.9rem;
  }
`;

export { TodoWrapper, ListContainer };
