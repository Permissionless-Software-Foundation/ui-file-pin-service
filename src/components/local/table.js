import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbtack,
  faClock,
  faEye,
  faDownload,
  faShare,
  faTrash,
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import '../../App.css'

const LocalTable = ({ pins, appData, deleteLocalPin }) => {
  const { appUtil } = appData

  const truncateCid = (cid) => {
    if (!cid || cid.length < 12) return cid
    return `${cid.slice(0, 12)}...${cid.slice(-4)}`
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString()
  }

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0.00 MB'
    const mb = bytes / (1024 * 1024)
    if (mb < 0.01) {
      const kb = bytes / 1024
      return `${kb.toFixed(2)} KB`
    }
    return `${mb.toFixed(2)} MB`
    
  }

  const handleView = (pin) => {
    window.open(`${appData.serverUrl}/ipfs/view/${pin.CID}`, '_blank')
  }

  const handleDownload = (pin) => {
    window.open(`${appData.serverUrl}/ipfs/download/${pin.CID}`, '_blank')
  }

  const handleShare = (pin) => {
    appUtil.copyToClipboard(`${appData.serverUrl}/ipfs/view/${pin.CID}`)
  }

  return (
    <div className="local-table-container mb-4">
      <div className="table-responsive">
        <table className="local-table">
          <thead>
            <tr className="local-table-header">
              <th className="local-table-cell">Name</th>
              <th className="local-table-cell">Size</th>
              <th className="local-table-cell">CID</th>
              <th className="local-table-cell">Pinned</th>
              <th className="local-table-cell">Date</th>
              <th className="local-table-cell">View</th>
              <th className="local-table-cell">Delete</th>
            </tr>
          </thead>
          <tbody>
            {pins && pins.length > 0 && pins?.map((pin) => (
              <tr key={pin.id} className="local-table-row">
                <td className="local-table-cell">
                  <span className="local-file-name">{pin.filename}</span>
                </td>
                <td className="local-table-cell">
                  <span className="local-file-size">{formatFileSize(pin.fileSize)}</span>
                </td>
                <td className="local-table-cell">
                  <div className="d-flex align-items-center gap-2">
                    <span className="local-cid-text">{truncateCid(pin.CID)}</span>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="local-copy-icon"
                      onClick={() => appUtil.copyToClipboard(pin.CID)}
                    />
                  </div>
                </td>
                <td className="local-table-cell">
                  {pin.datePinned ? (
                    <FontAwesomeIcon icon={faThumbtack} className="pin-icon" />
                  ) : (
                    <FontAwesomeIcon icon={faClock} className="clock-icon" />
                  )}
                </td>
                <td className="local-table-cell">
                  <span className="local-date-text">{formatDate(pin.datePinned)}</span>
                </td>
                <td className="local-table-cell">
                  <div className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="local-action-icon view-icon"
                      title="View"
                      onClick={() => handleView(pin)}
                    />
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="local-action-icon download-icon"
                      title="Download"
                      onClick={() => handleDownload(pin)}
                    />
                    <FontAwesomeIcon
                      icon={faShare}
                      className="local-action-icon share-icon"
                      title="Share"
                      onClick={() => handleShare(pin)}
                    />
                  </div>
                </td>
                <td className="local-table-cell">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="local-action-icon delete-icon"
                    title="Delete"
                    onClick={() => deleteLocalPin(pin.CID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!pins || pins.length === 0) && (
        <div className="local-empty-state d-flex justify-content-center align-items-center">
          <span className="text-muted">No local pins found.</span>
        </div>
      )}
    </div>
  )
}

export default LocalTable
