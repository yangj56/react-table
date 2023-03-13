import { SelectType } from '../components/table';

export function createCheckboxIdState(
  data: Record<string, string>[],
  type?: SelectType
): Record<string, boolean> {
  if (type && type.name === 'checkbox') {
    const stateArray = data.map((item) => ({ [item['ID']]: false }));
    return Object.assign({}, ...stateArray);
  }
  return {};
}
