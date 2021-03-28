import styled from "styled-components";

export default styled.div`
  text-align: center;
  background: var(--gray-1);
  color: var(--gray-4);
  padding: 40px;
  border-radius: 3px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--gray-4);
    margin-bottom: 15px;
  }

  p {
    color: var(--gray-3);
  }

  .button {
    margin-top: 30px;
  }

  &.transparent {
    background: transparent;
  }

  &.bordered {
    border: 1px solid var(--gray-1);
    background: #fff;
  }

  &.dashed {
    border: 2px dashed var(--gray-1);
    background: #fff;
  }
`;
