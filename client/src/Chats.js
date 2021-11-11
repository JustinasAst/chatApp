import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
	const [currentMessage, setCurentMesage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const sendMesage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			};

			await socket.emit('send_message', messageData);
			setMessageList((list) => [...list, messageData]);
			setCurentMesage('');
		}
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live chat</p>
			</div>

			<div className='chat-body'>
				<ScrollToBottom className='massage-container'>
					{messageList.map((massgeContent) => {
						return (
							<div className='message' id={username === massgeContent.author ? 'you' : 'other'}>
								<div>
									<div className='message-content'>
										<p>{massgeContent.message}</p>
									</div>
									<div className='message-meta'>
										<p id='time'>{massgeContent.time}</p>
										<p id='author'>{massgeContent.author}</p>
									</div>
								</div>
							</div>
						);
					})}
				</ScrollToBottom>
			</div>
			<div className='chat-footer'>
				<input
					value={currentMessage}
					type='text'
					placeholder='hey'
					onChange={(event) => {
						setCurentMesage(event.target.value);
					}}
				/>
				<button style={{ background: 'white' }} onClick={sendMesage}>
					&#9658;
				</button>
			</div>
		</div>
	);
};

export default Chat;
