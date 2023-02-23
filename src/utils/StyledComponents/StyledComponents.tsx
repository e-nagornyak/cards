import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  min-height: 360px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  padding: 38px 33px;
`
export const ProfileIcon = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
`
export const ChangeIconWrapper = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 65%;
  border: 1px solid white;
  background-color: #808080;
  cursor: pointer;
`
export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 395px;
  padding: 10px;
  min-height: 240px;
  background: white;
`