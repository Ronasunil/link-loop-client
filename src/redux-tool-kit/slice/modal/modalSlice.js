import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
  gifModalIsOpen: false,
  feelingModalIsOpen: false,
  commentModalIsOpen: false,
  reactionModalIsOpen: false,
  fileDialougeIsOpen: false,
  imageModalIsOpen: false,
  videoModalIsOpen: false,
  type: "",
  text: "",
  bgColor: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalIsOpen = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },

    

    addBgColor(state, action) {
      state.bgColor = action.payload.bgColor;
    },

    addImg(state, action) {
      state.img = action.payload.img;
    },

    closeModal(state) {
      (state.modalIsOpen = false),
        (state.gifModalIsOpen = false),
        (state.feelingModalIsOpen = false),
        (state.commentModalIsOpen = false),
        (state.reactionModalIsOpen = false),
        (state.fileDialougeIsOpen = false),
        (state.type = ""),
        (state.text = ""),
        (state.img = ""),
        (state.feeling = ""),
        (state.bgColor = "");
    },

    addPostFeeling(state, action) {
      state.feeling = action.payload.feeling;
    },

    toggleGifModal(state, action) {
      state.gifModalIsOpen = action.payload.gifModalIsOpen;
    },

    toggleFeelingModel(state, action) {
      state.feelingModalIsOpen = action.payload.feelingModalIsOpen;
    },

    toggleVideoModal(state, action) {
      state.videoModalIsOpen = action.payload.videoModalIsOpen;
    },

    toggleImageModal(state, action) {
      state.imageModalIsOpen = action.payload.imageModalIsOpen;
    },

    toggleCommentModal(state, action) {
      state.commentModalIsOpen = action.payload.commentModalIsOpen;
    },
  },
});

export const {
  addPostFeeling,
  closeModal,
  openModal,
  toggleCommentModal,
  toggleFeelingModel,
  toggleGifModal,
  toggleImageModal,
  toggleVideoModal,
  addBgColor,
  addImg,
} = modalSlice.actions;
export default modalSlice.reducer;
