import styled from 'styled-components';

const OtpVerifyWrapper = styled.div`
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
    width: 40vw;
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

  .otp_message {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 20px 0;
    gap: 10px;
  }

  .otp_message span:nth-child(1) {
    font-weight: bolder;
    font-size: 1.2rem;
  }

  .otp_message span:nth-child(2) {
    font-weight: 500;
    font-size: 1rem;
  }

  .timer_section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    gap: 5px;
  }
`;

export { OtpVerifyWrapper };
