import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './global.css';
import { ResultsContextProvider } from './contexts/ResultContextProvider';
import { Results } from './components/Results';
const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
	<ResultsContextProvider>
		<Router>
			<App />
		</Router>
	</ResultsContextProvider>
);
