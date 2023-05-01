import React, { useState } from "react";
import FindIcon from "../../../public/assets/FindIcon";
import ShuffleIcon from "../../../public/assets/ShuffleIcon";
import Spinner from "../../../public/assets/Spinner";

interface UnsplashImage {
  user: any;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageSearchProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ImageSearch: React.FC<ImageSearchProps> = ({
  query,
  setQuery,
  setImageUrl
}: ImageSearchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UnsplashImage | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (query.length === 0) return;
    setLoading(true);
    fetch(`https://api.unsplash.com/photos/random?query=${query}`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return await response.json();
      })
      .then((data) => {
        setData(data);
        setImageUrl(data.urls.regular);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setError(error);
        setLoading(false);
      });
  }

  return (
    <div className="inner-control-col keyword">
      <label htmlFor="keyword" className="keyword_label">
        <span>Keyword</span>
        <form onSubmit={handleSubmit}>
          <input
            className="keyword_input"
            type="text"
            placeholder="ex. Developer at work"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="secondary-button keyword_button" type="submit">
            {data != null ? <ShuffleIcon /> : <FindIcon />}
          </button>
        </form>
      </label>

      {loading && (
        <div className="fetch-status loading">
          <Spinner />
          Loading
        </div>
      )}
      {!loading && data != null && (
        <>
          {/* <img src={data.urls.regular} alt={data.alt_description} /> */}
          <div className="fetch-status found">
            Found:
            {/* <div className="image-credits"> */}
            {/* <p> */} by <a href={data.user.links.html}>{data.user.name}</a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=ThisCovered&utm_medium=referral">
              Unsplash
            </a>
            , <a href={data.urls.regular}>link to image</a>
            {/* </p> */}
            {/* </div> */}
          </div>
        </>
      )}
      {!loading && error != null && (
        <div className="fetch-status error">
          Error fetching image {error.message}
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
