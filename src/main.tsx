import ReactDOM from 'react-dom';
import App from './App';
import Providers from './providers';

import 'i18n';
import './styles/index.css';

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
