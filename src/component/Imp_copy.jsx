import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setError } from 'react';
import axios from 'axios';
import { useState } from 'react';
const redis=require('redis')
const redisClient =Redis.createClinet()
const DEFAULT_EXPIRATION=3600

function Imp_copy() {
    
    const [Data, setDate] = useState({ api: "" })
    const [error, setError] = useState("");
    const [ResponceData,setresponceData]= useState([])
    
    const handleChange = ({ currentTarget: input }) => {
        setDate({ ...Data, [input.name]: input.value });
        console.log(Data.api);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.time("timer1");
            redisClient.get('photo',async (error,photo)=>{
                if(error) console.error(error)
                if(photo!=null){
                    return res.json(JSON.parse(photo));
                }
                else{
                    const api="https://fakestoreapi.com/products"
                    const res = await axios.get(api);
                    console.log(res.data)
                    redisClient.setex('photo',DEFAULT_EXPIRATION,JSON.stringify(res.data));
                    console.timeEnd("timer1");
                    console.log(api)
                    setresponceData(res.data) 
                }
                
            })
                  

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
                    <Col >
                    <p>
                    {ResponceData.map((data)=>{
                        return(
                        <>{data.title}</>
                        );
                        
                    })}</p></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Imp_copy;