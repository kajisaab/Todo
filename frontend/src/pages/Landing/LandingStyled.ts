import styled from 'styled-components';

type Props = {
  darkMode: boolean;
};
const LandingWrapper = styled.div<Props>`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  .card_layout {
    min-height: 13em;
    min-width: 18em;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 10;
    padding: 20px;
    backdrop-filter: blur(25px);
    transition: 0.5s;

    &:hover {
      transform: scale(1.15);
      z-index: 10000;
      font-weight: bold;
      ${(props) =>
        props.darkMode
          ? `
      background-color: #b7b0b0; 
      box-shadow: -15px 30px 50px rgba(0,0,0,0.5);
      color: #212121;
      `
          : `
      background-color: #212121; 
      color: #ffffff;
      `}
    }
  }
`;

export { LandingWrapper };
