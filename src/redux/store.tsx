import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
export const STORE_KEY = "store";

export const storeAdapter = createEntityAdapter();

export const fetchStore = createAsyncThunk(
  "store/fetchStatus",
  async (_, thunkAPI) => {
    return Promise.resolve([]);
  }
);





export const initialState = storeAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
  usersArr: [],
  peoplesArr: [],



});

export const storeSlice = createSlice({
  name: STORE_KEY,
  initialState: initialState,
  reducers: {
    add: storeAdapter.addOne,
    remove: storeAdapter.removeOne,
    setUserSArr: (state, action) => {
      state.usersArr = action.payload;
      console.log("<<<<<<<++++++++++>>>>>>USERSARR ", action);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        storeAdapter.setAll(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchStore.rejected, (state: any, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      });
  },
});
export const storeReducer = storeSlice.reducer;
export const storeActions = storeSlice.actions;

const { selectAll, selectEntities } = storeAdapter.getSelectors();
export const getStoreState = (rootReducer: any) => rootReducer[STORE_KEY];
export const selectAllStore = createSelector(getStoreState, selectAll);
export const selectStoreEntities = createSelector(
  getStoreState,
  selectEntities
);
