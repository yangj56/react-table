import MemoExample from './memo';
import UseContext from './use-context-improved';
import UseEffect from './use-effect';
import UseEffect2 from './use-effect2';
import UseRef from './use-ref';
import UseState from './use-state';

export default function () {
  return (
    <div>
      <MemoExample />
      <UseRef />
      <UseContext />
      <UseEffect2 />
      <UseState />
      <UseEffect />
    </div>
  );
}
