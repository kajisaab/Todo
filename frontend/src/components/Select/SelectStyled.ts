import styled from 'styled-components';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  .select_container_withoutFilter {
    display: flex;
    padding: 12px 24px;
    border: none;
    outline: 0;
    font-size: 0.8em;
    color: #757575;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    background-color: #e8e8e8;
  }

  .select_options {
    position: absolute;
    width: 96%;
    top: 50px;
    background: black;
    max-height: 200px;
    height: auto;
    background: whitesmoke;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 20%), 0px 1px 18px rgb(0 0 0 / 12%),
      0px 6px 10px rgb(0 0 0 / 14%);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
  }

  .options {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px 0 5px 5px;
    cursor: pointer;

    &:hover {
      background-color: gray;
    }
  }
`;

export { SelectWrapper };
