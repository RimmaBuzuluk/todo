import React, { Dispatch, SetStateAction } from 'react';
import { Card } from 'react-bootstrap';

interface Board {
	id: number;
	title: string;
	items: any[];
}

interface IssueeItemProps {
	item: {
		id: number;
		title: string;
		comments: number;
		number: number;
		author_association: string;
		updated_at: string;
	};
	setCurrentBoard: Dispatch<SetStateAction<any>>;
	setCurrentItem: Dispatch<SetStateAction<any>>;
	currentItem: any;
	currentBoard: Board | null;
	board: {
		id: number;
		title: string;
		items: any[];
	};
	setBoards: Dispatch<SetStateAction<any>>;
	boarders: any[];
}

export const IssueeItem: React.FC<IssueeItemProps> = ({ item, setCurrentBoard, setCurrentItem, currentBoard, currentItem, board, setBoards, boarders }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const currentDate = new Date();
		const diffInDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
		const diffInHours = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60));

		if (diffInDays > 0) {
			return `${diffInDays} days ago`;
		} else {
			return `${diffInHours} hours ago`;
		}
	};

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.classList.contains('item')) {
			// e.currentTarget.style.boxShadow = '0 2px 3px gray';
			// e.currentTarget.style.background = 'red';
		}
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		// e.currentTarget.style.boxShadow = 'none';
		e.currentTarget.style.background = '#fff';
	};

	const dragStartHandler = (board: any, item: any) => (e: React.DragEvent<HTMLDivElement>) => {
		setCurrentBoard(board);
		setCurrentItem(item);
	};
	const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
		// e.currentTarget.style.boxShadow = 'none';
		e.currentTarget.style.background = '#fff';
	};

	const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: any, item: any) => {
		e.preventDefault();
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);
		board.items.splice(dropIndex + 1, 0, currentItem);
		setBoards([...boarders]);
	};

	return (
		<Card style={{ width: '100%', border: '1px solid #000', background: '#fff', marginTop: '10px' }} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragStart={dragStartHandler(board, item)} onDragEnd={dragEndHandler} onDrop={e => dropHandler(e, board, item)} className='item' draggable={true}>
			<Card.Body>
				<Card.Title>{item.title}</Card.Title>
				<Card.Text>
					{item.number} opened {formatDate(item.updated_at)}
				</Card.Text>
				<Card.Text>
					{item.author_association} | Comment: {item.comments}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};
