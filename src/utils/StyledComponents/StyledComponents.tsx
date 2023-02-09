import styled from 'styled-components';

export const AppWrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F9F9FA;
`

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
export const HeaderWrapper = styled.div`
  background: #FCFCFC;
  box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  padding: 0 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 56px;
`
export const ErrorText = styled.p`
  color: red;
  margin: 0;
  font-style: italic;
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
export const LinkForgot = styled.a`
  text-decoration: none;
  text-align: end;
  margin-bottom: 60px;
  margin-top: 19px;
`
export const LinkSign = styled.a`
  text-decoration: none;
  text-align: center;

`
export const ParagraphForgot = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 24px;
`