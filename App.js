import 'react-native-gesture-handler';
import React from 'react';
import Main from './components/MainComponent'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
console.disableYellowBox = true;

const { persistor, store } = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<Loading />}
                persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
}