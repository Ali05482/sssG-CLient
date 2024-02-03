import Head from "next/head";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ToDo from "../settings/ToDo";
import Link from "next/link";

const AVAILABILITY = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <Head>
        <link href="/settings/assets/css/style.css" rel="stylesheet" />
      </Head>
      <main id="main">
        <section id="about" className="about">
          <div className="">
            <div className="section-title">
              <h2>AVAILABILITY</h2>
            </div>

            <Container fluid className="aboutContainer">
              <Row className="d-flex align-items-center contents">
                <Col xs={12} sm={6} md={3} className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Virtual Care Only"
                  >
                    <option selected>Virtual Care Only</option>
                    <option value="2">Clinic and Virtual Care</option>
                    <option value="3">In Clinic Only</option>
                  </select>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex justify-content-end"
                >
                  <button type="button" className="btn btn-primary">
                    Save Availability
                  </button>
                </Col>
              </Row>
              <Row className="contents">
                {daysOfWeek.map((day, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={3}
                    className="mb-3"
                  >
                    <Card>
                      <Card.Header>
                        <Link href={`/days/${day.toLowerCase()}`}>
                          <Button variant="success">{day}</Button>
                        </Link>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>Est</Card.Title>
                        <Card.Text>
                          Virtual & Clinic from: 9:00 AM to: 10:00 AM Default
                          from: 11:00 AM to: 9:00 PM
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row className="">
                <Col
                  xs={12}
                  className="d-flex justify-content-center align-item-center"
                >
                  <Button className="d-inline-block">
                    Make exceptions for specific dates
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </main>
    </>
  );
};

export default AVAILABILITY;
