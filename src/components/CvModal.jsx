export default function CvModal({ open, onClose }) {
  return (
    <div className={`cv-modal ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cv-modal-inner">
        <div className="cv-modal-top">
          <div className="cv-modal-title"><i className="fa-solid fa-file-lines"></i> Mohammad Kassem — CV</div>
          <div className="cv-modal-actions">
            <a href="/Mohammad_Kassem_CV.pdf" download className="cv-download-btn">
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button className="cv-close-btn" type="button" aria-label="Close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <embed src="/Mohammad_Kassem_CV.pdf" type="application/pdf" className="cv-embed" />
      </div>
    </div>
  )
}
