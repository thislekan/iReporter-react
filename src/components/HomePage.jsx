import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import style from '../styles/HomePage.css';
import phoneImage from '../media/phone-1682317_1280.png';
import screenshot from '../media/shot.png';
import image1 from '../media/ryan-tang-281277-unsplash.jpg';
import megaphone from '../media/megaphone.jpg';

function HomePage(props) {
  const { history } = props;
  return (
    <div className={style.homepage}>
      <section className={style.welcome}>
        <div className={style.paddedBody}>
          <div className={style.welcomeText}>
            <h1 className={style.homepage__intro}>You too can help
            <span>  </span>
              <span className={style.endText}>end</span> corruption.
          </h1>
            <button
              onClick={() => history.push('/signup')}
              id="go-to-signup"
            >
              Sign Up
            </button>
          </div>
          <div className={style.welcomeInvite}>
            <div className={style.imgDiv}>
              <img src={phoneImage} alt="transparent phone" className={style.parentImage} />
              <img src={screenshot} alt="report incident screenshot" className={style.childImage} />
            </div>
          </div>
        </div>
      </section>
      <section className={style.description}>
        <div className={style.paddedBody}>
          <div className={style.intro}>
            <h3>Lend the government your voice</h3>
          </div>
          <div className={style.descriptionBody}>
            <div className={style.imgDiv}>
              <img src={megaphone} alt="protester with megaphone" className={style.descriptionBodyImage} />
            </div>
            <div className={cx(style.descriptionBodyText, style.textDiv)}>
              <p>With an internet connection, you too can help fight corruption.
                All you need to do is register with us and report incidents with their location,
              leaving the rest to us</p>
              <p>We make sure you remain anonymous
                while we investigate and you get real
              time notifications on your reorted incidents.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={style.process}>
        <div className={style.paddedBody}>
          <div className={cx(style.processIntro, style.intro)}>
            <h3>How it works.</h3>
          </div>
          <div className={style.processBody}>
            <div className={style.imgDiv}>
              <img src={image1} alt="" />
            </div>
            <div className={cx(style.processBodyText, style.textDiv)}>
              <p className={style.subHeader}>You too can fight corruption in 3 easy steps</p>
              <div>
                <p><span className={style.numbers}>1.</span> Sign up and verify your email.</p>
                <p><span className={style.numbers}>2.</span> Login after verification.</p>
                <p><span className={style.numbers}>3.</span> Report an incident.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.stories}>
        <div className={style.paddedBody}>
          <div className={style.intro}>
            <h3>Our numbers have been good</h3>
          </div>
          <div className={style.storiesBreakdown}>
            <div className={style.storiesBreakdownDetails}>
              <div className={style.incident}>
                <span>All inicdents</span>
                <span className={cx(style.incidentStats, style.all)}>1000</span>
              </div>
              <div className={style.incident}>
                <span>Resolved incidents</span>
                <span className={cx(style.incidentStats, style.resolved)}>550</span>
              </div>
              <div className={style.incident}>
                <span>Rejected incidents</span>
                <span className={cx(style.incidentStats, style.rejected)}>200</span>
              </div>
              <div className={style.incident}>
                <span>Under Investigation</span>
                <span className={cx(style.incidentStats, style.investigating)}>250</span>
              </div>
            </div>
            <div className={style.textDiv}>
              <p>We pride ourselves in the numbers of resolved incidents,
                but we aim for even better results.
              Our team of investigators are thorough and discreet in their approach.</p>
              <p>Every incident is treated as a priority.
                Our system and approach are void of bias,
                meaning we hold ourselves to a great standard.
              The numbers tell our stories for us.</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className={style.disclaimer}>
          <p>disclaimer</p>
          <p>iReporter is a non governmental organization
          committed to ending corruption in nigeria</p>
        </div>
        <div>
          <p>contact us <a href="mailto:email@ireporter.net">email@ireporter.net</a></p>
        </div>
      </footer>
    </div>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
