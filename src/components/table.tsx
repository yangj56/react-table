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
import styled from 'styled-components';
import { devices } from '../utils/breakpoints';

type DataSortFieldType = {
  name: string;
  sortable: boolean;
};

type SortableFieldType = {
  name: string;
  direction: Direction;
};

type SelectType = {
  name: 'radio' | 'checkbox';
  selectKey: string;
};

type Props = {
  data: Record<string, string | number | boolean>[];
  dataFields: DataSortFieldType[];
  sortableField: SortableFieldType;
  type?: SelectType;
};

export function Table({ data, dataFields, sortableField, type }: Props) {
  const [displayData, setDisplayData] = useState(data);
  const [sortField, setSortableField] = useState(sortableField);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const dataColumnLength = dataFields.length;
  const hasSelector = type !== undefined;

  useEffect(() => {
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

  function onCheckboxChange(toggleIndex: number) {
    setSelectedCheckboxes((prev) =>
      prev.map((value, index) => (toggleIndex === index ? !value : value))
    );
  }

  function onCheckboxAllChange() {
    setSelectedCheckboxes((prev) => {
      let totalChecks = 0;
      prev.forEach((item) => {
        if (item) {
          totalChecks += 1;
        }
      });
      if (totalChecks === data.length) {
        return new Array(data.length).fill(false);
      }
      return new Array(data.length).fill(true);
    });
  }

  function sortOperator(dataField: string) {
    setSortableField((currentVal) => {
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
        dataField.name === sortField.name && dataField.sortable === true
          ? sortField.direction
          : Direction.UNI;
      return (
        <ThDivContainer key={`header-key-${index}`}>
          <Label displaySize={Size.LARGE} bold={true} label={dataField.name} />
          {dataField.sortable === true && (
            <Arrow
              direction={direction}
              displaySize={Size.NORMAL}
              onClick={() => sortOperator(dataField.name)}
            />
          )}
        </ThDivContainer>
      );
    });
    return (
      <TableHeaderContainer size={dataColumnLength} hasSelector={hasSelector}>
        {type !== undefined && type.name === 'radio' && <TdSelectorContainer />}
        {type !== undefined && type.name === 'checkbox' && (
          <TdSelectorContainer>
            <Checkbox
              checked={selectedCheckboxes.every((item) => item)}
              value={'all-check'}
              displaySize={Size.NORMAL}
              onChange={() => onCheckboxAllChange()}
            />
          </TdSelectorContainer>
        )}

        <ThItemsContainer size={dataColumnLength} hasSelector={hasSelector}>
          {headers}
        </ThItemsContainer>
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
      const displayDataItem = Object.keys(data).map((item, index) => {
        return (
          <TdDivContainer key={`data-item-key-${index}`}>
            <LabelDataField
              displaySize={Size.NORMAL}
              bold={true}
              label={item}
              size={dataColumnLength}
              hasSelector={hasSelector}
            />
            <LabelValueField
              displaySize={Size.NORMAL}
              label={data[`${item}`].toString()}
            />
          </TdDivContainer>
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
            data[`${type.selectKey}`] === selectedRadio
          }
        >
          {type !== undefined && type.name === 'radio' && (
            <TdSelectorContainer>
              <Radio
                checked={data[`${type.selectKey}`] === selectedRadio}
                value={data[`${type.selectKey}`].toString()}
                displaySize={Size.NORMAL}
                onChange={() =>
                  onRadioChange(data[`${type.selectKey}`].toString())
                }
              />
            </TdSelectorContainer>
          )}
          {type !== undefined && type.name === 'checkbox' && (
            <TdSelectorContainer>
              <Checkbox
                checked={selectedCheckboxes[index]}
                value={data[`${type.selectKey}`].toString()}
                displaySize={Size.NORMAL}
                onChange={() => onCheckboxChange(index)}
              />
            </TdSelectorContainer>
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

type StyledComponentAddOnProps = {
  size: number;
  hasSelector?: boolean;
  isSelected?: boolean;
};

const TableCollectionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
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
      return `1fr 4fr`;
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
      return `1fr 4fr`;
    }
    return `1fr`;
  }};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.SECONDARY : ''};
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.color.UNDERLINED}`};
`;

const TdDivContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
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

const ThItemsContainer = styled.div<StyledComponentAddOnProps>`
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

const TdSelectorContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThDivContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  align-items: center;
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
