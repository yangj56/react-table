import { Label } from 'react-component-library';
type Props = {
  name: string;
};
export default function simple(props: Props) {
  console.log(Label);
  return (
    <div>
      <Label label="test" />
    </div>
  );
}
