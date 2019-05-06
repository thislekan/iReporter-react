import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import style from '../styles/CreateReport.css';

function CreateReport(props) {
  const {
    handleChange,
    handleCreateIncident,
    handleMedia,
    disableFileInput,
    clearBlobs,
    imageBlobs,
    // videoBlob,
  } = props;
  return (
    <div id="create-form-div" className={style.createReport}>
      <div className={style.create}>
        <h2>Report an incident</h2>
        <form onSubmit={handleCreateIncident}>
          <div className={style['create-content']}>
            <div className={style['input-div']}>
              <label htmlFor="type">Select type of report</label>
              <select
                name="type"
                id="report-type"
                onBlur={handleChange}
              >
                <option value="">Please select your report type</option>
                <option value="red-flag">Red Flag</option>
                <option value="intervention">Intervention</option>
              </select>
            </div>
            <div className={style['input-div']}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="create-incident-title"
                onBlur={handleChange}
              />
            </div>
            <div className={cx(style['input-div'], style['for-text'])}>
              <label htmlFor="comments">Enter comments</label>
              <textarea
                name="comment"
                id="comments"
                onBlur={handleChange}
              />
            </div>
            <div className={style['input-div']}>
              <label htmlFor="location">Enter Location or Coordinates</label>
              <input
                type="text"
                name="location"
                id="location"
                onBlur={handleChange}
              />
            </div>
            <div className={style['input-div']}>
              <label htmlFor="image or video">Upload Image or Video</label>
              <input
                type="file"
                name="image or video"
                multiple id="file-upload"
                accept="image/*, video/*"
                onClick={clearBlobs}
                onChange={handleMedia}
                disabled={disableFileInput}
              />
            </div>
            <div className={style['media-div']}>
              {/* <div className={style['preview-video']}>
                <video>
                  <track kind="captions" />
                  <source src={videoBlob} />
                </video>
              </div> */}
              <div className={style['preview-img']}>
                {imageBlobs.map((image, index) => <img src={image} key={index} alt="preview" />)}
              </div>
            </div>
            <div className={style['btn-div']}>
              <button
                type="submit"
                id="create-incident"
                className={style['create-incident-btn']}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateReport.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleCreateIncident: PropTypes.func.isRequired,
  handleMedia: PropTypes.func.isRequired,
  disableFileInput: PropTypes.bool.isRequired,
  clearBlobs: PropTypes.func.isRequired,
  imageBlobs: PropTypes.array.isRequired,
  // videoBlob: PropTypes.string.isRequired,
};

export default CreateReport;
