import { useState } from "react";

function getData() {
  return fetch("http://my-backend/fake-date").then((response) =>
    response.json()
  );
}

export default function FetchButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState([]);

  return (
    <div>
      <button
        onClick={() => {
          setIsLoading(true);
          getData()
            .then((response) => {
              setDate(response.data);
            })
            .catch((error) => {
              console.log(error);
              setError(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        PUSH
      </button>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {date.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
