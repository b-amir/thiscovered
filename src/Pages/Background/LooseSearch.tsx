import React, { useState } from "react";
import FindIcon from "../../../public/assets/FindIcon";
import ShuffleIcon from "../../../public/assets/ShuffleIcon";
import Spinner from "../../../public/assets/Spinner";

interface LooseSearchProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  resetImagePosition: () => void;
}
interface UnsplashImage {
  user: any;
  urls: {
    regular: string;
  };
  alt_description: string;
}

export const LooseSearch: React.FC<LooseSearchProps> = ({
  imageUrl,
  setImageUrl,
  query,
  resetImagePosition,
  setQuery
}: LooseSearchProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UnsplashImage | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (keyword.length === 0) return;
    setLoading(true);
    fetch(`https://source.unsplash.com/1600x900?${keyword}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return await response.blob();
      })
      .then((blob: Blob) => {
        // create a new object URL from the blob
        const objectUrl = URL.createObjectURL(blob);
        setLoading(false);

        // update the imageUrl state
        setImageUrl(objectUrl);
        resetImagePosition();
        setData(objectUrl);
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
            type="text"
            className="keyword_input"
            placeholder="ex. Developer at work"
            // split the keyword by space and join them with +
            onChange={(event) => {
              setQuery(event.target.value);
              setKeyword(event.target.value.split(" ").join("+"));
            }}
            value={query}
          />
          <button className="secondary-button keyword_button">
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
          <div className="fetch-status found">
            Found: a random image on
            <div className="spacer" />
            <a href="https://unsplash.com/?utm_source=ThisCovered&utm_medium=referral">
              Unsplash
            </a>
            ,<div className="spacer" />
            <a href={data} target="_blank" rel="noreferrer">
              open image
            </a>
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
