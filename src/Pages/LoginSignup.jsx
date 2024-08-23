import React from 'react'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign up</h1>
        <div className="loginsignup-feilds">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email address"/>
          <input type="password" placeholder="Password"/>

        </div>
        <button>Continue</button>
        

      </div>

    </div>
  )
}

export default LoginSignup