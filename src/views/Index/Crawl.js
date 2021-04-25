import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Form, Button,Container } from 'react-bootstrap';

// import '../style/list.css'


const SearchForm = () => {
    const [data,setData]=useState([])

    const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
    axios.delete('http://localhost:8000/api/postsall')
    .then(function (response) {
      // handle success
      setData([])
    //   console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      alert('all data was removed')
    });

  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        axios.get('http://localhost:8000/api/posts')
        .then(function (response) {
          // handle success
          setData(response.data)
          console.log(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          console.log('finish')
        });
      }, 5000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive,data]);

  const listItems = data.map((url) =>
  <li>
     <p> {url.title}</p>
 </li>
);
function handleSubmit(event){
    event.preventDefault()
    // console.log(event)
    axios.get('http://localhost:8000/api/crawl')
    .then(function (response) {
      // handle success
      setData(response.data)
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      console.log('finish crawl')
    });
    alert('submit')
    // alert('submit')
}
    return (
        <Container>
        <Form style={{width:'50%', margin:'0 auto'}}>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add a worker
        </Button>
      </Form>
      <hr/>
      <h3>fetch the data:</h3>
      <div className="app">
      <div className="time">
        {seconds} loops
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Fetch'}
        </button>
        <button className="button" onClick={reset}>
          Delete
        </button>
      </div>
    </div>
    {/* <hr/> */}
    {listItems}
      </Container>
    )
}

export default SearchForm;
