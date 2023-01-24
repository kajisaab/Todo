import styled from 'styled-components';

type Props = {
  type: string;
};

const FormContainerwrapper = styled.div<Props>`
  ${(props) =>
    props.type === 'Sign Up'
      ? `
      display: grid;
      grid-template-columns: auto auto;
      gap: 2em;`
      : `
      display:flex; 
      flex-direction: column; 
      gap: 10px;
      `}

  margin-top: 2em;

  .input_field {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      padding-left: 24px;
      font-size: 1em;
    }

    input {
      padding: 12px 24px;
      border: none;
      background-color: #e8e8e8;
      border-radius: 5px;
      &:focus {
        outline: 1px solid gray;
      }
    }
  }

  .select_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
  }
`;

export { FormContainerwrapper };
