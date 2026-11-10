export default function CvModal({ open, onClose }) {
  return (
    <div className={`modal ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-inner cut" role="dialog" aria-modal="true" aria-label="CV">
        <div className="modal-top">
          <div className="modal-title"><i className="fa-solid fa-file-shield"></i> Mohammad Kassem — CV</div>
          <div className="modal-actions">
            <a href="/Mohammad_Kassem_CV.pdf" download className="btn btn-cut btn-sm btn-solid">
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        {open && <embed src="/Mohammad_Kassem_CV.pdf" type="application/pdf" className="modal-embed" />}
      </div>
    </div>
  )
}
