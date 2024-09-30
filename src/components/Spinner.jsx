import React, { Component } from 'react'
import spinner from '../../public/spinner1.svg'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt="Spinner" />
      </div>
    )
  }
}

export default Spinner
