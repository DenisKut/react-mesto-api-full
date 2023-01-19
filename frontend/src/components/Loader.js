export default function Loader({isOpen}) {
  return(
    <div className={`popup popup_loader ${isOpen && 'popup_opened'}`}>
      <div className="popup__loader">
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
        <div className="popup__wave"></div>
      </div>
    </div>
  );
}
