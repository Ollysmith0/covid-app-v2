import styled from 'styled-components';

export const OddLine = styled.div`
  color: white;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(109, 126, 167, 1) 53%,
    rgba(0, 212, 255, 1) 100%
  );
  margin: 1em;
`;

export const EvenLine = styled.div`
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  width: auto;
  height: auto;
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover, th:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;
