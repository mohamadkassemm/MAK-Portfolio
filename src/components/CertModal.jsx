export default function CertModal({ cert, onClose }) {
  const open = !!cert
  return (
    <div className={`modal ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-inner cut" role="dialog" aria-modal="true" aria-label="Certificate">
        <div className="modal-top">
          <div className="modal-title">
            <i className="fa-solid fa-certificate"></i> <span>{cert ? cert.title : 'Certificate'}</span>
          </div>
          <div className="modal-actions">
            <a href={cert ? cert.src : '#'} download className="btn btn-cut btn-sm btn-solid">
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        {open && <embed src={cert.src} type="application/pdf" className="modal-embed" />}
      </div>
    </div>
  )
}
