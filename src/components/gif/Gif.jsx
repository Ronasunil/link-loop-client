import Input from "@components/input/Input";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./gif.scss";
import { gifService } from "@api/gif/GifService";
import { useDispatch } from "react-redux";
import { addPostValues } from "@rtk/slice/post/postSlice";
import { toggleGifModal, toggleImageModal } from "@rtk/slice/modal/modalSlice";
import { useEffectOnce } from "@hooks/useEffectOnce";
import Spinner from "@components/spinner/Spinner";

function Gif() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [controller, setController] = useState(null);
  const dispatch = useDispatch();

  useEffectOnce(async () => {
    const res = await gifService.getTrendingGif();
    console.log(res);
    setGifs(res.data.data);
  });

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (controller) controller.abort();

    const abortController = new AbortController();
    setController(abortController);

    const res = await gifService.getGifByQuery(query, setLoading, { signal: abortController.signal });
    setGifs(res.data.data);
  };

  const handleSelectGif = (e) => {
    dispatch(addPostValues({ gifUrl: e.target.src, image: "" }));
    dispatch(toggleImageModal({ imageModalIsOpen: true }));
    dispatch(toggleGifModal({ gifModalIsOpen: false }));
  };

  console.log("isLoading", loading);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className="giphy-container" id="editable" data-testid="giphy-container">
        <div className="giphy-container-picker" style={{ height: "500px" }}>
          <div className="giphy-container-picker-form">
            <FaSearch className="search" />
            <Input
              onChange={handleSearch}
              placeholder="Search Gif"
              className="giphy-container-picker-form-input"
              value={query}
            />
          </div>
          {loading && <Spinner />}
          <ul className="giphy-container-picker-list" data-testid="unorderedList">
            {gifs.map((gif, index) => (
              <li
                onClick={handleSelectGif}
                className="giphy-container-picker-list-item"
                data-testid="list-item"
                key={index}
              >
                <img style={{ width: "470px" }} src={`${gif.images.original.url}`} alt="" />
              </li>
            ))}
          </ul>

          {!gifs && !loading && (
            <ul className="giphy-container-picker-list">
              <li className="giphy-container-picker-list-no-item">No GIF found</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
export default Gif;
