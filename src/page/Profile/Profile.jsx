// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
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
  const userId = "1"; // افتراضياً ID المستخدم

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        // @ts-ignore
        setFormData(userDoc.data());
      }
    };
    fetchUserData();
  }, [userId]);

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required";
    // @ts-ignore
    if (!formData.age || isNaN(formData.age)) errors.age = "Valid age is required";
    if (!formData.phone || formData.phone.length < 10)
      errors.phone = "Phone number must be at least 10 digits";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateDoc(doc(db, "users", userId), formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
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
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          // @ts-ignore
          error={!!error.name}
          // @ts-ignore
          helperText={error.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // @ts-ignore
          error={!!error.email}
          // @ts-ignore
          helperText={error.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          // @ts-ignore
          error={!!error.age}
          // @ts-ignore
          helperText={error.age}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          // @ts-ignore
          error={!!error.phone}
          // @ts-ignore
          helperText={error.phone}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
