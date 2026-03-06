import React, { useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { Upload, FileText, Info } from 'lucide-react'
import config from '../../config'
import axios from 'axios'
import '../../App.css'
const server = config.pinServer


const UploadModal = ({ show, onHide, refreshLocalPins, appData }) => {
  const { userData } = appData
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const uploadFile = async (file) => {
    try {
      if (isLoading) return
      // Forn Data to upload
      const formData = new FormData()
      formData.append('file', file)
      setIsLoading(true)
      await axios.post(`${server}/ipfs/pin-local-file`, formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      })
      if(refreshLocalPins) await refreshLocalPins()
      setIsLoading(false)
      if(onHide) onHide()
      } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="upload-modal"
    >
      <Modal.Header closeButton className="upload-modal-header">
        <Modal.Title className="upload-modal-title">
          <Upload size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Upload and Pin File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="upload-modal-body">
        <div className="upload-info-section mb-4">
          <div className="upload-info-card">
            <Info size={20} className="upload-info-icon" />
            <div className="upload-info-content">
              <h5 className="upload-info-title">About Uploading and Pinning</h5>
              <p className="upload-info-text">
                Upload files to your local IPFS node and pin them to ensure they remain accessible.
              </p>
            </div>
          </div>
        </div>

        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="upload-label">
              <FileText size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Select File
            </Form.Label>
            <Form.Control
              type="file"
              className="upload-file-input"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#000000',
                cursor: 'pointer',
              }}
            />
            <Form.Text className="upload-help-text">
              Choose a file to upload. Supported formats: images, documents, videos, and more.
            </Form.Text>
          </Form.Group>
        </Form>
        {isLoading && (
          <div className="upload-loading-spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="upload-modal-footer">
        <Button
          variant="secondary"
          onClick={onHide}
          className="upload-cancel-button"
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#6b7280',
            color: '#ffffff',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          className="upload-submit-button"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#10b981',
            color: '#ffffff',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={() => uploadFile(file)}
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadModal
