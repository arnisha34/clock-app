import { useEffect, useState } from "react"
import { BiRefresh } from 'react-icons/bi'
import { HiSun } from 'react-icons/hi'
import { IoChevronDownCircle } from 'react-icons/io5'
import { RiMoonFill } from 'react-icons/ri'
import { WiSunset } from 'react-icons/wi'
import dateFormat from "dateformat";
import 'animate.css';

function App() {

  const [timezone, setTimezone] = useState([])
  const [quote, setQuote] = useState([])
  const [geoIP, setGeoIP] = useState([])
  const [time, setTime] = useState()
  const [newQuote, setNewQuote] = useState(quote)
  const [buttonText, setButtonText] = useState(false)

  useEffect(() => {

    fetch("http://worldtimeapi.org/api/ip")
    .then(res => res.json())
    .then(data => setTimezone(data))

    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => setQuote(data))

    fetch('https://freegeoip.app/json/')
    .then(res => res.json())
    .then(data => setInterval(setGeoIP(data), 1000))

    const interval = setInterval(() => {
      setTime(dateFormat("H:MM"))
    }, 1000);
    return () => clearInterval(interval);
    
  },[newQuote])
  
  const changeQuote = () => {
    setNewQuote(quote.content)
  }

  const toggleText = () => {
    setButtonText(!buttonText)
  }
  
  //for converting background 
  const hour = dateFormat("H")

    return (
      <>
        <div className={`clock-container ${hour <= 12 ? "day" : hour < 18 ? "noon" : "night"} container-fluid min-vh-100 px-0`}>
          <div className="overlay">
            <div className={`top-half-container ${buttonText === true ? "split" : ""} container d-flex flex-column`}>
              <div className={`quote-container ${buttonText === true ? "split" : ""} row pt-5`}>
                <div className="col-md-6 d-flex justify-content-between">
                  <blockquote className="blockquote">
                    <p className="mb-0">{quote.content}</p>
                    <p className="fw-bold">{quote.author}</p>            
                  </blockquote>
                  <p><BiRefresh className="refresh-icon" size={30} onClick={changeQuote} /></p>
                </div>
              </div>
              <div className={`time-info row d-flex flex-lg-row flex-column flex-grow-1 justify-content-lg-between justify-content-end pb-5`}>
                <div className={`col-lg-10 col-md-12 align-self-end`}>
                  <h5 className="greeting mb-0 text-uppercase">{hour < 12 ? <span><HiSun size={30}/> Good Morning</span> : hour < 18 ? <span><WiSunset size={30}/> Good Afternoon</span> : <span><RiMoonFill size={25}/> Good Evening</span>}, It's currently</h5>
                  <p className="local-time fw-bold">{time} <span className="timezone fs-1 fw-light">{dateFormat("Z")}</span></p>
                  <h4 className="state fw-bold text-uppercase">In {geoIP.region_name}, {geoIP.country_code}</h4>
                </div>
                <div className={`toggle-more col-lg-2 col-md-12 align-self-end pt-lg-0 pt-4`}>
                  <button className={`btn ${buttonText === false ? "more" : "less"} fw-bold text-uppercase`} type="button" onClick={toggleText}>{buttonText === false ? "more" : "less"} <IoChevronDownCircle size={40}/></button>
                </div>
              </div>
            </div>
            <div className={`timezone-container ${hour <=12 ? "day" : hour <= 18 ? "noon" : "night"} ${buttonText === false ? "hide" : ""} `}>
              <div className="timezone-info container">
                <div className="row align-items-center h-100">
                  <div className="left-side col-md pe-md-5">
                    <div className="d-sm-flex flex-md-column justify-content-sm-between align-items-md-start align-items-center pb-4">
                      <p className="title mb-sm-0 text-uppercase">Current timezone</p>
                      <p className="fw-bold mb-0">{timezone.timezone}</p>
                    </div>
                    <div className="d-sm-flex flex-md-column justify-content-sm-between align-items-md-start align-items-sm-center pt-sm-4">
                      <p className="title mb-sm-0 text-uppercase">Day of the year</p>
                      <p className="fw-bold mb-0">{timezone.day_of_year}</p>
                    </div>
                  </div>
                  <div className="right-side col-md ms-md-5">
                    <div className="d-sm-flex flex-md-column justify-content-sm-between align-items-md-start align-items-sm-center pb-sm-4 ps-md-5">
                      <p className="title mb-sm-0 text-uppercase">Day of the week</p>
                      <p className="fw-bold mb-0">{timezone.day_of_week}</p>
                    </div>
                    <div className="d-sm-flex flex-md-column justify-content-sm-between align-items-md-start align-items-sm-center pt-sm-4 ps-md-5">
                      <p className="title mb-sm-0 text-uppercase">Week number</p>
                      <p className="fw-bold mb-0">{timezone.week_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default App;
