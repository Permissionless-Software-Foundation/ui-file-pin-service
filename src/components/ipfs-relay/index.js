/**
 * 
 * Show all relays for the node
 * 
 */

import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const IpfsRelay = ({ appData }) => {
  const { serverUrl, appUtil } = appData
  const [relays, setRelays] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get IPFS Relays
  const getIpfsRelays = useCallback(async () => {
    try {
      if (isLoading) return
      setRelays(null)
      setIsLoading(true)
      const response = await axios.post(`${serverUrl}/ipfs/relays`)
      console.log(response.data)
      const { relays } = response.data
      let v2Relays = relays.v2Relays
      /**
       * RESPONSE DATA :
       * {
       *  v2Relays: [
       *   {
       *      multiaddr: '/ip4/5.78.70.29/tcp/4001/p2p/12D3KooWSREJ6x2DJSYrA1xRD2Qs6D4DHncsHmNnTHuMKHnqpG2i',
      *       connected: true,
      *       updatedAt: '2026-02-16T23:01:53.311Z',
      *       ipfsId: '12D3KooWSREJ6x2DJSYrA1xRD2Qs6D4DHncsHmNnTHuMKHnqpG2i',
      *       isBootstrap: false,
      *       metrics: [Object],
      *       latencyScore: 543,
      *       name: 'ipfs-service-provider-circuit-relay-usa-west',
      *       description: 'This is a generic IPFS Serivice Provider that uses JSON RPC over IPFS to communicate with it. This instance has not been customized. Source code: https://github.com/Permissionless-Software-Foundation/ipfs-service-provider'
     *      }
     * ]
    
       */

      // Stringify all relay metrics if it exists
      v2Relays = v2Relays.map((relay) => {
        if (relay.metrics) {
          try {
            relay.metrics = JSON.stringify(relay.metrics)
          } catch (error) {
            console.error(error)
            relay.metrics = 'N/A'
          }
        }
        return relay
      })

      setRelays(v2Relays)
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

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString()
  }

  // Get IPFS Relays when the component mounts
  useEffect(() => {
    if (!isLoading && !relays && !error) {
      getIpfsRelays()
    }
  }, [isLoading, relays, getIpfsRelays, error])

  return (
    <div className="ipfs-relays-container">
      <Container className="ipfs-relays-wrapper">
        <div className="ipfs-relays-header">
          <h2 className="ipfs-relays-title">IPFS Relays</h2>
          <p className="ipfs-relays-subtitle">Monitor your IPFS relay connections and their status</p>
        </div>
        <Row>
          <Col xs={12} md={6}>
            <Button disabled={isLoading} onClick={() => getIpfsRelays()} className='mt-2'>Refresh</Button>
          </Col>
        </Row>
      </Container>
      {relays && relays.length > 0 && (
        <Container className="ipfs-relays-wrapper">
          <Row className="ipfs-relays-list">
            {relays.map((relay, idx) => (
              <Col key={idx} xs={12} className="ipfs-relay-card-wrapper">
                <div className="ipfs-relay-card">
                  <div className="ipfs-relay-card-header">
                    <h3 className="ipfs-relay-name">{relay.name}</h3>
                    <div className="ipfs-relay-status">
                      {relay.connected ? (
                        <span className="ipfs-relay-status-badge connected">
                          <FontAwesomeIcon icon={faCheck} className="ipfs-relay-status-icon" />
                          Connected
                        </span>
                      ) : (
                        <span className="ipfs-relay-status-badge disconnected">
                          <FontAwesomeIcon icon={faXmark} className="ipfs-relay-status-icon" />
                          Disconnected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ipfs-relay-description">
                    {relay.description}
                  </div>

                  <Row className="ipfs-relay-details">
                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Multiaddr</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{relay.multiaddr}</span>
                        <FontAwesomeIcon
                          className="ipfs-relay-copy-icon"
                          icon={faCopy}
                          onClick={() => copyToClipboard(relay.multiaddr)}
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">IPFS ID</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{relay.ipfsId}</span>
                        <FontAwesomeIcon
                          className="ipfs-relay-copy-icon"
                          icon={faCopy}
                          onClick={() => copyToClipboard(relay.ipfsId)}
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Updated At</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{formatDate(relay.updatedAt)}</span>
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Latency Score</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{relay.latencyScore || 'N/A'}</span>
                      </div>
                    </Col>

                    <Col xs={12} md={6} className="ipfs-relay-detail-section">
                      <div className="ipfs-relay-detail-label">Is Bootstrap</div>
                      <div className="ipfs-relay-detail-value">
                        <span className="ipfs-relay-value-text">{relay.isBootstrap ? 'Yes' : 'No'}</span>
                      </div>
                    </Col>

                    {relay.metrics && relay.metrics !== 'N/A' && (
                      <Col xs={12} className="ipfs-relay-detail-section">
                        <div className="ipfs-relay-detail-label">Metrics</div>
                        <div className="ipfs-relay-metrics-container">
                          <pre className="ipfs-relay-metrics-text">{relay.metrics}</pre>
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
      {relays && relays.length === 0 && !isLoading && !error && (
        <Container className="ipfs-relays-wrapper">
          <div className="ipfs-relays-empty">
            <p className="ipfs-relays-empty-message">No relays found</p>
          </div>
        </Container>
      )}
      <div className="ipfs-relays-loading">
        {!relays && !error && <Spinner animation="border" role="status" className="ipfs-relays-spinner"></Spinner>}
        {error && <p className="ipfs-relays-error-message">{error}</p>}
      </div>
    </div>
  )
}

export default IpfsRelay