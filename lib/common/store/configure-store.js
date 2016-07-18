import { compose, createStore } from 'redux';
import rootReducer from '../reducer';

export default function configureStore(initialState) {
    const middleware = compose(
        // Redux DevTools Extension - https://github.com/zalmoxisus/redux-devtools-extension
        typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStore(
        rootReducer,
        initialState,
        middleware
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducer', () => {
            const nextRootReducer = require('../reducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
