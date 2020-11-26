import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function Welcome() {
    return (
        <div>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i-sight.com/wp-content/uploads/2017/07/expense-fraud-e1511377958806.jpg"
      alt="First slide"
    />
    
    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://store-images.s-microsoft.com/image/apps.21669.14224116138934337.7f4f3b9d-086e-4586-b309-1b228c687bc6.e6910a23-266c-497a-b219-8d2e57570e2e?mode=scale&q=90&h=1080&w=1920"
      alt="Third slide"
    />

    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://ps-attachments.s3.amazonaws.com/1bb0e907-c05a-4a2f-88c6-e4d0198847a8/o8-lgth0ZiSwZjCeJ-5Mlw.png"
      alt="Third slide"
    />

    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
    )
}
