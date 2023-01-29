import styled from 'styled-components';

type Props = {
  toggle: boolean;
};

const ThemeToggleWrapper = styled.div<Props>`
  display: flex;
  width: 50px;
  height: 15px;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;

  .toggle_path {
    position: relative;
    width: 100%;
    border-radius: 20px;
  }

  .toggle_background_first {
    background-color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    left: -50px;
    border-radius: 20px;
    overflow: hidden;
    translate: ${(props) => (props.toggle ? '50px' : '-50px')};
    transition: all 0.8s ease-in-out;
  }

  .toggle_background_second {
    background-color: black;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    translate: ${(props) => (props.toggle ? '50px' : '0px')};
    transition: all 0.8s ease-in-out;
  }

  .toggle_background_bulb {
    height: 20px;
    width: 20px;
    top: -2px;
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.toggle ? '#4b4848' : '#cac3c3')};
    transform: ${(props) => (props.toggle ? 'scale(1.6)' : 'scale(1)')};
    translate: ${(props) => (props.toggle ? '50px' : '0')};
    transition: ${(props) =>
      props.toggle ? 'all 1.2s ease-in-out' : 'all 0.5s ease-in-out'};
  }
`;

export { ThemeToggleWrapper };
