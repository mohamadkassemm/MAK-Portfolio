export default function CertModal({ cert, onClose }) {
  const open = !!cert
  return (
    <div className={`cv-modal ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cv-modal-inner">
        <div className="cv-modal-top">
          <div className="cv-modal-title">
            <i className="fa-solid fa-certificate"></i> <span>{cert ? cert.title : 'Certificate'}</span>
          </div>
          <div className="cv-modal-actions">
            <a href={cert ? cert.src : '#'} download className="cv-download-btn">
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button className="cv-close-btn" type="button" aria-label="Close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <embed src={open ? cert.src : ''} type="application/pdf" className="cv-embed" />
      </div>
    </div>
  )
}
