import styled from 'styled-components';

type Props = {
  type: string;
};

const HomeWrapper = styled.div<Props>`
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
    width: ${(props) => (props.type === 'Sign Up' ? '70vw' : '30vw')};
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export { HomeWrapper };
