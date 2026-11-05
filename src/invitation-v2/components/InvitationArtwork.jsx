const ART = {
  ganpati: '/invitation-v2/ganpati.png',
  lotusLeft: '/invitation-v2/lotus-left.png',
  lotusRight: '/invitation-v2/lotus-right.png',
  leavesDuo: '/invitation-v2/leaves-right.png',
  leavesOverlay: '/invitation-v2/leaves-left.png',
  temple: '/invitation-v2/temple.png',
}

function InvitationArtwork() {
  return (
    <div className="invitation__art" aria-hidden="true">
      <div className="invitation__art-piece invitation__art-piece--lotus-left">
        <img
          className="invitation__art-img invitation__art-img--lotus-left"
          src={ART.lotusLeft}
          alt=""
          decoding="async"
        />
      </div>
      <div className="invitation__art-piece invitation__art-piece--lotus-right">
        <img
          className="invitation__art-img invitation__art-img--lotus-right"
          src={ART.lotusRight}
          alt=""
          decoding="async"
        />
      </div>
      <img
        className="invitation__art-img invitation__art-img--ganpati"
        src={ART.ganpati}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <div className="invitation__art-piece invitation__art-piece--leaf-left">
        <img
          className="invitation__art-img invitation__art-img--leaf-left"
          src={ART.leavesDuo}
          alt=""
          decoding="async"
        />
      </div>
      <div className="invitation__art-piece invitation__art-piece--leaf-right">
        <img
          className="invitation__art-img invitation__art-img--leaf-right"
          src={ART.leavesOverlay}
          alt=""
          decoding="async"
        />
      </div>
      <img
        className="invitation__art-img invitation__art-img--temple"
        src={ART.temple}
        alt=""
        decoding="async"
      />
    </div>
  )
}

export default InvitationArtwork
