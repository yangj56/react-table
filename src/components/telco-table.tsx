import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Arrow,
  Base,
  BaseShape,
  Direction,
  Label,
  Size,
} from 'react-component-library';
import styled from 'styled-components';
import { telcoDummyData } from '../data/dummy';

export function TelcoTable() {
  const [operatorSort, setOperatorSort] = useState(Direction.UP);
  const telcoData = useRef(telcoDummyData);

  const sortOperator = () => {
    setOperatorSort((currentVal) => {
      if (currentVal === Direction.UP) {
        return Direction.DOWN;
      }
      if (currentVal === Direction.DOWN) {
        return Direction.UNI;
      }
      if (currentVal === Direction.UNI) {
        return Direction.UP;
      }
      return Direction.DOWN;
    });
  };

  function generateData() {
    return telcoData.current.map((data, index) => {
      return (
        <Fragment key={index}>
          <TdDivContainer>
            <Label displaySize={Size.NORMAL} label={data.name} />
          </TdDivContainer>
          <TdDivContainer>
            <Label displaySize={Size.NORMAL} label={data.headset} />
          </TdDivContainer>
          <TdDivContainer>
            <Label
              displaySize={Size.NORMAL}
              label={data.has3G ? 'Yes' : 'No'}
            />
          </TdDivContainer>
        </Fragment>
      );
    });
  }

  useEffect(() => {
    if (operatorSort === Direction.UNI) {
      telcoData.current = telcoDummyData;
    }
    telcoData.current.sort((x, y) => {
      if (x.name === y.name) {
        return 0;
      }
      if (operatorSort === Direction.UP) {
        return x.name < y.name ? 1 : -1;
      } else {
        return x.name > y.name ? 1 : -1;
      }
    });
  }, [operatorSort, telcoData]);

  return (
    <Base shadow={true} shape={BaseShape.ROUND}>
      <TableCollectionContainer>
        <TdDivContainer>
          <Label displaySize={Size.LARGE} bold={true} label="Operator" />
          <Arrow
            direction={operatorSort}
            displaySize={Size.NORMAL}
            onClick={sortOperator}
          />
        </TdDivContainer>
        <TdDivContainer>
          <Label displaySize={Size.LARGE} bold={true} label="Headset Display" />
        </TdDivContainer>
        <TdDivContainer>
          <Label displaySize={Size.LARGE} bold={true} label="3G Availability" />
        </TdDivContainer>
        {generateData()}
      </TableCollectionContainer>
    </Base>
  );
}

//collection collection-container
const TableCollectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
