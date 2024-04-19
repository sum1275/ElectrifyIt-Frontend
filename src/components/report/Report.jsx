import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import axios from "axios";

function Report() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [frequency, setFrequency] = useState("");
  const [pageno, setPageno] = useState(1);
  const [vdata, setVdata] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      // let Enpoint =
      //   import.meta.env.VITE_API_URL +
      //   `listing?frequency=${frequency}&startDate=${startDate}&endDate=${endDate}&page=${pageno}`;
      try {
        setError(false);
        setLoading(true);
        let Endpoint = `${
          import.meta.env.VITE_API_URL
        }listing?frequency=${frequency}&page=${pageno}`;
        if (startDate) {
          Endpoint += `&startDate=${startDate}`;
        }
        if (endDate) {
          Endpoint += `&endDate=${endDate}`;
        }

        const response = await axios.get(Endpoint, {
          signal: controller.signal,
        });
        let data = [];
        if (
          response.data.data.length > 0 &&
          response.data.data[0].hasOwnProperty("data")
        ) {
          data = response.data.data.map((d) => d.data[0]);
        } else {
          data = response.data.data;
        }
        // console.log("response 24--", data);
        setVdata(data);
        setLoading(false);
        return () => {
          controller.abort();
        };
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("Request cancel", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
  }, [frequency, startDate, endDate, pageno]);

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleStartDate = (date) => {
    // console.log("handleStartDate", handleDateChange(date));
    setStartDate(handleDateChange(date));
  };

  const handleEndDate = (date) => {
    // console.log("handleEndDate", handleDateChange(date));

    setEndDate(handleDateChange(date));
  };

  const handleFrequencyChange = (event) => {
    // console.log("frequency bhai", event.target.value);
    setFrequency(event.target.value);
  };
  const prevPage = () => {
    if (pageno > 1) {
      setPageno(pageno - 1);
    }
  };
  const nextPage = () => {
    if (pageno >= 1) {
      setPageno(pageno + 1);
    }
  };
  if (loading) {
    return <h1>Loading ....</h1>;
  }
  console.log("vdata 92--", vdata);
  return (
    <div className="report">
      <Container
        fluid
        style={{
          backgroundColor: "#c4c4c4",
          minWidth: "110%",
          maxWidth: "150%",
          margin: "1rem",
          paddingTop: "1rem",
        }}
      >
        <Row className=" mb-4">
          <Col>
            <label htmlFor="report" className="mb-0 fw-bold">
              Report:
            </label>
          </Col>
          <Col>
            <select
              name="frequency"
              id="frequency-select"
              value={frequency}
              onChange={handleFrequencyChange}
              className="form-select"
            >
              <option value="" ><strong>--Frequency--</strong></option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </Col>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={handleStartDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select Start Date"
              className="form-control"
            />{" "}
          </Col>
          <Col>
            <DatePicker
              selected={endDate}
              onChange={handleEndDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select End Date"
              className="form-control"
            />
          </Col>
        </Row>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>License Plate</th>
              <th>Make</th>
              <th>Model</th>
              <th>VIN</th>
              <th>Type</th>
              <th>Date</th>
              <th>Miles Driven</th>
            </tr>
          </thead>
          <tbody>
            {vdata.map((item, index) => (
              <tr key={index}>
                <td>{item.licensePlate}</td>
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.VIN}</td>
                <td>{item.type}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.milesDriven}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="justify-content-center pb-2">
          {" "}
          {/* Added Bootstrap justify-content-end class */}
          <Pagination.First disabled={pageno === 1} onClick={prevPage} />
          <Pagination.Item active>{pageno}</Pagination.Item>
          <Pagination.Last onClick={nextPage} />
        </Pagination>
      </Container>
    </div>
  );
}

export default Report;
