import './App.css';
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chats';
const socket = io.connect('http://localhost:3001');

function App() {
	const [username, setUserName] = useState('');
	const [room, setRoom] = useState('');
	const [showChat, setShowChat] = useState(false);
	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
			setShowChat(true);
		}
	};
	return (
		<div className='App'>
			{!showChat ? (
				<div className='joinChatContainer'>
					<h3>Secret chat room</h3>
					<input
						type='text'
						placeholder='Jonn.. '
						onChange={(event) => {
							setUserName(event.target.value);
						}}
					/>
					<input
						type='text'
						placeholder=' Romm id'
						onChange={(event) => {
							setRoom(event.target.value);
						}}
					/>
					<button onClick={joinRoom}> Join the room</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
