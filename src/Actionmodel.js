import "./App.css";

function ActionModal({ onDeposit, onWithdraw }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box animate-pop">
        <h2>Login Successful ✅</h2>
        <p>Next action select pannu macha 👇</p>

        <div className="modal-actions">
          <button className="btn deposit-btn" onClick={onDeposit}>
            💰 Deposit
          </button>
          <button className="btn withdraw-btn" onClick={onWithdraw}>
            💸 Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionModal;