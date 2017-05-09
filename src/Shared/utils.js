import React from 'react';
import { Iterable } from 'immutable';

/* eslint import/prefer-default-export:0 */

// See http://redux.js.org/docs/recipes/UsingImmutableJS.html#use-a-higher-order-component-to-convert-your-smart-components-immutablejs-props-to-your-dumb-components-javascript-props
export const toJS = (WrappedComponent) =>
  (wrappedComponentProps) => {
    const KEY = 0;
    const VALUE = 1;

    const propsJS = Object.entries(wrappedComponentProps)
        .reduce((newProps, wrappedComponentProp) => {
          /* eslint no-param-reassign:0 */
          newProps[wrappedComponentProp[KEY]] =
              Iterable.isIterable(wrappedComponentProp[VALUE])
                  ? wrappedComponentProp[VALUE].toJS()
                  : wrappedComponentProp[VALUE];
          return newProps;
        }, {});

    return <WrappedComponent {...propsJS} />;
  };
