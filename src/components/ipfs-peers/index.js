/**
 * 
 * Show all peers for the node
 * 
 */

import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'

const IpfsPeers = ({ appData }) => {
  const { serverUrl, appUtil } = appData
  const [peers, setPeers] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [peerDetails, setPeerDetails] = useState(null)

  // Get IPFS Peers
  const getIpfsPeers = useCallback(async () => {
    try {
      if (isLoading) return
      setPeers(null)
      setIsLoading(true)
      const response = await axios.post(`${serverUrl}/ipfs/peers`, { showAll: true })
      console.log(response.data)
      const { peers } = response.data
      /**
       * 
       * Response data:[
       *   {
       *   connectionAddr: string, 
          *  name: string,
          *  peer: string,
          *  protocol: string,
          *  version: string  
          *  peerData: {...}
       * ]
       * 
       */

      setPeers(peers)
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

  // Get IPFS peers when the component mounts
  useEffect(() => {
    if (!isLoading && !peers && !error) {
      getIpfsPeers()
    }
  }, [isLoading, peers, getIpfsPeers, error])

  const handleShowDetails = (peerData) => {
    console.log('peerData: ', peerData)
    setPeerDetails(peerData)
    setShowDetails(true)
  }

  return (
    <div className="ipfs-relays-container">
      <Container className="ipfs-relays-wrapper">
        <div className="ipfs-relays-header">
          <h2 className="ipfs-relays-title">IPFS Peers</h2>
          <p className="ipfs-relays-subtitle">Monitor your IPFS peer connections and their status</p>
        </div>
        <Row>
          <Col xs={12} md={6}>
            <Button disabled={isLoading} onClick={() => getIpfsPeers()} className='mt-2'>Refresh</Button>
          </Col>
        </Row>
      </Container>
      {peers && peers.length > 0 && (
        <Container className="ipfs-relays-wrapper">
          <Row className="ipfs-relays-list">
            {peers.map((peer, idx) => (
              <Col key={idx} xs={12} className="ipfs-relay-card-wrapper">
                <div className="ipfs-relay-card">
                  <div className="ipfs-relay-card-header">
                    <h3 className="ipfs-relay-name">{peer.name || `Peer ${idx + 1}`}</h3>
                  </div>

                  <Row className="ipfs-relay-details">
                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Peer ID</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{peer.peer}</span>
                        <FontAwesomeIcon
                          className="ipfs-relay-copy-icon"
                          icon={faCopy}
                          onClick={() => copyToClipboard(peer.peer)}
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Connection Address</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{peer.connectionAddr || 'N/A'}</span>
                        {peer.connectionAddr && (
                          <FontAwesomeIcon
                            className="ipfs-relay-copy-icon"
                            icon={faCopy}
                            onClick={() => copyToClipboard(peer.connectionAddr)}
                          />
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Protocol</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{peer.protocol || 'N/A'}</span>
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Version</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{peer.version || 'N/A'}</span>
                      </div>
                    </Col>

                    {peer.peerData && (
                      <Col xs={12} className="ipfs-relay-detail-section">
                        <div className="ipfs-relay-detail-label">Peer Data</div>
                        <div className="ipfs-relay-detail-value">
                          <Button
                            variant="outline-primary"
                            onClick={() => handleShowDetails(peer.peerData)}
                            className="ipfs-peer-details-button"
                          >
                            View Full Details
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      {peers && peers.length === 0 && !isLoading && !error && (
        <Container className="ipfs-relays-wrapper">
          <div className="ipfs-relays-empty">
            <p className="ipfs-relays-empty-message">No peers found</p>
          </div>
        </Container>
      )}
      <div className="ipfs-relays-loading">
        {!peers && !error && <Spinner animation="border" role="status" className="ipfs-relays-spinner"></Spinner>}
        {error && <p className="ipfs-relays-error-message">{error}</p>}
      </div>
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Peer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ipfs-relay-metrics-container">
            <pre className="ipfs-relay-metrics-text">{JSON.stringify(peerDetails, null, 2)}</pre>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default IpfsPeers
