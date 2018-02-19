import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row justify-content-center">
              <div className="flex-column align-items-center">
                <a href="/">
                  <h1 id="login-heading" className="display-2">
                    Dynanner
                  </h1>
                </a>
                <h5 className="text-center">The Dynamic Journal-Planner</h5>
                {/* Google auth login */}
                <a href="/auth/google" className="btn btn-outline-info btn-block">
                  <span className="fab fa-google-plus-g" /> Log In with Google
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row row-eq-height justify-content-around content-row">
            <div className="col">
              <div className="white-container login-container">
                <h4>Getting Started is Easy!</h4>
                <div className="row">
                  <div className="col">
                    <div className="row step-row">
                      <div className="col">
                        <h5>1. Add an event</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <img src="/assets/new-event-btn.png" alt="clicking add new event button screenshot" className="img-responsive screenshot" />
                      </div>
                      <div className="col">
                        <img src="/assets/add-event.png" alt="add event page screenshot" className="img-responsive screenshot" />
                      </div>
                    </div>
                    <div className="row step-row">
                      <div className="col">
                        <h5>2. See your previous feedback.</h5>
                      </div>
                      <div className="col">
                        <h5>3. Do your activity.</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <img src="/assets/past-review.png" alt="past review page screenshot" className="img-responsive screenshot" />
                      </div>
                      <div className="col">
                        <img src="assets/dog-walk-img.png" alt="man walking dog illustration" className="img-responsive screenshot" />
                      </div>
                    </div>
                    <div className="row step-row">
                      <div className="col">
                        <h5>4. Review yourself!</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <img src="/assets/check-btn.png" alt="clicking check button screenshot" className="img-responsive screenshot" />
                      </div>
                      <div className="col">
                        <img src="/assets/review-event.png" alt="review event page screenshot" className="img-responsive screenshot" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
              <div className="white-container login-container">
                <h4>About</h4>
                <p>
                  People are busy. Busy people make mistakes. Do you ever make
                  the same mistake twice? Now you don&apos;t have to. Learn from
                  your mistakes by keeping a Dynanner.
                </p>
                <p>
                  First you log an activity. After you do the activity,
                  you log feedback for yourself in your Dynanner. What did you do well?
                  What would you like to improve on? Next time you plan a similar
                  activity, your Dynanner will provide you with that feedback.
                </p>
                <p>
                  You don&apos;t have to worry about organizing your journal
                  entries in a constructive manner; the Dynanner does that for
                  you. You don&apos;t have to worry about paging through hundreds
                  of prior journal entries to find what&apos;s relevant to you now;
                  the Dynanner does that for you too.
                </p>
                <h5>
                  Now get out there and improve your life with Dynanner!
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
