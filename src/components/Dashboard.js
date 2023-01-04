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

  useEffect(() => {
    const fetchData = async () => {
      const api_key = "RiqVTeIzu1wtDQ4YXNuzhL6LchN4lxhA";
      const response = await API.getGifs(topic, api_key, 4, offset);
      const cleanArr = response.data.data.map((obj) => {
        return {
          original: obj.images.original.url,
          display: {
            url: obj.images.fixed_height.url,
            still: obj.images.fixed_height_still.url,
          },
          title: obj.title,
          // rating: obj.rating,
        };
      });
      console.log(response.data.data);
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
              Enter a category in the search bar to create a button. Click the
              button to pull up 12 gif's of the given category.
            </h3>
          </Col>
          {/* <Col md={3} className="glass"> */}
          <Col md={3}>
            <Row>
              <Col sm={12} className="click">
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
                <Col key={i} md={4}>
                  <Button
                    className="click"
                    variant="secondary"
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
              <ButtonGroup sm={12}>
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
              {gifs.map((obj, i) => (
                <Col sm={6} key={i} className="text-center">
                  <Gif
                    gifObj={obj.display}
                    title={obj.title}
                    rating={obj.rating}
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
