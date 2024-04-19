import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import { InputURL } from './component/InputURL.tsx';
import { Board } from './component/Board.tsx';

function App() {
	return (
		<div className='App'>
			<Container>
				<div className='title' style={{ display: 'flex', justifyContent: 'center' }}>
					To do List
				</div>
				<InputURL />
				<Board />
			</Container>
		</div>
	);
}

export default App;
