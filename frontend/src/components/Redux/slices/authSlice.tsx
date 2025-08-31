import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { AuthState, User } from "../../helper/interface";


const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data") as string)
    : null,
  notes: [],
  loading: false,
  error: null
};

export const createAccount = createAsyncThunk('auth/getOtp', async (data: User, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('/api/v1/user/signup', data);

    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to create your account"
    })

    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Failed to create your account";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const verifyEmail = createAsyncThunk('auth/verify-email', async (data: { email: string, otp: string }, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('/api/v1/user/verify-email', data);

    toast.promise(res, {
      loading: "Wait! process going on...",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to verify your email"
    })

    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Failed to verify your account";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const userLogin = createAsyncThunk('auth/login', async (data: { email: string }, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('/api/v1/user/signin', data);

    toast.promise(res, {
      loading: "Wait! sending otp...",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to sending otp"
    })

    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Failed to create your account";
    toast.error(message);
    return rejectWithValue(message);
  }
})


export const verifyOTP = createAsyncThunk('auth/verify-email', async (data: { email: string, otp: string, keepLoggedIn: boolean }, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('/api/v1/user/verify-otp', data);

    toast.promise(res, {
      loading: "Wait! otp processing...",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to login"
    })

    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const getUser = createAsyncThunk('auth/getUser', async (_NEVER, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/v1/user/getUser');

    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const getUserNotes = createAsyncThunk('auth/getUserNotes', async (_NEVER, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/v1/user/getAllNotes');

    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const createNote = createAsyncThunk('auth/addNotes', async (data: { content: string }, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('/api/v1/user/create-note', data);
    toast.promise(res, {
      loading: "Wait! creating note...",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to create note"
    })
    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const deleteNote = createAsyncThunk('auth/deleteNote', async (data: { noteId: string }, { rejectWithValue }) => {
  try {
    const res = axiosInstance.delete('/api/v1/user/delete-note', { data: data });
    toast.promise(res, {
      loading: "Wait! deleting note...",
      success: (response) => {
        return response?.data?.message
      },
      error: "Failed to delete note"
    })
    return (await res).data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})

export const userlogout = createAsyncThunk('auth/userLogout', async (_NEVER, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/api/v1/user/logout");
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
    return rejectWithValue(message);
  }
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("data", JSON.stringify(action.payload?.data));
        localStorage.setItem("isLoggedIn", "true");
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload?.data));
        localStorage.setItem("isLoggedIn", "true");
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        console.log(action.payload);
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        state.notes = action.payload.data;
        console.log(action.payload);
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload.data);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload.data._id);
      })
      .addCase(userlogout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.notes = [];
        localStorage.clear();
        toast.success("Logged out successfully");
      });
  }
});

export default authSlice.reducer;