import { Button, Container, Table } from "react-bootstrap";
import Data from "../assets/table";

export default function Home() {
    return (
        <>
            <div className='bg-secondary d-flex flex-column align-items-center justify-content-center text-center text-light' style={{ padding: "50px 0", margin: "0", gap: "20px" }}>
                <h1 >The Generics</h1>
                <Button variant="outline-info">Get our Latest Album</Button>

                <div style={{ width: "100px", cursor: "pointer" }}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(13,202,240)" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                </div>
            </div>

            <h3 className="text-center my-4">TOURS</h3>

            <Container>
                <Table style={{margin:"80px 20px"}}>
                    <tbody>
                       {Data.map((data, index)=>{
                         return (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.artist}</td>
                                <td>{data.title}</td>
                                <td><Button variant="info" className="text-light">BUY TICKETS</Button></td>
                            </tr>
                         )
                       })}
                    </tbody>
                </Table>
            </Container>

        </>
    )
}
