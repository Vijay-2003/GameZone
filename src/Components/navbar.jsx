"use client"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavScrollExample = () => {

    const [getdata, setgetdata] = useState('');
    const router = useRouter();
    const [indata, setindata] = useState([]);

    const fetchquery = (ev) => {
        ev.preventDefault(); // Prevent default form submission behavior

        fetch(`https://steam-api7.p.rapidapi.com/search?query=${getdata}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3b1a4fac7bmshd779f247bcd3562p1b66eajsn88d4cb9facc4',
                'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
              }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setindata(data);
            router.push(`/searchdata/${getdata}`); // Navigate after fetch operation
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error, show error message to user, etc.
        });
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary p-2">
            <Container fluid className=' p-3'>
                <Navbar.Brand className=' text-white' href="/">GameSearch App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link className=' text-white' href="#action1">Home</Nav.Link>
                        <Nav.Link className=' text-white' href="#action2">Link</Nav.Link>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}
                    </Nav>
                    <Form className="d-flex justify-center items-center" onSubmit={fetchquery}>
                        <Form.Control
                            type="search"
                            placeholder="Search For A Game"
                            className="me-2"
                            aria-label="Search"
                            value={getdata}
                            onChange={(ev) => setgetdata(ev.target.value)}
                        />
                        {/* <Button variant="outline-success">Search</Button> */}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;
