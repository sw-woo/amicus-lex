import "./App.css";
import {useEffect, useState} from "react";
import Modal from "./Modal";

export function App() {
	const [size, setSize] = useState(0);
	const [grid, setGrid] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		document.body.style.overflow = "hidden"; //스크롤을 모달이 켜지면 비활성화
		setModalOpen(true);
	};

	const closeModal = () => {
		document.body.style.overflow = "auto"; //스크롤을 모달이 닫아지면 다시 활성화
		setModalOpen(false);
	};

	//성공 버튼 클리시 size를 1로 변경해주고 modal을 닫기

	const handleSuccess = () => {
		setSize(1);
		closeModal();
	};

	useEffect(() => {
		setSize(size);
	}, [size]);

	const handleDraw = () => {
		// if (size < 1) {
		// 	console.log("size는 1 이상의 숫자여야 합니다.");
		// 	window.alert("size는 1 이상의 숫자여야 합니다.");
		// 	return;
		// }

		// 모달적용부분

		if (size < 1) {
			openModal();
			return;
		}

		// const newGrid = Array.from({length: size}, (row, rowIndex) => {
		// 	return Array.from({length: size}, (col, colIndex) => {
		// 		// 첫 번째 및 마지막 행, 첫 번째 및 마지막 열, 대각선
		// 		if (rowIndex === 0 || rowIndex === size - 1 || colIndex === 0 || colIndex === size - 1 || rowIndex === colIndex || rowIndex === size - 1 - colIndex) {
		// 			return "X";
		// 		}
		// 		return "O";
		// 	});
		// });

		//위에 코드는 중첩된 루프를 사용하여 모든 셀에 대해 복잡한 조건을 반복적으로 검사하여 연산비용(시간복잡도가) 더 높았다면
		//아래코드는 먼저 전체 행을 "0"으로 초기화하고, 특정 조건에 따라서만 "x"로 변경합니다. 이로 인해 각 행의 특정 위치만 수정하면 되므로 처리 과정이 더 명확해지고 중복 계산이 감소합니다.

		const newGrid = Array.from({length: size}, (row, rowIndex) => {
			// 초기에 모든 값을 '0'으로 채운 새 행 배열 생성
			const newRow = Array(size).fill("0");

			// 첫 번째와 마지막 행 전체를 'x'로 설정
			if (rowIndex === 0 || rowIndex === size - 1) {
				return newRow.fill("x");
			}

			// 첫 번째와 마지막 열을 'x'로 설정
			newRow[0] = "x";
			newRow[size - 1] = "x";

			// 대각선에 'x' 설정
			newRow[rowIndex] = "x"; // 주 대각선
			newRow[size - 1 - rowIndex] = "x"; // 부 대각선

			return newRow;
		});

		setGrid(newGrid);
		console.log(newGrid);
	};

	const handleInputChange = (e) => {
		setSize(Number(e.target.value));
	};

	// 사용자 UX를 위해서 입력 필드를 클릭했을 때 기존 값이 “0”인 경우, 이를 비우는 이벤트 핸들러를 추가합니다
	const handleClick = (e) => {
		if (e.target.value !== "") {
			e.target.value = "";
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
}

export default App;
