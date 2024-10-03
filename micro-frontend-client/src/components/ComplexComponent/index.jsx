import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut, PolarArea } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ComplexComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Multiple API Calls
  const fetchData = async () => {
    setLoading(true);
    try {
      const api1 = axios.get("https://jsonplaceholder.typicode.com/posts");
      const api2 = axios.get("https://jsonplaceholder.typicode.com/users");
      const api3 = axios.get("https://jsonplaceholder.typicode.com/albums");
      const api4 = axios.get("https://jsonplaceholder.typicode.com/photos");
      const api5 = axios.get("https://jsonplaceholder.typicode.com/comments");

      const [response1, response2, response3, response4, response5] =
        await Promise.all([api1, api2, api3, api4, api5]);
      setData([
        response1.data,
        response2.data,
        response3.data,
        response4.data,
        response5.data,
      ]);
    } catch (error) {
      console.error("API Fetching Error", error);
    } finally {
      console.log("finally called");

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Charts Sample Data
  const chartData = {
    labels: ["Data1", "Data2", "Data3"],
    datasets: [
      {
        label: "Sample Dataset",
        data: [12, 19, 3],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  if (loading) {
    return (
      <Container className="loading-container">
        <Row className="justify-content-md-center">
          <Spinner animation="border" role="status"></Spinner>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Bootstrap Cards */}
      <Row>
        {["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"].map(
          (title, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    This is a dummy card description with some placeholder data.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>

      {/* Data Tables */}
      <Row>
        {data.map((tableData, index) => (
          <Col key={index}>
            <h3>API Data Table {index + 1}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title || item.name || item.body}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row>
        <Col>
          <h3>Bar Chart</h3>
          <Bar data={chartData} />
        </Col>
        <Col>
          <h3>Line Chart</h3>
          <Line data={chartData} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Pie Chart</h3>
          <Pie data={chartData} />
        </Col>
        <Col>
          <h3>Doughnut Chart</h3>
          <Doughnut data={chartData} />
        </Col>
        <Col>
          <h3>Polar Area Chart</h3>
          <PolarArea data={chartData} />
        </Col>
      </Row>
    </Container>
  );
};

export default ComplexComponent;
