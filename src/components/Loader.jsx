export default function Loader({ hidden }) {
  return (
    <div id="loader" className={hidden ? 'hide' : ''}>
      <div className="loader-initials">MAK</div>
      <div className="loader-bar-track"><div className="loader-bar"></div></div>
      <div className="loader-tag">Loading portfolio</div>
    </div>
  )
}
