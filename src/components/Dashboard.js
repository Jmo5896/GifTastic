import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";

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

  useEffect(() => {
    const fetchData = async () => {
      const api_key = "Xmjj3tQNWDaq5vc3DK3xgquSrhGcMVdY";
      const response = await API.getGifs(topic, api_key, 12);
      const cleanArr = response.data.data.map((obj) => {
        return {
          url: obj.images.original.url,
          still: obj.images.original_still.url,
          title: obj.title,
          rating: obj.rating,
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
      setCatergories(currentCat);
      setTopic(entry.toLowerCase());
      setLoading(true);
    }
  };

  const selectCat = (e) => {
    const val = e.target.dataset.value;
    setTopic(val.toLowerCase());
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
          <Col md={3} className="glass">
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
          <Col md={8} className="glass">
            <Row>
              {gifs.map((obj, i) => (
                <Col sm={6} key={i}>
                  <Gif gifObj={obj} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
