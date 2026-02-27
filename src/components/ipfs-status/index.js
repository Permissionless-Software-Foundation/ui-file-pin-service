
/**
 * IPFS Status Component
 */
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


const IpfsStatus = ({ appData }) => {
  const navigate = useNavigate()
  const { serverUrl, appUtil } = appData
  const [ipfsStatus, setIpfsStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get IPFS Status
  const getIpfsStatus = useCallback(async () => {
    try {
      if (isLoading) return
      setIpfsStatus(null)
      setIsLoading(true)
      const response = await axios.get(`${serverUrl}/ipfs`)
      //console.log(response?.data?.status)
      /**
       * RESPONSE DATA :
       * {
       * Peers: number,
       * bchAddr: string[],
       * ipfsId: string,
       * multiAddrs: string[],
       * relays: Number,
       * slpAddr: string,
       * }
       */
      setIpfsStatus(response?.data?.status)
      setIsLoading(false)
    } catch (error) {
      setError(error?.message)
      console.error(error)
      setIsLoading(false)
    }
  }, [serverUrl, isLoading])
  const copyToClipboard = (text) => {
    appUtil.copyToClipboard(text)
  }

  // Get IPFS Status when the component mounts
  useEffect(() => {

    if (!isLoading && !ipfsStatus && !error) {
      getIpfsStatus()
    }
  }, [isLoading, ipfsStatus, getIpfsStatus, error])

  return (
    <div className="ipfs-status-container">
      <Container className="ipfs-status-wrapper">
        <div className="ipfs-status-header">
          <h2 className="ipfs-status-title">Node Status</h2>
          <p className="ipfs-status-subtitle">Monitor your IPFS node connectivity and network information</p>
        </div>
        <Row>
          <Col xs={12} md={6}>
            {<Button disabled={isLoading} onClick={() => getIpfsStatus()} className='mt-2'>Refresh</Button>}

          </Col>
        </Row>
      </Container>
      {ipfsStatus && (
        <Container className="ipfs-status-wrapper">
          <Row className="ipfs-status-metrics">
            <Col xs={12} md={6} className="ipfs-metric-card">
              <div className="ipfs-metric-label">Peers</div>
              <div className="ipfs-metric-value">{ipfsStatus?.peers || 0}</div>
            </Col>
            <Col xs={12} md={6} className="ipfs-metric-card" style={{ cursor: 'pointer'}} onClick={()=>{ navigate('/ipfs/relays')}}>
              <div className="ipfs-metric-label">Active Relays</div>
              <div className="ipfs-metric-value">{ipfsStatus?.relays || 0}</div>
            </Col>
          </Row>

          <Row className="ipfs-status-details">
            <Col md={12} className="ipfs-detail-section">
              <div className="ipfs-detail-label">IPFS ID</div>
              <div className="ipfs-detail-value">
                <span className="ipfs-value-text">{ipfsStatus?.ipfsId}</span>
                <FontAwesomeIcon
                  className="ipfs-copy-icon"
                  icon={faCopy}
                  onClick={() => copyToClipboard(ipfsStatus?.ipfsId)}
                />
              </div>
            </Col>

            <Col xs={12} md={6} className="ipfs-detail-section">
              <div className="ipfs-detail-label">BCH Address</div>
              <div className="ipfs-detail-value">
                <span className="ipfs-value-text">{ipfsStatus?.bchAddr}</span>
                <FontAwesomeIcon
                  className="ipfs-copy-icon"
                  icon={faCopy}
                  onClick={() => copyToClipboard(ipfsStatus?.bchAddr)}
                />
              </div>
            </Col>

            <Col xs={12} md={6} className="ipfs-detail-section">
              <div className="ipfs-detail-label">SLP Address</div>
              <div className="ipfs-detail-value">
                <span className="ipfs-value-text">{ipfsStatus?.slpAddr}</span>
                <FontAwesomeIcon
                  className="ipfs-copy-icon"
                  icon={faCopy}
                  onClick={() => copyToClipboard(ipfsStatus?.slpAddr)}
                />
              </div>
            </Col>

            <Col md={12} className="ipfs-detail-section">
              <div className="ipfs-detail-label">Multiaddresses</div>
              <div className="ipfs-multiaddrs-container">
                {ipfsStatus?.multiAddrs?.length > 0 ? (
                  ipfsStatus.multiAddrs.map((addr, idx) => (
                    <div key={idx} className="ipfs-multiaddr-item">
                      <span>{addr}</span>
                      <FontAwesomeIcon
                        className="ipfs-copy-icon"
                        icon={faCopy}
                        onClick={() => copyToClipboard(addr)}
                      />
                    </div>
                  ))
                ) : (
                  <span className="ipfs-empty-message">Multiaddresses not detected</span>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div className="ipfs-status-loading">
        {!ipfsStatus && !error && <Spinner animation="border" role="status" className="ipfs-spinner"></Spinner>}
        {error && <p className="ipfs-error-message">{error}</p>}
      </div>
    </div>
  )
}

export default IpfsStatus