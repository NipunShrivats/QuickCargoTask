import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./UserModal.css";

const genders = ["Male", "Female", "Other"];

export default function UserModal() {
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setToastOpen(true);
    reset();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              fullWidth
              margin="dense"
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="dense"
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              label="Birth Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              {...register("birthDate", { required: "Birth date is required" })}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="dense"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Gender"
              select
              fullWidth
              margin="dense"
              defaultValue=""
              {...register("gender", { required: "Gender is required" })}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => reset()}>Reset</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            type="submit"
            form="userForm"
            disabled={!isValid}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message="User added successfully!"
      />
    </>
  );
}
