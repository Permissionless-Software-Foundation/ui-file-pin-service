import React, { useState ,useCallback, useEffect , useRef } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LocalTable from './table'
import UploadModal from './upload-modal'
import axios from 'axios'
import config from '../../config'
import Pagination from './pagination'
import '../../App.css'

const server = config.pinServer


const maxPinsToShow = 10

const Local = ({ appData }) => {
  const { userData } = appData
  const navigate = useNavigate()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [localPins, setLocalPins] = useState([])
  const [pinsToShow, setPinsToShow] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Pagination ref.
  const paginationRef = useRef()

  // Fetch local pins from the server
  const getLocalPins = useCallback(async () => {
    try {
      if (isLoading) return
      const { token } = userData
      setLocalPins(null)
      setIsLoading(true)

      const response = await axios.get(`${server}/local`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setLocalPins(response.data.localPins || [])
      setIsLoading(false)
      setDataLoaded(true)

    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }, [ isLoading, userData])

  const deleteLocalPin = useCallback(async (cid) => {
    try {
      if (isLoading) return
      const { token } = userData
      await axios.delete(`${server}/local/${cid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await getLocalPins()
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }, [getLocalPins, isLoading, userData])

  // Fetch local pins when the component mounts
  useEffect(() => {
    if(!userData) navigate('/login')
    if(!dataLoaded) getLocalPins()
  }, [getLocalPins, dataLoaded, userData, navigate])

  const handlePageChange = useCallback((page = 1) => {

    const newPins = localPins?.slice((page - 1) * maxPinsToShow, page * maxPinsToShow)
    setPinsToShow(newPins)
  }, [localPins])

   useEffect(() => {
    const currentPaginationPage = paginationRef.current.getCurrentPage()
    handlePageChange(currentPaginationPage)
  }, [localPins, handlePageChange])

  return (
    <Container fluid className="local-container">
      <Row className="local-header mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 className="local-title mb-0">Local Pins</h2>
          <div className="d-flex gap-2 flex-wrap">
            <Button
              variant="success"
              className="local-action-button"
              onClick={() => setShowUploadModal(true)}
            >
              Upload File
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Pagination
          onPageChange={ handlePageChange }
          onFetch={isLoading}
          ref={paginationRef}
        />
        <Col xs={12}>
          <LocalTable pins={pinsToShow || []} appData={appData} deleteLocalPin={deleteLocalPin} />
        </Col>
      </Row>
      <UploadModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        refreshLocalPins={getLocalPins}
        appData={appData}
      />
    </Container>
  )
}

export default Local
