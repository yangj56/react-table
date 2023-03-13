type Props = {
  name: string;
};
export default function simple(props: Props) {
  return <div>{props.name}</div>;
}
