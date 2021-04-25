import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Form, Button,Container } from 'react-bootstrap';




function Content() {

    
// CRAWLER FUNCTIONS
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
<li className='li1'>
 <p className={url.user=='true'?'green':'red'}> {url.title}</p>
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

// 
    return (
        <div class='content-background'>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-3 talk ">
                    <Form >
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    <abbr title='You can require multiple workers to do the job. They will work horizontally and speed up the process while communicating with each other' tabindex="0" >Add a worker</abbr>
                    </Button>
                     </Form>
                    </div>

                    <div className="col-sm-3 talk">
                      <Button  variant="success" onClick={toggle} className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}>   
                     
                     <abbr title={isActive?'Stop fetching the data':'The workers crawl across the network and feed the information into a database. Click here and you will receive the information stored from the database '}>{isActive ? 'Pause' : 'Fetch'} </abbr>
                     </Button>
                     <Button variant='danger' className="button" onClick={reset}>
                       <abbr title='delete all the information'>Reset</abbr>
                     </Button>
                    </div>
                    
                    <div className="col-sm-6 ">
                        <ul className="bold-four scroll" style={{maxHeight: '210px', overflow: 'auto' ,paddingTop:'20px'}}>
                        {listItems}
                        </ul>
                       </div>
                </div>
            </div>

            <section class="features-icons bg-light text-center det-ails">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Our Weapon</h5>
                                <p class="lead mb-0">Let our crawler work for you</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Horizontality</h5>
                                <p class="lead mb-0">You will decide how many workers will do the job.</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Safety</h5>
                                <p class="lead mb-0">The information is extracted legally and creatively.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;