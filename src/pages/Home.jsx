import { useEffect, useState } from "react";
import {
    Route,
    Routes,
    Link,
} from "react-router-dom";
import { Button, Container, Row, Col, Image, Nav } from 'react-bootstrap';


const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(data);
    useEffect(() => {
        console.log("HELLO2");
        async function getDataFromDB(){
            await fetch("http://127.0.0.1:5000/get_all_entries").then(r => r.json()).then(
                (r) => {
                    console.log("HELLO");
                    setData(r);
                    console.log(r)
                    setError(null);
                }
            ).catch((err) => {
                setError(err.message);
                setData(null);
            })
                .finally(() => {
                    setLoading(false);
                });
        }
        getDataFromDB();
        
    },[]);

    const ListItem = (props) => {
        return (
            <div key={`${props.data.month}-${props.data.year}`} className="d-flex flex-row justify-content-sm-evenly align-items-center p-2 list-item">
                <Image className="me-2 ms-0 img-fluid list-item-image" src="https://via.placeholder.com/150" />
                <div className="d-flex flex-column list-item-text">
                <Link to={`/view/${props.data.month}/${props.data.year}`}>
                    <div className="text-wrap fs-3 list-item-title">{props.data.title}</div>
                    <div className="list-item-date">{props.data.month} {props.data.year}</div>
                </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <Nav>
                <Image src="/DCSlogo.png" className="dcslogo"></Image>
                <h1 className="page-title">Newsletter - Homepage</h1>
            </Nav>
            <div className="pagelistall d-flex align-items-center flex-column">
            {!loading && data && data.map((entry) => <ListItem data={entry}/>)}
            </div>
        </>
    )
}

export default Home;