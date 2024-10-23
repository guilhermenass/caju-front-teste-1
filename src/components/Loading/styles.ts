import styled from 'styled-components'

export const Loading = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #777472;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`

export const SquareSpin = styled.div`
  width: 4.5em;
  height: 4.5em;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: transparent;
  }
`

export const Spin = styled.span`
  font-size: 10px;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  background: linear-gradient(
    258deg,
    #ff7500 8%,
    #e80537 53%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &::before {
    width: 50%;
    height: 50%;
    background: #ff7500;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 2px;
    content: '';
  }

  &::after {
    background: #777472;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`
