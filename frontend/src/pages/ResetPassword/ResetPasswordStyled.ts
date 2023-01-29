import styled from 'styled-components';

const ResetPasswordWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;

  .heading {
    font-size: 2em;
    font-weight: bold;
  }

  .center_container {
    padding: 20px;
    width: 30vw;
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input_fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export { ResetPasswordWrapper };
