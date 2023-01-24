import styled from 'styled-components';

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .input_title {
    padding-left: 24px;
  }

  .required_notation {
    color: red;
  }

  input {
    padding: 12px 24px;
    border: none;
    outline: 0;
    background-color: #e8e8e8;
    border-radius: 5px;
    border: 1px solid whitesmoke;
    &:focus {
      outline: 1px solid gray;
    }
  }

  .error_message {
    padding-left: 24px;
    color: red;
    font-size: 0.6em;
  }
`;

export { InputFieldWrapper };
