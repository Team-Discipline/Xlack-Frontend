import React from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { bounceInRight, fadeIn } from "react-animations";

function WaitPage() {
  return (
    <>
      <Test>
        <h1>hello</h1>
      </Test>
    </>
  );
}

export default WaitPage;

const Test = styled.div`
  background-color: aquamarine;
`;
