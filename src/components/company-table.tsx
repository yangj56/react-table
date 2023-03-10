import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Arrow,
  Base,
  BaseShape,
  Checkbox,
  Direction,
  Label,
  Radio,
  Size,
} from 'react-component-library';
import styled from 'styled-components';
import { companyDummyData } from '../data/dummy';

export function CompanyTable() {
  const companyData = useRef(companyDummyData);

  function generateData() {
    return companyData.current.map((data, index) => {
      return (
        <Fragment key={index}>
          <TdDivContainer>
            <Checkbox
              checked={false}
              value={data.name}
              displaySize={Size.NORMAL}
            />
          </TdDivContainer>
          <TdDivContainer>
            <Label displaySize={Size.NORMAL} label={data.BRN} />
          </TdDivContainer>
          <TdDivContainer>
            <Label displaySize={Size.NORMAL} label={data.name} />
          </TdDivContainer>
        </Fragment>
      );
    });
  }

  return (
    <Base shadow={true} shape={BaseShape.ROUND}>
      <TableCollectionContainer>
        <TdDivContainer></TdDivContainer>
        <TdDivContainer>
          <Label displaySize={Size.LARGE} bold={true} label="BRN" />
        </TdDivContainer>
        <TdDivContainer>
          <Label displaySize={Size.LARGE} bold={true} label="Company Name" />
        </TdDivContainer>
        {generateData()}
      </TableCollectionContainer>
    </Base>
  );
}

//collection collection-container
const TableCollectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  > * {
    &:nth-child(n + 1):nth-child(-n + 3) {
      background-color: #f7f7f7;
      border-bottom: 0.1rem solid white;
    }
  }
  > * {
    &:nth-last-child(n + 1):nth-last-child(-n + 3) {
      border-bottom: 0.1rem solid white;
    }
  }
  width: 100%;
`;

const TdDivContainer = styled.div`
  padding: 2.4rem;
  border-bottom: 0.1rem solid #e1e1e1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
