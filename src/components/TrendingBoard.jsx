/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TrendingBoard() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
      axios
          .get(`${process.env.REACT_APP_API_URL}/hashtags/trending?limit=10`, {
              headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyMTYxOTc5LCJleHAiOjE2OTQ3NTM5Nzl9.vPyTUyhgbh2FXzjq4fbbjWXTICseCRA3FkmA2rqknGI` },
          })
          .then((response) => setTrending(response.data))
          .catch((error) => console.log(error));
  }, [])

  return (
    <Board>
      <h2>trending</h2>
      <ul>
        {trending.map((trend, index) => (
          <li key={index}>
            <Link to={`/hashtag/${trend.name}`}># {trend.name}</Link>
          </li>
        ))}
      </ul>
    </Board>
  );
}

const Board = styled.div`
  margin-left: 25px;
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  position: sticky;
  top: 231px;

  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    border-bottom: 1px solid #484848;
    color: #ffffff;
    padding: 18px;
  }

  ul {
    padding-left: 18px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  a {
    color: #ffffff;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 19px;
    text-decoration: none;
    letter-spacing: 0.9px;
  }

  @media (max-width: 1000px) {
    max-width: 611px;
    width: 100%;
    height: auto;
    padding-bottom: 20px;
    position: static;
    margin-left: 0;
    margin-top: 90px;

    ul {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 18px;
    }
  }
`;
