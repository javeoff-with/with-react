import produce from 'immer';
import { useState } from 'react';

type TUnknownState = Record<string ,unknown>;

/**
 * @example
 * const [state, setState] = useSetState({
 *   initialParam: 0,
 * });
 *
 * setState({
 *   initialParam: 1,
 *   secondParam: 2,
 * }) // { initialParam: 1, secondParam: 2 }
 * @param initialState initial object state
 * @returns
 * @param state - current object state which updates on mount like useState
 * @param setState - current consumer function, which batch the rerender
 */
export function useSetState<
  InitialState extends TUnknownState = TUnknownState
>(initialState: InitialState) {
  const [state, setState] = useState<TUnknownState>(
    Object.assign({}, initialState)
  );

  const updateState = (partialState:
    Partial<TUnknownState> |
    ((state: TUnknownState) => TUnknownState)
  ) => {
    if (typeof partialState === 'object') {
      return produce(state, (draftState) => {
        const newState = Object.assign(draftState, partialState);
        setState(newState);
      })
    }

    const stateConsumer = partialState;

    return stateConsumer(state)
  }

  return [state, updateState];
}
