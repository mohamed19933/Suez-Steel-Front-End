import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const HandleMode = (dispatch) => {
  return dispatch(toggleTheme());
};

export const HandleDrawer = (dispatch) => {
  return dispatch(toggleDrawer());
};

export const GetLogInUserData = async (dispatch, token, Data) => {
  await dispatch(successToast({ Data }));
  await dispatch(setToken({ token }));
};
export const InsertNewLogin = async (dispatch, Data) => {
  await dispatch(NewUserToast({ Data }));
};
export const SuccessToast = async (dispatch, Data) => {
  await dispatch(successToast({ Data }));
};
export const ErrorToast = async (dispatch, Data) => {
  await dispatch(errorToast({ Data }));
};
export const FetchUserData = async (dispatch, data) => {
  await dispatch(fetchuserinfo(data));
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    email: null,
    username: null,
    role: null,

    isDrawerOpen: true,
    ThemeModeLight: true,

    errorMessage: null,
    authorities: [],

    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    isDoneEdit: false,
    error: "",
    data: [],
  },
  reducers: {
    clearState: (state) => {
      state.username = null;
      state.token = null;
      state.email = null;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },

    toggleDrawer: (state) => {
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    },

    toggleTheme: (state) => {
      return {
        ...state,
        ThemeModeLight: !state.ThemeModeLight,
      };
    },
    setToken: (state, action) => {
      console.log("Auth = ", action);

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.token.user.name,
        role: action.payload.token.user.role,
      };
    },
    successLoginToast: (state, action) => {
      toast.success(action.payload);

      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        isSuccess: true,
      };
    },
    NewUserToast: (state, action) => {
      toast.success(action.payload.Data);
    },
    errorLoginToast: (state, action) => {
      toast.error(action.payload);
    },
    fetchuserinfo: (state, action) => {
      return {
        ...state,
        username: action.payload.fullName,
        email: action.payload.email,
        authorities: action.payload.authorities[0],
      };
    },
    successToast: (state, action) => {
      toast.success(action.payload.Data, {
        pauseOnFocusLoss: false,
        toastId: "customId",
      });
    },
    errorToast: (state, action) => {
      toast.error(action.payload.Data, {
        pauseOnFocusLoss: false,
        toastId: "customId",
      });
    },
    setIntialRequestStates: (state) => {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: "",
        isDoneEdit: false,
        data: [],
      };
    },
    setDataStates: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: "",
        data: action.payload[0],
        totalItems: action.payload[1],
        isDoneEdit: false,
      };
    },
    setPostStates: (state) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: "",
        isDoneEdit: true,
      };
    },
    setSuccessStates: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: "",
        data: action.payload,
      };
    },
  },
});
export const {
  successLoginToast,
  errorToast,
  successToast,
  setPostStates,
  setDataStates,
  setIntialRequestStates,
  errorLoginToast,
  clearState,
  toggleTheme,
  toggleDrawer,
  fetchuserinfo,
  setToken,
  NewUserToast,
} = authSlice.actions;
export default authSlice.reducer;
export const callingRedux = (state) => state.authSlice;
