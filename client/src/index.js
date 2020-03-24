import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { auth } from './services/AxiosInstances';

const appStore = store();

const checkAuthentication = async () => {
    const endpoint = `api/user/authenticate`;
    try {
        const response = await auth.post(endpoint);
        localStorage.setItem('userKind', response.data.userKind);
    } catch (e) {
        localStorage.removeItem('userKind');
        appStore.dispatch({ type: 'LOGOUT' });
    }
}
checkAuthentication();

const app = (
    <Provider store={appStore}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
