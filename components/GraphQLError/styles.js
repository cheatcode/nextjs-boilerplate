import styled from "styled-components";

export default styled.div`
  border-radius: 3px;
  border: 1px solid var(--gray-1);

  header {
    border-bottom: 1px solid var(--gray-1);
    padding: 20px;
  }

  header h4 {
    font-size: 18px;
    color: var(--gray-4);
  }

  div {
    padding: 20px;
  }

  div pre {
    background: var(--gray-1);
    padding: 20px;
    color: var(--gray-3);
    overflow-x: scroll;
  }
`;
