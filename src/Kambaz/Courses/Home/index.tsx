import Modules from "../Modules";
import CourseStatus from "./Status";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
    return (
      <Container fluid id="wd-home">
        <Row>
          <Col xs={12} lg={9} className="mb-3 mb-lg-0">
            <Modules />
          </Col>
          <Col lg={3} className="d-none d-lg-block">
            <div className="position-sticky" style={{ top: "20px" }}>
              <CourseStatus />
            </div>
          </Col>
        </Row>
      </Container>
    );
}

