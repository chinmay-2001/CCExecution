import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setError } from 'react';
import axios from 'axios';
import { useState } from 'react';

function Imp() {
    // let[ResponceData,setresponceData]=useState([])
    const [Data, setDate] = useState({ api: "" })
    const [error, setError] = useState("");
    const [ResponceData,setresponceData]= useState([])
    const handleChange = ({ currentTarget: input }) => {
        setDate({ ...Data, [input.name]: input.value });
        console.log(Data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(Data.api);
            console.log(res.data)
            setresponceData(res.data)       

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }
    return (
        <>
            <Container>
                <br />
                <br />
                <Row>
                    <Col></Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><b>Enter API URL</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter URL" name="api" onChange={handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit" id="btn"  onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    <Col></Col>
                    <Col>
                    <b> Data </b>
                    </Col>
                    <Col></Col>


                </Row>
                <Row>
                    <Col></Col>
                    {/* <Col><textarea name="get" cols="60" rows="15" id="message"></textarea></Col> */}
                    <Col>
                    <p>
                    {ResponceData.map((data)=>{
                        return(
                        <>{data.id}</>
                        );
                        
                    })}</p></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Imp;