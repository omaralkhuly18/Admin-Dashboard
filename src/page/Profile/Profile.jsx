// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import app from "../../firebaseConfig";

const db = getFirestore(app);

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = "1"; // افتراضياً ID المستخدم

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setFormData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.age || isNaN(formData.age)) errors.age = "Valid age is required";
    if (!formData.phone || formData.phone.length < 10)
      errors.phone = "Phone number must be at least 10 digits";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Zip code is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateDoc(doc(db, "users", userId), formData);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" mb={2}>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        {["name", "email", "age", "phone", "address", "city", "zipCode"].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            error={!!error[field]}
            helperText={error[field]}
            sx={{ mb: 2 }}
            type={field === "age" || field === "zipCode" ? "number" : "text"}
          />
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
      {errorMessage && (
        <Snackbar open autoHideDuration={3000} onClose={() => setErrorMessage("")}>
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Profile;
