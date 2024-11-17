
function Footer() {
    return (
        <div className="bg-dark d-flex justify-content-around align-items-center" style={{padding: "40px 20px"}}>
                <h3 href="#home" className='text-light mx-5'>The Generics</h3>
                <div className="d-flex justify-content-around align-items-center">
                    <div href="#home" className='text-light mx-5'>Youtube</div>
                    <div href="#link" className='text-light mx-5'>Spotify</div>
                    <div href="#About" className='text-light mx-5'>Facebook</div>
                </div>
        </div>
    );
}

export default Footer;