import React, {useEffect} from "react";
import "./modal.css";

interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;
	handleSuccess: () => void;
	shouldCloseOnOverlayClick?: boolean; // Optional prop with default value
}

const Modal: React.FC<ModalProps> = ({isOpen, closeModal, handleSuccess, shouldCloseOnOverlayClick = true}) => {
	// 키보드 이벤트 핸들러: ESC 키를 감지하여 모달 닫기
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.keyCode === 27) {
				// ESC key
				closeModal();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [closeModal]);

	// 배경 클릭 시 모달 닫기 핸들러
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (shouldCloseOnOverlayClick) {
			closeModal();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h5 className="modal-title">숫자를 다시 입력해주세요!</h5>
					<button onClick={closeModal} className="modal-close">
						&times;
					</button>
				</div>
				<div className="modal-body">
					<p>1이상의 숫자를 입력해주세요!</p>
				</div>
				<div className="modal-footer">
					<button onClick={closeModal} className="modal-button-close">
						닫기
					</button>
					<button onClick={handleSuccess} className="modal-button">
						성공
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
