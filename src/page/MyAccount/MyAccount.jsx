// eslint-disable-next-line no-unused-vars
import React from "react";

const MyAccount = () => {
  return (
    <div>
      <h1>My Account</h1>
      {/* نموذج لإدارة إعدادات الحساب */}
      <form>
        <label>
          Change Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MyAccount;
