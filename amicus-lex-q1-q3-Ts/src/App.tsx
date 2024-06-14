import React, {useEffect, useState, ChangeEvent, MouseEvent} from "react";
import Modal from "./Modal";
import "./App.css";

const App: React.FC = () => {
	const [size, setSize] = useState<number>(0);
	const [grid, setGrid] = useState<string[][]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const openModal = () => {
		document.body.style.overflow = "hidden";
		setModalOpen(true);
	};

	const closeModal = () => {
		document.body.style.overflow = "auto";
		setModalOpen(false);
	};

	const handleSuccess = () => {
		setSize(1);
		closeModal();
	};

	useEffect(() => {
		setSize(size);
	}, [size]);

	const handleDraw = () => {
		if (size < 1) {
			openModal();
			return;
		}

		const newGrid: string[][] = Array.from({length: size}, (_, rowIndex) => {
			const newRow: string[] = Array(size).fill("0");

			if (rowIndex === 0 || rowIndex === size - 1) {
				newRow.fill("x");
			} else {
				newRow[0] = "x";
				newRow[size - 1] = "x";
				newRow[rowIndex] = "x";
				newRow[size - 1 - rowIndex] = "x";
			}

			return newRow;
		});

		setGrid(newGrid);
		console.log(newGrid);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSize(Number(e.target.value));
	};

	const handleClick = (e: MouseEvent<HTMLInputElement>) => {
		const input = e.target as HTMLInputElement;
		if (input.value !== "") {
			input.value = "";
		}
	};

	return (
		<div className="App">
			<h1>Lawform Code Review Question 1</h1>
			<div>
				Input Size: <input type="number" value={size} onChange={handleInputChange} onClick={handleClick} />
				<button onClick={handleDraw}>Go</button>
				<Modal isOpen={modalOpen} closeModal={closeModal} handleSuccess={handleSuccess} />
			</div>
			<div className="ResultBox">
				{grid.map((row, rowIndex) => (
					<div key={rowIndex}>
						{row.map((col, colIndex) => (
							<span key={colIndex}>{col}</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
