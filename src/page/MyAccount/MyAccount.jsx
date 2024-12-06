// eslint-disable-next-line no-unused-vars
import React from "react";
import "./MyAccount.css"; // ملف CSS مخصص

const MyAccount = () => {
  return (
    <div className="my-account-container">
      <h1 className="my-account-title">My Account</h1>
      {/* نموذج لإدارة إعدادات الحساب */}
      <form className="my-account-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Change Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="Enter new password"
          />
        </div>
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
