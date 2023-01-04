import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, ButtonGroup } from "react-bootstrap";

import Gif from "./Gif";
import API from "../services";

export default function Dashboard() {
  const [entry, setEntry] = useState("");
  const [categories, setCatergories] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      "cats",
      "funny",
      "unicorns",
    ]
  );
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);

  const variants = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "light",
    "dark",
    "outline-primary",
    "outline-secondary",
    "outline-success",
    "outline-warning",
    "outline-danger",
    "outline-info",
    "outline-light",
    "outline-dark",
  ];

  const randomVariant = () => {
    const len = variants.length;
    const randomIndex = Math.floor(Math.random() * len);
    return variants[randomIndex];
  };

  useEffect(() => {
    const fetchData = async () => {
      const api_key = "RiqVTeIzu1wtDQ4YXNuzhL6LchN4lxhA";
      const response = await API.getGifs(topic, api_key, 4, offset);
      const cleanArr = response.data.data.map((obj) => {
        return {
          original: obj.images.original.url.split("?")[0],
          display: {
            url: obj.images.fixed_height.url.split("?")[0],
            still: obj.images.fixed_height_still.url.split("?")[0],
          },
          title: obj.title,
          id: obj.id,
          // rating: obj.rating,
        };
      });
      // console.log(response.data.data);
      setGifs(cleanArr);
      setLoading(false);
    };

    if (loading) {
      fetchData();
    }
  }, [topic, loading]);

  const addCat = (e) => {
    const currentCat = [...categories];
    if (entry && !currentCat.includes(entry.toLowerCase())) {
      currentCat.push(entry.toLowerCase());
      localStorage.setItem("categories", JSON.stringify(currentCat));
      setCatergories(currentCat);
      setTopic(entry.toLowerCase());
      setOffset(0);
      setLoading(true);
    }
  };

  const selectCat = (e) => {
    const val = e.target.dataset.value;
    setTopic(val.toLowerCase());
    setOffset(0);
    setLoading(true);
  };

  const handleNextClick = (e) => {
    // 4999 is max value from docs
    setOffset(offset + 4 < 4999 ? offset + 4 : 4999);
    setLoading(true);
  };

  const handlePreviousClick = (e) => {
    setOffset(offset - 4 > 0 ? offset - 4 : 0);
    setLoading(true);
  };

  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col md={12} className="glass">
            <h1>Gif-Tastic Search</h1>
            <h3>
              Either click on a category or enter in a new catergory. use Next
              button to pull the next see next page of Gifs. Did you find one
              you like? Download it by clicking the "download" icon.
            </h3>
          </Col>
          {/* <Col md={3} className="glass"> */}
          <Col md={3}>
            <Row>
              <Col sm={12} className="click mb-3">
                <input
                  type="text"
                  name="addCategory"
                  onChange={(e) => setEntry(e.target.value)}
                  value={entry}
                />
                <Button variant="info" onClick={addCat}>
                  Add
                </Button>
              </Col>
              {categories.map((cat, i) => (
                <Col key={i} md={4} className="mx-auto d-grid">
                  <Button
                    className="click"
                    variant={randomVariant()}
                    data-value={cat}
                    onClick={selectCat}
                  >
                    {cat}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
          {/* <Col md={8} className="glass inner-scroll"> */}
          <Col md={9}>
            <Row>
              <ButtonGroup sm={12} className="mb-3">
                {offset > 0 && (
                  <Button
                    variant="outline-secondary"
                    className="click"
                    onClick={handlePreviousClick}
                  >
                    Previous
                  </Button>
                )}

                {topic && (
                  <Button
                    variant="outline-secondary"
                    className="click"
                    onClick={handleNextClick}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
              {gifs.map((obj) => (
                <Col sm={6} key={obj.id} className="text-center">
                  <Gif
                    gifObj={obj.display}
                    title={obj.title}
                    original={obj.original}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
