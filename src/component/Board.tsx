import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IssueeItem } from './IssueeItem.tsx';
import { RootState } from '../state/index.ts';

export const Board: React.FC = () => {
	const issuesSelector = useSelector((state: RootState) => state.issues) as any;
	const [boarders, setBoards] = useState<any[]>([
		{
			id: 1,
			title: 'To Do',
			items: issuesSelector.issues,
		},
		{
			id: 2,
			title: 'In Progress',
			items: [],
		},
		{ id: 3, title: 'Done', items: [] },
	]);
	const [currentBoard, setCurrentBoard] = useState<any>(null);
	const [currentItem, setCurrentItem] = useState<any>(null);

	useEffect(() => {
		setBoards([
			{
				id: 1,
				title: 'To Do',
				items: issuesSelector.issues,
			},
			{
				id: 2,
				title: 'In Progress',
				items: [],
			},
			{ id: 3, title: 'Done', items: [] },
		]);
	}, [issuesSelector]);

	const dragOverCardHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.classList.contains('item')) {
			// e.currentTarget.style.boxShadow = '0 2px 3px gray';
			e.currentTarget.style.background = 'red';
		}
	};

	function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: any) {
		if (currentBoard === null) {
			return;
		}

		if (board.items.length === 0) {
			const updatedBoardItems = [...board.items, currentItem];
			const currentIndex = currentBoard.items.indexOf(currentItem);

			const updatedCurrentBoardItems = [...currentBoard.items];
			updatedCurrentBoardItems.splice(currentIndex, 1);

			const updatedBoarders = boarders.map((b: any) => {
				if (b.id === board.id) {
					return { ...b, items: updatedBoardItems };
				}
				if (b.id === currentBoard.id) {
					return { ...b, items: updatedCurrentBoardItems };
				}
				return b;
			});

			setBoards(updatedBoarders);
		}
	}
	return (
		<div className='boards' style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
			{boarders.map(board => (
				<div key={board.id} className='board' onDragOver={e => dragOverCardHandler(e)} onDrop={e => dropCardHandler(e, board)} style={{ width: '100%', border: '1px solid #000', padding: '5px' }}>
					<div className='boarderName'>{board.title}</div>
					<div className='boardItems' style={{ gap: '10px' }}>
						{board.items.map((item: any) => (
							<IssueeItem key={item.id} item={item} setCurrentItem={setCurrentItem} setCurrentBoard={setCurrentBoard} currentBoard={currentBoard} currentItem={currentItem} board={board} setBoards={setBoards} boarders={boarders} />
						))}
					</div>
				</div>
			))}
		</div>
	);
};
