import React from 'react';
import styled from "styled-components";

export const AppWrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F9F9FA;
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 413px;
  min-height: 408px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  padding: 38px 33px;
`
export const HeaderWrapper = styled.div`
  background: #FCFCFC;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  min-width: 100vh;
  padding: 0 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 56px;
`