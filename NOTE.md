# useState
1. we can only use hooks in functional components
2. cannot wrap declaraction of hooks with anything such as if or function
3. use previous when setting new state base on the previous state
4. if we dont use previous the next use of the state is still original state and not the updated state
5. we can set useState initialState as function, because it will prevent what is inside initialState from retriggering everytime the component rerenders
6. when the useState is an object, we need to update the whole object unlike class.state which we can choose to only update the object.field we want
7. so we need to spread, or we can create multiple useState for each object item

# useEffect
1. event listener must be remove when the component is unmount or removed
2. same for subscribing

# useContext
1. functional component can useContext to easily retrieve the context
2. we can create custom context hooks with all the required context stuffs

# useRef
1. if we useState to manage a dependent state it will cause infinite loops
2. useRef is able persist state between renders thats why it is different from useState and normal const assignment
3. useRef does not cause the component to reupdate
4. we can use useRef to store ref but we should not use ref to do any dom manipulation
5. we can use useRef to store previous value
  - variable declared using useRef doesn't get included in the react life cycle 
  - if any state updates the value defined using useRef doesn't change that's the advantage
  - variable declared without using useRef gets reclared upon component re-render.

# useMemo
1. it is the idea of caching the result
2. anytime when we update state, all the const or functions will get rerender and if the const or function is doing some slow process
3. so not to rerun those functions everytime a state change we can memo those functions if the value is not changes
4. useMemo has dependencies array to check if the value has changed, if it is changed it will rerun the function else it will return cached data
5. we can useMemo for referential integrity as well
  - let's say we have a useEffect which has a dependency array with a theme object which is using const themeObject = {...}
  - when we update other parts of the component's state, the useEffect hook will be triggered because the themeObject is a new object
  - javascript cannot compare objects even if they have the same value because they are referencing to different object memory space
  - we can use useMemo to wrap the themeObject so everytime when we rerender the themeObject is the same reference

# React.memo
1. Components in React are designed to re-render whenever the state or props value changes.
2. React Memo is a higher-order component that wraps around a component to memoize the rendered output and avoid unnecessary renderings. 
3. A memoized component will only re-render when there is a change in props value or when the state and context of the component change.
4. but should we memo every components?
  - If the state and content of your component will ALWAYS change, React Memo becomes useless.
  - Use memo when your component often renders with the same props.
  - Use it if your component is big enough (contains a decent amount of UI elements) to have props equality check.
  - example: a child component is taking in a long list of items and the parent component has a few other state which changes the cosmetic of the component
    - we dont want the change of other state to rerender the child component 
    - so we memo the child component

# useCallback
1. setup with parent and child component
2. child component is passed with a function that returns a value
3. when the parent update other states it will cause the component to rerender, and the function is recreated
4. when the newly recreated function is passed down to the child, the child will rerender because it is a new function
5. child with the useEffect will be rerender even if the functions are not changed
6. solution is that we need to wrap the function that is passed down to the child with useCallback
7. so when the parent component rerender, it will check if the items are changed, if changed it will create new function else it will return the same function
8. so useCallback memo the whole function and the child still need to run the function to get the value while useMemo is returning the value from the function
9. with the ability to pass functions we then can use useCallback with parameters