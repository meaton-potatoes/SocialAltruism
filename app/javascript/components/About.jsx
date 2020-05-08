import React from 'react'

const About = () => (
  <div className='card'>
    <div className='row banner'>
      <h1>About</h1>
    </div>
    <div className='card-body'>
      <p>
        <b>Who is the developer?</b> <a href='http://www.melissaeaton.me' target="_blank">Melissa Eaton</a>
      </p>
      <p>
        <b>What is this?</b> Maybe it's just me, but I have always wanted to be a more charitable person but I end up procrastinating or forgetting in the chaos of everyday life. But I never forget to check Reddit, Twitter, or Instagram. So the simple idea of this app is just "gamified donations". Make donating money easy and fun. Be encouraged to be more of a philanthropist by seeing other peoples' donations and vise versa. Lets have a good kind of social media competition that improves the world!
      </p>
      <p>
        <b>Why should I trust you with my credit card information?</b> You don't need to. On the first day I thought this up, I knew that I did not want to have to worry about storing users' credit card information, so I found a way around it.
        <ul>
          <li>You make your donation through this app</li>
          <li>We send your credit card number, expiration date, and cvc to <a href='https://stripe.com/' target="_blank">Stripe</a></li>
          <li>Stripe returns a token representation of your credit card</li>
          <li>We send this stripe token, along with your first name, last name, and email to <a href='https://www.pledgeling.com/' target="_blank">Pledgeling</a></li>
          <li>You should receive an email from Pledgeling once your donation has been processed</li>
          <li>
            <b>
              At no point will this app ever store your credit card information. If you'd like to audit for yourself, the source code is linked below.
            </b>
          </li>
        </ul>
      </p>
      <div className="row">
        <div className='col-md-12 d-flex justify-content-between'>
          <a href='http://www.melissaeaton.me' target="_blank"><i className="fas fa-globe" /> My Personal Website</a>
          <a href='https://twitter.com/AltruismSocial' target="_blank"><i className="fab fa-twitter" /> Twitter</a>
          <a href='https://github.com/meaton-potatoes/SocialAltruism' target='_blank'><i className="fab fa-github" /> Github Repository</a>
        </div>
      </div>
    </div>
  </div>
)

export default About
