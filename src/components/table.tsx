import { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { devices } from '../utils/breakpoints';
import { createCheckboxIdState } from '../utils/helpers';

type DataSortFieldType = {
  name: string;
  sortable: boolean;
};

type SortableFieldType = {
  name: string;
  direction: Direction;
};

type StyledComponentAddOnProps = {
  size: number;
  hasSelector?: boolean;
  isSelected?: boolean;
};

export type SelectType = {
  name: 'radio' | 'checkbox';
};

type Props = {
  data: Record<string, string>[];
  dataFields: DataSortFieldType[];
  sortableField?: SortableFieldType;
  type?: SelectType;
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  dataFields: PropTypes.array.isRequired,
};

export function Table({ data, dataFields, sortableField, type }: Props) {
  const [displayData, setDisplayData] = useState(data);
  const [sortField, setSortableField] = useState(sortableField);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    createCheckboxIdState(data, type)
  );
  const dataColumnLength = dataFields.length;
  const hasSelector = type !== undefined;

  useEffect(() => {
    if (!sortField) {
      return;
    }
    if (sortField.direction === Direction.UNI) {
      setDisplayData(data);
      return;
    }
    const newDisplayData = [...displayData];
    newDisplayData.sort((x, y) => {
      if (x[sortField.name] === y[sortField.name]) {
        return 0;
      }
      if (sortField.direction === Direction.UP) {
        return x[sortField.name] > y[sortField.name] ? 1 : -1;
      } else {
        return x[sortField.name] < y[sortField.name] ? 1 : -1;
      }
    });
    setDisplayData(newDisplayData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, data]);

  function onRadioChange(name: string) {
    setSelectedRadio(name);
  }

  function onCheckboxChange(toggleId: string) {
    setSelectedCheckboxes((prev) => {
      return { ...prev, [toggleId]: !prev[toggleId] };
    });
  }

  function onCheckboxAllChange() {
    setSelectedCheckboxes((prev) => {
      let allTruthy = true;
      for (const item in prev) {
        if (!prev[item]) {
          allTruthy = false;
          break;
        }
      }
      if (allTruthy) {
        return Object.assign(
          {},
          ...Object.keys(prev).map((item) => ({ [item]: false }))
        );
      }
      return Object.assign(
        {},
        ...Object.keys(prev).map((item) => ({ [item]: true }))
      );
    });
  }

  function sortOperator(dataField: string) {
    setSortableField((currentVal) => {
      if (!currentVal) {
        return {
          direction: Direction.UP,
          name: dataField,
        };
      }
      if (dataField !== currentVal.name) {
        return {
          direction: Direction.UP,
          name: dataField,
        };
      }
      if (currentVal.direction === Direction.UP) {
        return {
          direction: Direction.DOWN,
          name: dataField,
        };
      }
      if (currentVal.direction === Direction.DOWN) {
        return {
          direction: Direction.UNI,
          name: dataField,
        };
      }
      if (currentVal.direction === Direction.UNI) {
        return {
          direction: Direction.UP,
          name: dataField,
        };
      }
      return {
        direction: Direction.DOWN,
        name: dataField,
      };
    });
  }

  function generateHeader() {
    const headers = dataFields.map((dataField, index) => {
      const direction =
        sortField &&
        dataField.name === sortField.name &&
        dataField.sortable === true
          ? sortField.direction
          : Direction.UNI;
      return (
        <TableItemContainer key={`header-key-${index}`}>
          <Label displaySize={Size.LARGE} bold={true} label={dataField.name} />
          {dataField.sortable === true && (
            <Arrow
              direction={direction}
              displaySize={Size.NORMAL}
              onClick={() => sortOperator(dataField.name)}
            />
          )}
        </TableItemContainer>
      );
    });
    return (
      <TableHeaderContainer size={dataColumnLength} hasSelector={hasSelector}>
        {type !== undefined && type.name === 'radio' && <TableItemContainer />}
        {type !== undefined && type.name === 'checkbox' && (
          <TableItemContainer>
            <Checkbox
              checked={Object.keys(selectedCheckboxes).every(
                (item) => selectedCheckboxes[item]
              )}
              value={'all-check'}
              displaySize={Size.NORMAL}
              onChange={() => onCheckboxAllChange()}
            />
          </TableItemContainer>
        )}

        <TdItemsContainer size={dataColumnLength} hasSelector={hasSelector}>
          {headers}
        </TdItemsContainer>
      </TableHeaderContainer>
    );
  }

  function generateSummariseHeader() {
    return (
      <TableSummariseHeaderContainer
        size={dataColumnLength}
        hasSelector={hasSelector}
      >
        <Label
          displaySize={Size.LARGE}
          bold={true}
          label={'Summarised Header'}
        />
      </TableSummariseHeaderContainer>
    );
  }

  function generateData() {
    return displayData.map((data, index) => {
      const displayDataItem = Object.keys(data).map((item, itemIndex) => {
        const showColumn = dataFields.some((field) => {
          return field.name === item;
        });
        if (!showColumn) {
          return;
        }
        return (
          <TableItemContainer key={`data-item-key-${itemIndex}`}>
            <LabelDataField
              displaySize={Size.NORMAL}
              bold={true}
              label={item}
              size={dataColumnLength}
              hasSelector={hasSelector}
            />
            <LabelValueField
              displaySize={Size.NORMAL}
              label={data[`${item}`]}
            />
          </TableItemContainer>
        );
      });
      return (
        <TableItemsContainer
          key={`data-key-${index}`}
          size={dataColumnLength}
          hasSelector={hasSelector}
          isSelected={
            type !== undefined &&
            type.name === 'radio' &&
            data[`ID`] === selectedRadio
          }
        >
          {type !== undefined && type.name === 'radio' && (
            <TableItemContainer>
              <Radio
                checked={data[`ID`] === selectedRadio}
                value={data[`ID`]}
                displaySize={Size.NORMAL}
                onChange={() => onRadioChange(data[`ID`])}
              />
            </TableItemContainer>
          )}
          {type !== undefined && type.name === 'checkbox' && (
            <TableItemContainer>
              <Checkbox
                checked={selectedCheckboxes[data[`ID`]]}
                value={data[`ID`]}
                displaySize={Size.NORMAL}
                onChange={() => onCheckboxChange(data[`ID`])}
              />
            </TableItemContainer>
          )}
          <TdItemsContainer size={dataColumnLength}>
            {displayDataItem}
          </TdItemsContainer>
        </TableItemsContainer>
      );
    });
  }

  return (
    <Base shadow={true} shape={BaseShape.ROUND}>
      <TableCollectionContainer>
        {generateHeader()}
        {generateSummariseHeader()}
        {generateData()}
      </TableCollectionContainer>
    </Base>
  );
}

const TableCollectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableSummariseHeaderContainer = styled.div<StyledComponentAddOnProps>`
  display: ${({ size, hasSelector }) => {
    const totalSize = hasSelector ? size + 1 : size;
    if (totalSize >= 4) {
      return 'flex';
    }
    return 'none';
  }};
  background-color: ${({ theme }) => `${theme.color.NEUTRAL}`};
  justify-content: center;

  @media ${devices.laptop} {
    display: none;
  }
`;

const TableHeaderContainer = styled.div<StyledComponentAddOnProps>`
  display: ${({ size, hasSelector }) => {
    const totalSize = hasSelector ? size + 1 : size;
    if (totalSize > 0 && totalSize <= 3) {
      return 'grid';
    }
    return 'none';
  }};
  grid-template-columns: ${({ hasSelector }) => {
    if (hasSelector) {
      return `1fr 5fr`;
    }
    return `1fr`;
  }};
  background-color: ${({ theme }) => `${theme.color.NEUTRAL}`};

  @media ${devices.laptop} {
    display: grid;
  }
`;

const TableItemsContainer = styled.div<StyledComponentAddOnProps>`
  display: grid;
  grid-template-columns: ${({ hasSelector }) => {
    if (hasSelector) {
      return `1fr 5fr`;
    }
    return `1fr`;
  }};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.SECONDARY : ''};
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.color.UNDERLINED}`};

  &:nth-last-child(1) {
    border-bottom: 0.1rem solid transparent;
  }
`;

const TdItemsContainer = styled.div<StyledComponentAddOnProps>`
  display: grid;
  grid-template-columns: ${({ size }) => {
    if (size > 0 && size <= 3) {
      return `repeat(${size}, 1fr);`;
    }
    return `1fr`;
  }};

  @media ${devices.laptop} {
    grid-template-columns: ${({ size }) => {
      return `repeat(${size}, 1fr);`;
    }};
  }
`;

const TableItemContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const LabelDataField = styled(Label)<StyledComponentAddOnProps>`
  display: ${({ size, hasSelector }) => {
    const totalSize = hasSelector ? size + 1 : size;
    if (totalSize >= 4) {
      return 'block';
    }
    return 'none';
  }};
  width: 30%;

  @media ${devices.laptop} {
    display: none;
  }
`;

const LabelValueField = styled(Label)`
  display: block;
  width: 70%;
`;
