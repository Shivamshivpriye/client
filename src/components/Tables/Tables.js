import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../pagination/Paginations';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import "./table.css";

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated");
    } else {
      toast.error("error ");
    }
  };

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Post</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Project Name</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1 + (page - 1) * 4}</td> 
                          <td>{element.fname}</td>
                          <td>{element.gender}</td> 
                          <td>{element.email}</td>
                          <td>{element.mobile}</td>
                          <td>{element.lname}</td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                <Badge bg={element.status === "Call" ? "primary" : "danger"}>
                                  {element.status} <i className="fa-solid fa-angle-down"></i>
                                </Badge>      
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange(element._id, "call")}>Call</Dropdown.Item>
                                {/* Other dropdown items */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{element.location}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >
                                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                {/* Other dropdown items */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="9" className='no_data text-center'>NO Data Found</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
