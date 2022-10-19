import {
    Route,
    Routes,
    Link,
    useParams
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { usePdf } from '@mikecousins/react-pdf';
import { Button, Container, Row, Col, Image, Nav } from 'react-bootstrap';


const PdfViewer = (props) => {
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    
    if (props.loading) {
        return <div>Loading....</div>
    }
    else {
        const { pdfDocument, pdfPage } = usePdf({
            file: props.pdflink,
            page,
            canvasRef,
            scale: 1.25
        });
        console.log("HELLOOO");
        console.log(props.pdflink);
        return (
            <div className="canvasparent">

                <canvas className="canvasele fluid" ref={canvasRef} />
                <div className="canvascontrols">
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                        <Button size="lg" variant="primary" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>)}
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                        <Button size="lg" disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>Next</Button>
                    )}
                </div>

            </div>
        )
    }
}

const Newsletter = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = useParams();
    console.log(id);
    useEffect( () => {
        async function getDataFromDB(){
            await fetch(`https://v6w0qe.deta.dev/get_newsletter?month=${id.month}&year=${id.year}`).then(r => r.json()).then(
                (r) => {
                    setData(r);
                    console.log(r)
                    setError(null);
                }
            ).catch((err) => {
                setError(err.message);
                setData(null);
            }).finally(() => {
                    setLoading(false);
                });
        }
        getDataFromDB();
        
    },[])
    return (
        <>
            <Nav>
                <Image src="/DCSlogo.png" className="dcslogo"></Image>
                {!loading && <h1 className="page-title">Newsletter - {data?.month}/{data?.year}</h1>}
            </Nav>
            {!loading && <PdfViewer loading={loading} pdflink={data.pdf_link}/>}
            <Link to="/" className="text-white"><Button variant="outline-primary" id="go-home" className="mx-auto d-block">Go Home</Button></Link>
            
        </>
    )
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}


export default Newsletter;